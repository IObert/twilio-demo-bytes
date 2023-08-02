/************************************* 
Run this code to send a message via the Conversations API

Required: 
 - Add the ConversationSID 
 - Start a conversation via the sandbox
   https://console.twilio.com/us1/develop/conversations/tryout/whatsapp/user
Optional:
 - Add a ContentSID if you want to use the content API

https://www.twilio.com/docs/conversations/quickstart
*************************************/

require("dotenv").config();
const client = require("./getTwilioClient")();

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`
);

const contentMessage = {
  contentSid: "HX0000000000", // TODO Change numbers here
  contentVariables: JSON.stringify({
    1: "Twilio (Colombia)",
    2: "SendGrid (Aquamarine)",
    3: "Segment (Lambada)",
  }),
};

client.conversations.v1
  .conversations("CH00000000000000") // TODO Change this ID here
  .messages.create({
    author: "system",
    body: "Hello",
    // ...contentMessage,
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error));
