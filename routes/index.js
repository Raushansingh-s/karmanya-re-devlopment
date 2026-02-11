const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Karmanya Infotech - Leading IT Solutions Provider in Bihar | Education ERP, Software Development',
        metaDescription: 'Karmanya Infotech Pvt. Ltd. - Premier IT solutions company in Bihar offering Education ERP, College Management Systems, Custom Software Development, Website Design, Mobile Apps, and Digital Marketing services since 2022.'
    });
});

// Alternate landing page
router.get('/home-new', (req, res) => {
    res.render('home-separate', {
        title: 'Karmanya Infotech - We Build Digital Future for Your Business',
        metaDescription: 'Discover Karmanya Infotech\'s alternate home page design focused on web, mobile, and enterprise software solutions for modern businesses.'
    });
});

// About page
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us - Karmanya Infotech Pvt. Ltd. | Founded by Raushan Singh',
        metaDescription: 'Learn about Karmanya Infotech, founded in 2022 by Raushan Singh. We are Bihar\'s trusted IT partner providing innovative solutions to educational institutions and businesses across the state.'
    });
});

// Services page
router.get('/services', (req, res) => {
    res.render('services', {
        title: 'Our IT Services - Education ERP, Software Development, Web & Mobile Apps | Karmanya Infotech',
        metaDescription: 'Comprehensive IT services including Education ERP Systems, Admission Portals, Custom Software Development, Website Design, Mobile App Development, Cloud Solutions, and Digital Marketing in Bihar.'
    });
});

// ERP Solution page
router.get('/erp-solution', (req, res) => {
    res.render('erp-solution', {
        title: 'Education ERP Solution - Complete College & School Management System | Karmanya Infotech',
        metaDescription: 'Advanced Education ERP system for colleges, schools, and coaching institutes in Bihar. Manage admissions, students, faculty, fees, exams, and more with our comprehensive cloud-based solution.'
    });
});

module.exports = router;
