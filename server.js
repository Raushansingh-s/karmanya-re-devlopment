require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const indexRoutes = require('./routes/index');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com", "https://www.gstatic.com"],
            frameSrc: ["https://www.google.com"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Compression middleware
app.use(compression());

// CORS
app.use(cors());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make environment variables available to views
app.use((req, res, next) => {
    res.locals.recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;
    res.locals.companyName = process.env.COMPANY_NAME || 'Karmanya Infotech Pvt. Ltd.';
    res.locals.companyEmail = process.env.COMPANY_EMAIL || 'karmanyainfotech@zohomail.com';
    res.locals.currentPath = req.path;
    next();
});

// Routes
app.use('/', indexRoutes);
app.use('/contact', contactRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Page Not Found',
        metaDescription: 'Page not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Error',
        metaDescription: 'An error occurred',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Karmanya Infotech Website Server Running             ║
║                                                            ║
║   Environment: ${process.env.NODE_ENV || 'development'}                                    ║
║   Port: ${PORT}                                               ║
║   URL: http://localhost:${PORT}                               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
