/************************************* 
Run this code to count all messages 
and calls from a given number

Required: Add the number you want to look up
Optional: Switch the data package
Docs: https://www.twilio.com/docs/lookup/v2-api
*************************************/

require("dotenv").config();
const client = require("twilio")();

console.log(`Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`);

(async () => {
  const phone_number = await client.lookups.v2.phoneNumbers("+491510000000")  // TODO Change number here
    .fetch({ fields: 'live_activity,sim_swap' }); // Optional: Request more fields
  console.log(phone_number);

})();
