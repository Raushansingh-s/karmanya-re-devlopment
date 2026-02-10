const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        trim: true,
        match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit mobile number']
    },
    organizationName: {
        type: String,
        required: [true, 'Organization name is required'],
        trim: true,
        maxlength: [200, 'Organization name cannot exceed 200 characters']
    },
    organizationType: {
        type: String,
        required: [true, 'Organization type is required'],
        enum: {
            values: ['College', 'School', 'Coaching Institute', 'Training Center', 'Business', 'Startup', 'NGO', 'Other'],
            message: 'Please select a valid organization type'
        }
    },
    serviceInterested: {
        type: String,
        required: [true, 'Service interested is required'],
        enum: {
            values: [
                'Education ERP',
                'Admission Portal',
                'Website Development',
                'Custom Software',
                'Mobile App Development',
                'Automation Solutions',
                'Cloud & Hosting',
                'Digital Marketing',
                'Other'
            ],
            message: 'Please select a valid service'
        }
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'converted', 'closed'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });

module.exports = mongoose.model('Contact', contactSchema);
