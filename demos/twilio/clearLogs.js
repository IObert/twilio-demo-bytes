/************************************* 
Run this code after a live demo 
or at the end of the day 
to remove all user data from the logs
*************************************/

//TODO make sure this works before commiting and pushing

require("dotenv").config();
const throttledQueue = require("throttled-queue");
const client = require("./getTwilioClient")();

console.log(`Clearing logs for account ${process.env.TWILIO_ACCOUNT_SID}.`);

const throttle = throttledQueue(60, 1000); // at most 5 requests per second.

(async () => {
  let messages = await client.messages.list({});

  messages.map((message) => {
    throttle(async () => {
      console.log(message.body);
      return client.messages(message.sid).remove();
    });
  });
  throttle().then(() => {
    console.log(`Deleted ${messages.length} messages successfully.`);
  });

  const calls = await client.calls.list({});

  calls.map((call) => {
    throttle(async () => {
      return client.calls(call.sid).remove();
    });
  });

  throttle().then(() => {
    console.log(`Deleted ${calls.length} calls successfully.`);
  });
})();
