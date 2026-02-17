exports.forgotPasswordTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          
          <table width="500" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; margin:40px auto; padding:30px; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.08);">
            
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="color:#333; margin:0;">🔐 Password Reset Request</h2>
              </td>
            </tr>

            <tr>
              <td style="color:#555; font-size:15px; line-height:1.6;">
                <p>Hello,</p>
                <p>We received a request to reset your password. Use the OTP below to proceed:</p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:25px 0;">
                <div style="
                  display:inline-block;
                  padding:15px 25px;
                  font-size:22px;
                  font-weight:bold;
                  letter-spacing:5px;
                  background:#4f46e5;
                  color:#ffffff;
                  border-radius:8px;">
                  ${otp}
                </div>
              </td>
            </tr>

            <tr>
              <td style="color:#777; font-size:14px;">
                <p>This OTP is valid for 10 minutes.</p>
                <p>If you didn’t request this, you can safely ignore this email.</p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:25px;">
                <p style="font-size:12px; color:#aaa;">
                  © ${new Date().getFullYear()} EpicAura Event Management. All rights reserved.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
