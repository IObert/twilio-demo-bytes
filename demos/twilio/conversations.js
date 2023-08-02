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

const wrong = "Blaubeere",
  firstOption = "Twilio (Colombia)",
  firstDetails = "Strawberry, Pineapple, Apple, Sunflower Seeds 🍓🍍🍏🌻",
  secondOption = "SendGrid (Aquamarine)",
  secondDetails = "Pineapple, Banana, Coconut Milk, Dates, Flaxseed 🍍🍌🥥🌴",
  thirdOption = "Segment (Lambada)",
  thirdDetails =
    "Orange, Mango, Banana, Passion Fruit, Flaxseed, Coconut Oil 🍊🥭🍌🥥";

const baseObject = {
  contentSid: "HX19333d1340589f693db920767ace8ee4", // TODO Change numbers here
  contentVariables: JSON.stringify({
    1: firstOption,
    2: firstDetails,
    3: secondOption,
    4: secondDetails,
    5: thirdOption,
    6: thirdDetails,
  }),
};

client.conversations.v1
  .conversations("CH898aeeddb59d4fe281a2903e18b55cb4") // TODO Change this ID here
  .messages.create({
    author: "system",
    body: "Hello",
    // ...baseObject,
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error));
