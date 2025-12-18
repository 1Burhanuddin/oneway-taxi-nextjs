import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.rediffmailpro.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER || 'reservations@onewaytaxicabs.com',
    pass: process.env.SMTP_PASS || 'Oneway@5253$',
  },
  tls: {
    rejectUnauthorized: false
  },
  name: 'onewaytaxicabs.com', // Set HELO hostname
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

interface BookingData {
  id: number;
  type: string;
  firstName: string | null;
  email: string | null;
  mobile: string | null;
  pickupDate: Date | null;
  pickupTime: string | null;
  estimatedPrice: number | null;
  journeyDays: number | null;
  specialRequest: string | null;
  alternativeNumber: string | null;
  flightNumber: string | null;
  pickupLocation?: { cityName: string } | null;
  dropLocation?: { cityName: string } | null;
  cab?: { name: string; type: string } | null;
  oneWayPackage?: {
    source: { cityName: string };
    destination: { cityName: string };
    distanceKm: number | null;
  } | null;
  localPackage?: {
    hoursIncluded: number;
    kmIncluded: number;
  } | null;
}

/**
 * Generate HTML email template for customer booking confirmation
 */
function generateCustomerEmailHTML(booking: BookingData): string {
  const tripType = booking.type.charAt(0).toUpperCase() + booking.type.slice(1).toLowerCase();
  const pickupCity = booking.pickupLocation?.cityName || booking.oneWayPackage?.source.cityName || 'N/A';
  const dropCity = booking.dropLocation?.cityName || booking.oneWayPackage?.destination.cityName || 'N/A';
  const date = booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #fbbf24; margin: 0; font-size: 28px;">Oneway Taxi Surat</h1>
                  <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">Reliable Car Rental Services</p>
                </td>
              </tr>

              <!-- Success Message -->
              <tr>
                <td style="padding: 30px; text-align: center; background-color: #ecfdf5;">
                  <h2 style="color: #065f46; margin: 0 0 10px 0; font-size: 24px;">Booking Confirmed!</h2>
                  <p style="color: #047857; margin: 0; font-size: 16px;">Booking ID: #${booking.id}</p>
                </td>
              </tr>

              <!-- Booking Details -->
              <tr>
                <td style="padding: 30px;">
                  <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">Trip Details</h3>
                  
                  <table width="100%" cellpadding="8" cellspacing="0">
                    <tr>
                      <td style="color: #6b7280; font-size: 14px; width: 40%;">Trip Type:</td>
                      <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${tripType}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">From:</td>
                      <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${pickupCity}</td>
                    </tr>
                    ${booking.type !== 'LOCAL' ? `
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">To:</td>
                      <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${dropCity}</td>
                    </tr>
                    ` : ''}
                    ${booking.oneWayPackage?.distanceKm ? `
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">Distance:</td>
                      <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.oneWayPackage.distanceKm} km</td>
                    </tr>
                    ` : ''}
                    ${booking.localPackage ? `
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">Package:</td>
                      <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.localPackage.hoursIncluded} Hours / ${booking.localPackage.kmIncluded} KM</td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">Date:</td>
                      <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${date}</td>
                    </tr>
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">Time:</td>
                      <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.pickupTime || 'N/A'}</td>
                    </tr>
                    ${booking.journeyDays ? `
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">Journey Days:</td>
                      <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.journeyDays} days</td>
                    </tr>
                    ` : ''}
                    ${booking.cab ? `
                    <tr>
                      <td style="color: #6b7280; font-size: 14px;">Vehicle:</td>
                      <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.cab.name} (${booking.cab.type})</td>
                    </tr>
                    ` : ''}
                  </table>

                  <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #fbbf24; border-radius: 4px;">
                    <p style="margin: 0; color: #92400e; font-size: 18px; font-weight: bold;">Total Amount: ₹${booking.estimatedPrice || 'TBD'}</p>
                  </div>

                  ${booking.specialRequest ? `
                  <div style="margin-top: 20px;">
                    <h4 style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px;">Special Request:</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 14px; background-color: #f9fafb; padding: 10px; border-radius: 4px;">${booking.specialRequest}</p>
                  </div>
                  ` : ''}
                </td>
              </tr>

              <!-- Contact Information -->
              <tr>
                <td style="padding: 30px; background-color: #f9fafb;">
                  <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Need Help?</h3>
                  <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                    📞 Phone: <a href="tel:+918511680364" style="color: #fbbf24; text-decoration: none;">+91 85116 80364</a>
                  </p>
                  <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                    ✉️ Email: <a href="mailto:reservations@onewaytaxicabs.com" style="color: #fbbf24; text-decoration: none;">reservations@onewaytaxicabs.com</a>
                  </p>
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">
                    🕒 Available 24x7
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #1f2937; color: #9ca3af; font-size: 12px;">
                  <p style="margin: 0 0 5px 0;">© 2024 Oneway Taxi Surat. All rights reserved.</p>
                  <p style="margin: 0;">L9/2 Shreenathji Complex, Ram Nagar Char Rasta, Rander Surat, 395005</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Generate HTML email template for admin notification
 */
function generateAdminEmailHTML(booking: BookingData): string {
  const tripType = booking.type.charAt(0).toUpperCase() + booking.type.slice(1).toLowerCase();
  const pickupCity = booking.pickupLocation?.cityName || booking.oneWayPackage?.source.cityName || 'N/A';
  const dropCity = booking.dropLocation?.cityName || booking.oneWayPackage?.destination.cityName || 'N/A';
  const date = booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString('en-IN') : 'N/A';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking Alert</title>
    </head>
    <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        
        <div style="background-color: #fbbf24; padding: 20px; color: #1f2937;">
          <h2 style="margin: 0; font-size: 24px;">New Booking</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Booking ID: #${booking.id}</p>
        </div>

        <div style="padding: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Customer Details</h3>
          <table width="100%" cellpadding="5" cellspacing="0" style="margin-bottom: 20px;">
            <tr>
              <td style="color: #6b7280; font-size: 14px; width: 35%;">Name:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.firstName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Mobile:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.mobile || 'N/A'}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Email:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.email || 'N/A'}</td>
            </tr>
            ${booking.alternativeNumber ? `
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Alt. Number:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.alternativeNumber}</td>
            </tr>
            ` : ''}
          </table>

          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Trip Information</h3>
          <table width="100%" cellpadding="5" cellspacing="0">
            <tr>
              <td style="color: #6b7280; font-size: 14px; width: 35%;">Type:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${tripType}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; font-size: 14px;">From:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${pickupCity}</td>
            </tr>
            ${booking.type !== 'LOCAL' ? `
            <tr>
              <td style="color: #6b7280; font-size: 14px;">To:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${dropCity}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Date:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${date}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Time:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.pickupTime || 'N/A'}</td>
            </tr>
            ${booking.cab ? `
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Vehicle:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.cab.name}</td>
            </tr>
            ` : ''}
            ${booking.flightNumber ? `
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Flight:</td>
              <td style="color: #1f2937; font-size: 14px; font-weight: bold;">${booking.flightNumber}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Amount:</td>
              <td style="color: #dc2626; font-size: 16px; font-weight: bold;">₹${booking.estimatedPrice || 'TBD'}</td>
            </tr>
          </table>

          ${booking.specialRequest ? `
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #fbbf24; border-radius: 4px;">
            <strong style="color: #92400e;">Special Request:</strong>
            <p style="margin: 5px 0 0 0; color: #92400e;">${booking.specialRequest}</p>
          </div>
          ` : ''}
        </div>

        <div style="padding: 20px; background-color: #f9fafb; text-align: center; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">This is an automated notification from Oneway Taxi Surat booking system.</p>
        </div>

      </div>
    </body>
    </html>
  `;
}

