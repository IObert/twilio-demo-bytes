/************************************* 
Run this code to count all messages 
and calls from a given number

Required: Add the twilio number you check
Optional: Add a start date from which 
you want start the count
*************************************/

require("dotenv").config();
const client = require("twilio")();

console.log(
  `Counting for number ${NUMBER} of account ${process.env.TWILIO_ACCOUNT_SID}.`
);

const NUMBER = "+491510000000"; // TODO Add number here

const day = "9/10/2022";
const today =
  new Date().getFullYear() +
  "/" +
  (new Date().getMonth() + 1) +
  "/" +
  new Date().getDate();

(async () => {
  const calls = await client.calls.list({
    // dateSent: day, // TODO Change if needed
    from: NUMBER,
  });
  console.log(`Triggered calls: ${calls.length}`);

  const messages = await client.messages.list({
    // dateSent: day, // TODO Change if needed
    from: NUMBER,
  });
  console.log(`Triggered messages: ${messages.length}`);

  const waMessages = await client.messages.list({
    // dateSent: day, // TODO Change if needed
    from: `whatsapp:${NUMBER}`,
  });
  console.log(`Triggered WhatsApp messages: ${waMessages.length}`);

  console.log(`Total: ${calls.length + messages.length + waMessages.length}`);
})();
