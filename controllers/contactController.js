const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const emailService = require('../services/emailService');
const fs = require('fs').promises;
const path = require('path');

// Show contact/demo request form
exports.showContactForm = (req, res) => {
    res.render('contact', {
        title: 'Contact Us | Karmanya Infotech',
        metaDescription: 'Get in touch with Karmanya Infotech for expert IT solutions, Education ERP, and custom software development.',
        errors: [],
        formData: {}
    });
};

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('contact', {
            title: 'Contact Us | Karmanya Infotech',
            metaDescription: 'Get in touch with Karmanya Infotech for expert IT solutions',
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
        await logContactSubmission(contact);

        try {
            await emailService.sendContactNotification(contact);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
        }

        res.render('contact-success', {
            title: 'Thank You! | Karmanya Infotech',
            metaDescription: 'Thank you for contacting us',
            contactName: fullName
        });

    } catch (error) {
        console.error('Contact form submission error:', error);
        res.render('contact', {
            title: 'Contact Us | Karmanya Infotech',
            metaDescription: 'An error occurred while submitting your inquiry',
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
        await fs.mkdir(logDir, { recursive: true });
        const logEntry = `\n[${new Date().toISOString()}] Name: ${contact.fullName} | Email: ${contact.email} | Service: ${contact.serviceInterested}\n`;
        await fs.appendFile(logFile, logEntry);
    } catch (error) {
        console.error('Logging error:', error);
    }
}
