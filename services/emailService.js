const nodemailer = require('nodemailer');

// Create transporter for Zoho Mail
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

// Send contact form notification email
exports.sendContactNotification = async (contact) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.COMPANY_EMAIL,
        subject: `🔔 New ${contact.serviceInterested} Demo Request - ${contact.organizationName}`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1e40af; }
          .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #f97316; }
          .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          .badge { display: inline-block; padding: 5px 10px; background: #f97316; color: white; border-radius: 4px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">🎯 New Demo Request Received!</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">From ${contact.organizationName}</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 Full Name:</div>
              <div class="value">${contact.fullName}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${contact.email}">${contact.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">📱 Mobile:</div>
              <div class="value"><a href="tel:${contact.mobile}">${contact.mobile}</a></div>
            </div>
            
            <div class="field">
              <div class="label">🏢 Organization:</div>
              <div class="value">${contact.organizationName}</div>
            </div>
            
            <div class="field">
              <div class="label">🏫 Organization Type:</div>
              <div class="value"><span class="badge">${contact.organizationType}</span></div>
            </div>
            
            <div class="field">
              <div class="label">💼 Service Interested:</div>
              <div class="value"><span class="badge">${contact.serviceInterested}</span></div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="value">${contact.message}</div>
            </div>
            
            <div class="field">
              <div class="label">🌐 IP Address:</div>
              <div class="value">${contact.ipAddress || 'N/A'}</div>
            </div>
            
            <div class="field">
              <div class="label">🕒 Submitted At:</div>
              <div class="value">${new Date(contact.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">Karmanya Infotech Pvt. Ltd. - Automated Notification System</p>
            <p style="margin: 5px 0 0 0;">Bihar, India | karmanyainfotech.com</p>
          </div>
        </div>
      </body>
      </html>
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        throw error;
    }
};
