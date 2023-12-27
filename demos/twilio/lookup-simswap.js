/************************************* 
Run this code to loop up details about 
a phone number

Required: Add the number you want to look up
Optional: Look up other packages / fields
Docs: https://www.twilio.com/docs/lookup/v2-api
*************************************/

require("dotenv").config();
const client = require("./getTwilioClient")("dublin");

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`
);

(async () => {
  const phone_number = await client.lookups.v2
    .phoneNumbers("+44 1234 123456") // TODO Change number here
    .fetch({ fields: "sim_swap" }); // Optional: Request more fields
  console.log(phone_number);
})();
