export const resetPassword = (data?: { resetLink: string }) => {
  const htmlTemplate = `
       <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html dir="ltr" lang="en">
   
     <head>
       <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
       <meta name="x-apple-disable-message-reformatting" /><!--$-->
     </head>
     <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
       <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
         <tbody>
           <tr style="width:100%">
             <td>
               <p style="font-size:16px;line-height:26px;margin:16px 0">Hi, </p>
               <p style="font-size:16px;line-height:26px;margin:16px 0">Someone recently requested a password change for your Compassion Link account. If this was you, you can set a new password here</p>
       
               <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
                 <tbody>
                   <tr>
                     <td>
                   <a href="${data?.resetLink}" style="
                     display: inline-block;
                     padding: 12px 24px;
                     background-color: #1a73e8;
                     text-decoration: none;
                     border-radius: 5px;
                     font-size: 12px;
                     margin: 12px 0;
                     text-transform: uppercase;
                     color: white;
                   "> Reset Password
                   </a>
                     </td>
                   </tr>
                 </tbody>
               </table>
                <p style="font-size:16px;line-height:26px;margin:16px 0">If the button doesn’t work click <a href="${data?.resetLink}">here</a></p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">This link will expire in 24 hours</p>
               <p style="font-size:16px;line-height:26px;margin:16px 0">Best Regards,<br />The CompassionLink Team</p>
               <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
               <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">Compassion Link, Canada</p>
             </td>
           </tr>
         </tbody>
       </table><!--/$-->
     </body>
   
   </html>
       `;
  return htmlTemplate;
};
