/************************************* 
Run this code to send an email that has attachments
and uses the preheader to show a summary on multiple
email clients

Required: Add the recipient who will receive the email and 
create a dynamic template from the `DynamicTemplate.html` file
Optional: Send a email with HTML content or use a template
Docs:
 - https://docs.sendgrid.com/api-reference/mail-send/mail-send
 - https://stackoverflow.com/questions/71788422/sendgrid-where-to-set-preheader-when-sending-html-dynamic-template-via-web-api
*************************************/

require("dotenv").config();
const { MailService } = require("@sendgrid/mail");
const sendgridClient = new MailService();
sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);

const recipient = "user@example.com"; // TODO Change email here
const subject = "Subject can be set via dynamic variable";

(async () => {
  await sendgridClient.send({
    to: {
      email: recipient,
    },
    from: {
      email: process.env.SENDGRID_EMAIL,
      name: "SendGrid Demo",
    },
    subject,
    templateId: "d-1e5ad7894a0b42b7b62c441698141505", // TODO Change template ID here
    dynamic_template_data: {
      subject,
      preheader: "Now I appear in the email",
    },
    attachments: [
      {
        content:
          "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",
        filename: "twilio.png",
        type: "image/png",
        disposition: "attachment",
      },
    ],
    categories: ["cake", "pie", "baking"],
  });
  console.log(`Email has been sent to ${recipient}.`);
})();
