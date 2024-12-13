/************************************* 
Run this code after a live demo 
or at the end of the day 
to remove all user data from the logs
*************************************/

//TODO make sure this works before commiting and pushing

require("dotenv").config();
const client = require("./getTwilioClient")();

console.log(`Clearing logs for account ${process.env.TWILIO_ACCOUNT_SID}.`);

(async () => {
  let messages = await client.messages.list({});

  messages.map((message) => {
    console.log(message.errorCode, message.errorMessage);
  });

  const calls = await client.calls.list({});

  calls.map((call) => {
    call.errorCode && console.log(call.errorCode);
  });
})();
