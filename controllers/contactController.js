const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const emailService = require('../services/emailService');
const fs = require('fs').promises;
const path = require('path');

// Show contact/demo request form
exports.showContactForm = (req, res) => {
    res.render('contact', {
        title: 'Request Demo - Contact Us | Karmanya Infotech',
        metaDescription: 'Request a free demo of our Education ERP, Admission Portal, or other IT solutions. Contact Karmanya Infotech for custom software development in Bihar.',
        errors: [],
        formData: {}
    });
};

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
    // Validate input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('contact', {
            title: 'Request Demo - Contact Us | Karmanya Infotech',
            metaDescription: 'Request a free demo of our Education ERP solutions',
            errors: errors.array(),
            formData: req.body
        });
    }

    try {
        const {
            fullName,
            email,
            mobile,
            organizationName,
            organizationType,
            serviceInterested,
            message
        } = req.body;

        // Create contact record
        const contact = new Contact({
            fullName,
            email,
            mobile,
            organizationName,
            organizationType,
            serviceInterested,
            message,
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('user-agent')
        });

        await contact.save();

        // Log to file
        await logContactSubmission(contact);

        // Send email notification
        try {
            await emailService.sendContactNotification(contact);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the request if email fails
        }

        // Render success page
        res.render('contact-success', {
            title: 'Thank You! | Karmanya Infotech',
            metaDescription: 'Thank you for contacting us',
            contactName: fullName
        });

    } catch (error) {
        console.error('Contact form submission error:', error);

        res.render('contact', {
            title: 'Request Demo - Contact Us | Karmanya Infotech',
            metaDescription: 'Request a free demo of our Education ERP solutions',
            errors: [{ msg: 'An error occurred. Please try again later.' }],
            formData: req.body
        });
    }
};

// Helper function to log submissions
async function logContactSubmission(contact) {
    const logDir = path.join(__dirname, '../logs');
    const logFile = path.join(logDir, 'contact-submissions.log');

    try {
        // Create logs directory if it doesn't exist
        await fs.mkdir(logDir, { recursive: true });

        const logEntry = `
[${new Date().toISOString()}]
Name: ${contact.fullName}
Email: ${contact.email}
Mobile: ${contact.mobile}
Organization: ${contact.organizationName} (${contact.organizationType})
Service: ${contact.serviceInterested}
Message: ${contact.message}
IP: ${contact.ipAddress}
-------------------------------------------
`;

        await fs.appendFile(logFile, logEntry);
    } catch (error) {
        console.error('Logging error:', error);
    }
}
