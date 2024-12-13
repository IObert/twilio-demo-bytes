/************************************* 
Run this code to count all messages 
and calls from a given number

Required: Add the twilio number you check
Optional: Add a start date from which 
you want start the count
*************************************/

require("dotenv").config();
const client = require("./getTwilioClient")();

const NUMBER = "+491510000000"; // TODO Add number here
const DISTINCT = true;

console.log(
  `Counting for number ${NUMBER} of account ${process.env.TWILIO_ACCOUNT_SID}.`,
);

const day = "1/12/2024";
const today =
  new Date().getFullYear() +
  "/" +
  (new Date().getMonth() + 1) +
  "/" +
  new Date().getDate();
const firstOfMonth = new Date(
  new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/1",
);

(async () => {
  const calls = await client.calls.list({
    // dateSent: day, // TODO Change if needed
    from: NUMBER,
  });

  const uniqueCalls = new Set(calls.map((m) => m.to));
  console.log(
    `Triggered calls: ${DISTINCT ? uniqueCalls.size : uniqueMessages.length}`,
  );

  const messages = await client.messages.list({
    dateSentAfter: firstOfMonth, // TODO Change if needed
    from: NUMBER,
  });
  const uniqueMessages = new Set(messages.map((m) => m.to));
  console.log(
    `Triggered messages: ${DISTINCT ? uniqueMessages.size : messages.length}`,
  );

  const waMessages = await client.messages.list({
    dateSentAfter: firstOfMonth, // TODO Change if needed
    limit: 5000,
    from: `whatsapp:${NUMBER}`,
  });
  console.log(`Total WhatsApp messages: ${waMessages.length}`);
  const uniqueWaMessages = new Set(waMessages.map((m) => m.to));
  console.log(
    `Triggered WhatsApp messages: ${
      DISTINCT ? uniqueWaMessages.size : waMessages.length
    }`,
  );

  console.log(`Total: ${calls.length + messages.length + waMessages.length}`);
  console.log(
    `Unique: ${uniqueCalls.size + uniqueMessages.size + uniqueWaMessages.size}`,
  );
})();
