/************************************* 
Run this code to send a message via the Conversations API

Required: Start a conversation via the sandbox
 - https://console.twilio.com/us1/develop/conversations/tryout/whatsapp/user
*************************************/

require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const client = require("twilio")(apiKey, apiSecret, { accountSid: accountSid });

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
  contentSid: "HX0f91129ec6e3832b310f4f95533daa01", // TODO Change numbers here
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
  .conversations("CHd5af2d49f4d44322871388ed0ea3e7e8") // TODO Change this ID here
  .messages.create({
    author: "system",
    ...baseObject,
  })
  .then((message) => console.log(message.sid));
