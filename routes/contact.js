const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const contactController = require('../controllers/contactController');

// Rate limiting for contact form
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 3 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Validation rules
const contactValidation = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required')
        .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid 10-digit Indian mobile number'),

    body('organizationName')
        .trim()
        .notEmpty().withMessage('Organization name is required')
        .isLength({ min: 2, max: 200 }).withMessage('Organization name must be between 2 and 200 characters'),

    body('organizationType')
        .notEmpty().withMessage('Please select organization type')
        .isIn(['College', 'School', 'Coaching Institute', 'Training Center', 'Business', 'Startup', 'NGO', 'Other'])
        .withMessage('Invalid organization type'),

    body('serviceInterested')
        .notEmpty().withMessage('Please select a service')
        .isIn([
            'Education ERP',
            'Admission Portal',
            'Website Development',
            'Custom Software',
            'Mobile App Development',
            'Automation Solutions',
            'Cloud & Hosting',
            'Digital Marketing',
            'Other'
        ]).withMessage('Invalid service selection'),

    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
];

// Routes
router.get('/', contactController.showContactForm);
router.post('/', contactLimiter, contactValidation, contactController.submitContactForm);

module.exports = router;