/**
 * Send booking confirmation email to customer
 */
export async function sendBookingConfirmation(booking: BookingData): Promise<void> {
  if (!booking.email) {
    console.log('No email provided for booking #' + booking.id);
    return;
  }

  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME || 'Oneway Taxi Surat'} <${process.env.SMTP_FROM_EMAIL || 'reservations@onewaytaxicabs.com'}>`,
    to: booking.email,
    subject: `Booking Confirmation - #${booking.id} | Oneway Taxi Surat`,
    html: generateCustomerEmailHTML(booking),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Customer confirmation email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending customer email:', error);
    throw error;
  }
}

/**
 * Send booking notification to admin
 */
export async function sendAdminNotification(booking: BookingData): Promise<void> {
  const adminEmail = process.env.SMTP_FROM_EMAIL || 'reservations@onewaytaxicabs.com';

  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME || 'Oneway Taxi Surat'} <${process.env.SMTP_FROM_EMAIL || 'reservations@onewaytaxicabs.com'}>`,
    to: adminEmail,
    cc: 'rajlaxmidhar175@gmail.com',
    subject: `New Booking - #${booking.id}`,
    html: generateAdminEmailHTML(booking),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending admin email:', error);
    throw error;
  }
}

/**
 * Send callback notification to admin
 */
