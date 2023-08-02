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

const from = "+491510000000",
  to = "+491510000000"; // TODO Change numbers here, Optional: Change to WhatsApp

client.messages
  .create({
    body: "Welcome to our Messaging Platform!",
    to,
    from,
    // mediaUrl: "https://demo.twilio.com/owl.png",
    // statusCallback: "https://mobert.ngrok.io",
    // from: "AlphaSender",
    // contentSid: 'HX...XXX', // requires messaging service
    // from: 'MG...XXX',
    // contentVariables: JSON.stringify({
    //   1: 'Name'
    // }),
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error));
