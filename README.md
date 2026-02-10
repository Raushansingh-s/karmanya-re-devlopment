# Karmanya Infotech Pvt. Ltd. - Company Website

Professional, production-ready company website for Karmanya Infotech Pvt. Ltd., a leading IT solutions provider in Bihar, India.

## 🚀 Features

- **Modern Design**: Professional blue & orange theme with smooth animations
- **Fully Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Meta tags, schema markup, sitemap, and robots.txt
- **Secure**: Input validation, rate limiting, helmet security headers
- **Email Integration**: Automated email notifications via Zoho Mail
- **Database**: MongoDB integration for storing contact requests
- **Performance**: Compression, caching, and optimized assets
- **Production Ready**: Environment variables, error handling, logging

## 📋 Pages

1. **Home** - Hero section, services overview, why choose us
2. **About Us** - Company overview, founder info, mission & vision
3. **Services** - Detailed service offerings with CTAs
4. **ERP Solution** - Comprehensive ERP features and modules
5. **Contact** - Demo request form with validation

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS templating
- Nodemailer (Zoho Mail)

### Frontend
- HTML5, CSS3, JavaScript
- Modern CSS with animations
- Responsive design
- Google Fonts (Inter, Poppins)

### Security
- Helmet.js
- Express Rate Limit
- Express Validator
- Input sanitization

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Zoho Mail account (for email notifications)

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd "c:\Users\Raushan Singh\Desktop\karmanya re-devlopment"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   copy .env.example .env
   ```
   - Edit `.env` and fill in your configuration:
     - MongoDB connection string
     - Zoho Mail SMTP credentials
     - reCAPTCHA keys (optional)
     - Other settings

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the application**

   **Development mode** (with auto-restart):
   ```bash
   npm run dev
   ```

   **Production mode**:
   ```bash
   npm start
   ```

6. **Access the website**
   - Open your browser and go to: `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Edit the `.env` file with your settings:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/karmanya_infotech

# Email (Zoho Mail)
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=karmanyainfotech@zohomail.com
EMAIL_PASSWORD=your_password_here
EMAIL_FROM=karmanyainfotech@zohomail.com

# Company Info
COMPANY_EMAIL=karmanyainfotech@zohomail.com
```

### Zoho Mail Setup

1. Log in to Zoho Mail
2. Go to Settings → Mail Accounts → IMAP Access
3. Enable IMAP access
4. Use these SMTP settings in `.env`:
   - Host: `smtp.zoho.com`
   - Port: `465`
   - Secure: `true`
   - Username: Your Zoho email
   - Password: Your Zoho password or app-specific password

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB and start the service
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 📁 Project Structure

```
karmanya-infotech/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── contactController.js # Contact form logic
├── models/
│   └── Contact.js           # Contact schema
├── routes/
│   ├── index.js             # Main routes
│   └── contact.js           # Contact routes
├── services/
│   └── emailService.js      # Email sending
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── whatsapp-button.ejs
│   ├── home.ejs
│   ├── about.ejs
│   ├── services.ejs
│   ├── erp-solution.ejs
│   ├── contact.ejs
│   ├── contact-success.ejs
│   ├── 404.ejs
│   └── error.ejs
├── public/
│   ├── css/
│   │   ├── style.css        # Main styles
│   │   └── pages.css        # Page-specific styles
│   ├── js/
│   │   └── main.js          # Client-side JavaScript
│   ├── images/              # Images and assets
│   ├── robots.txt
│   └── sitemap.xml
├── logs/                    # Application logs
├── .env                     # Environment variables (create from .env.example)
├── .env.example             # Environment template
├── .gitignore
├── package.json
├── server.js                # Main application file
└── README.md
```

## 🚀 Deployment

### Cloudflare Pages / Workers

1. Build the application
2. Configure environment variables in Cloudflare dashboard
3. Deploy using Cloudflare CLI or Git integration

### Traditional Hosting (VPS/Shared)

1. Upload files via FTP/SSH
2. Install Node.js on server
3. Run `npm install --production`
4. Set up environment variables
5. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name karmanya-website
   pm2 save
   pm2 startup
   ```

### Environment Variables for Production

Make sure to set these in your hosting environment:
- `NODE_ENV=production`
- `MONGODB_URI=<your-production-mongodb-uri>`
- `EMAIL_PASSWORD=<your-email-password>`
- All other variables from `.env.example`

## 📧 Email Configuration

The contact form sends emails to `karmanyainfotech@zohomail.com`. To configure:

1. Update `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
2. For Gmail, enable "Less secure app access" or use App Password
3. For Zoho, use your account credentials
4. Test email sending after setup

## 🔒 Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: 3 requests per 15 minutes on contact form
- **Input Validation**: Server-side validation with express-validator
- **XSS Protection**: Input sanitization
- **CSRF Protection**: Can be added with csurf package
- **Environment Variables**: Sensitive data in .env file

## 📱 WhatsApp Integration

Update the WhatsApp number in `views/partials/whatsapp-button.ejs`:
```html
<a href="https://wa.me/919999999999?text=..." ...>
```
Replace `919999999999` with your actual WhatsApp number (with country code).

## 🎨 Customization

### Colors
Edit CSS variables in `public/css/style.css`:
```css
:root {
  --primary-blue: #1e40af;
  --primary-orange: #f97316;
  /* ... other colors */
}
```

### Logo
Replace logo images in `public/images/`:
- `logo.png` (for header)
- `logo-white.png` (for footer)

### Content
Edit EJS files in `views/` directory to update content.

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network connectivity

### Email Not Sending
- Verify SMTP credentials in `.env`
- Check email provider settings
- Look at console logs for errors

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

## 📞 Support

For issues or questions:
- Email: karmanyainfotech@zohomail.com
- Website: karmanyainfotech.com

## 📄 License

Copyright © 2022-2024 Karmanya Infotech Pvt. Ltd. All rights reserved.

---

**Built with ❤️ by Karmanya Infotech Pvt. Ltd.**
*Empowering Institutions Through Smart Technology*
