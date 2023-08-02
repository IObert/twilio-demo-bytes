/************************************* 
Run this code after a live demo 
or at the end of the day 
to remove all user data from the logs
*************************************/

require("dotenv").config();
const client = require("./getTwilioClient")();

console.log(`Clearing logs for account ${process.env.TWILIO_ACCOUNT_SID}.`);

(async () => {
  let messages = await client.messages.list({});

  await Promise.all(
    messages.map((message) => {
      console.log(message.body);
      return client.messages(message.sid).remove();
    })
  );
  console.log(`Deleted ${messages.length} messages successfully.`);

  const calls = await client.calls.list({});

  await Promise.all(
    calls.map((call) => {
      return client.calls(call.sid).remove();
    })
  );
  console.log(`Deleted ${calls.length} calls successfully.`);
})();
