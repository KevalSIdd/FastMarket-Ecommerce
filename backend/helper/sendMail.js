const nodemailer = require('nodemailer');
const url = require('url');

exports.sendMailForgotPassword = async (email) => {
  try {
    // Create a basic URL
    const baseURL = '//localhost:4200/verifypass';
    const queryParams = { email: email };

    // Construct the URL with query parameters
    const finalURL = url.format({
      protocol: 'http',
      pathname: baseURL,
      query: queryParams,
    });

    console.log('Generated URL:', finalURL);

    var transporter = nodemailer.createTransport({
      host: 'email-smtp.us-east-1.amazonaws.com',
      port: 587,
      secure: false,
      auth: {
        user: 'AKIAV4QZZIACIPVLTDAB',
        pass: 'BFxpXqRYHc3+xk32W/bl7PQ3dfG01OSIb7GnrAW9BNVO',
      },
    });
    var mailOptions = {
      from: 'support@remudalife.com',
      to: email,
      subject: 'Password Reset Request.',
      text: '',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Forgot Password</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  margin-top: 50px;
              }
              h2 {
                  color: #333333;
              }
              p {
                  color: #555555;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #3498db;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
              }
              .footer {
                  margin-top: 20px;
                  color: #777777;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Forgot Password</h2>
              <p>You have requested to reset your password. Click the link below to reset it:</p>
              <a href=${finalURL} class="button">Reset Password</a>
              <p>If you did not request this password reset, please ignore this email.</p>
              <p class="footer">Best regards,<br>Your Company Name</p>
          </div>
      </body>
      </html>
      `,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
      } else {
      }
    });
  } catch (error) {
    throw error;
  }
};
