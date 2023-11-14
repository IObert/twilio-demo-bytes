/************************************* 
Run this code to send a message

Required: Add the numbers which will communicate
Optional: Send WhatsApp messages if the sender is enabled
Docs: 
 - https://www.twilio.com/docs/sms/api/message-resource
 - https://www.twilio.com/docs/whatsapp/self-sign-up
*************************************/

require("dotenv").config();
const client = require("./getTwilioClient")();

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`
);

const from = process.env.TWILIO_SENDER || "Hello", // Optional: Change to phone number
  to = "491510000000", // TODO Change numbers here, Optional: Change to WhatsApp
  contentSid = process.env.TWILIO_CONTENT_SID;

client.messages
  .create({
    body: "Welcome to our Messaging Service!",
    to,
    from,
    // mediaUrl: "https://demo.twilio.com/owl.png",
    // statusCallback: "https://mobert.ngrok.io",
    // contentSid, // requires messaging service
    // contentVariables: JSON.stringify({
    //   1: 'Name'
    // }),
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error));