export async function sendCallbackNotification(mobile: string): Promise<void> {
  const adminEmail = process.env.SMTP_FROM_EMAIL || 'reservations@onewaytaxicabs.com';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Call Back Request</title>
    </head>
    <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        
        <div style="background-color: #fbbf24; padding: 20px; color: #1f2937;">
          <h2 style="margin: 0; font-size: 24px;">New Call Back Request</h2>
        </div>

        <div style="padding: 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">A user has requested a call back.</p>
          
          <table width="100%" cellpadding="5" cellspacing="0" style="background-color: #f9fafb; padding: 15px; border-radius: 8px;">
            <tr>
              <td style="color: #6b7280; font-size: 14px; width: 30%;">Mobile Number:</td>
              <td style="color: #1f2937; font-size: 18px; font-weight: bold;">
                <a href="tel:${mobile}" style="color: #1f2937; text-decoration: none;">${mobile}</a>
              </td>
            </tr>
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Time:</td>
              <td style="color: #1f2937; font-size: 14px;">${new Date().toLocaleString('en-IN')}</td>
            </tr>
          </table>
        </div>

        <div style="padding: 20px; background-color: #f9fafb; text-align: center; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">Automated notification from Oneway Taxi Surat.</p>
        </div>

      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME || 'Oneway Taxi Surat'} <${process.env.SMTP_FROM_EMAIL || 'reservations@onewaytaxicabs.com'}>`,
    to: adminEmail,
    cc: 'rajlaxmidhar175@gmail.com',
    subject: `Call Back Request - ${mobile}`,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Callback notification email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending callback email:', error);
    throw error;
  }
}

/**
 * Send booking inquiry to admin
 */
export async function sendBookingInquiry(data: { mobile: string; city: string; cabName: string }): Promise<void> {
  const adminEmail = process.env.SMTP_FROM_EMAIL || 'reservations@onewaytaxicabs.com';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking Inquiry</title>
    </head>
    <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        
        <div style="background-color: #fbbf24; padding: 20px; color: #1f2937;">
          <h2 style="margin: 0; font-size: 24px;">New Booking Inquiry</h2>
        </div>

        <div style="padding: 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">A user has inquired about a vehicle.</p>
          
          <table width="100%" cellpadding="5" cellspacing="0" style="background-color: #f9fafb; padding: 15px; border-radius: 8px;">
            <tr>
              <td style="color: #6b7280; font-size: 14px; width: 30%;">Vehicle:</td>
              <td style="color: #1f2937; font-size: 16px; font-weight: bold;">${data.cabName}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; font-size: 14px;">City/Route:</td>
              <td style="color: #1f2937; font-size: 16px; font-weight: bold;">${data.city}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Mobile:</td>
              <td style="color: #1f2937; font-size: 18px; font-weight: bold;">
                <a href="tel:${data.mobile}" style="color: #1f2937; text-decoration: none;">${data.mobile}</a>
              </td>
            </tr>
            <tr>
              <td style="color: #6b7280; font-size: 14px;">Time:</td>
              <td style="color: #1f2937; font-size: 14px;">${new Date().toLocaleString('en-IN')}</td>
            </tr>
          </table>
        </div>

        <div style="padding: 20px; background-color: #f9fafb; text-align: center; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">Automated notification from Oneway Taxi Surat.</p>
        </div>

      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME || 'Oneway Taxi Surat'} <${process.env.SMTP_FROM_EMAIL || 'reservations@onewaytaxicabs.com'}>`,
    to: adminEmail,
    cc: 'rajlaxmidhar175@gmail.com',
    subject: `Booking Inquiry - ${data.cabName}`,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Booking inquiry email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending booking inquiry email:', error);
    throw error;
  }
}
