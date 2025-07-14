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
  // page over all messages
  let messagesPage = await client.messages.page({ pageSize: 1000 });

  while (messagesPage && messagesPage.instances.length > 0) {
    const messages = messagesPage.instances;
    console.log(`Processing ${messages.length} messages...`);
    try {
      messages.map((message) => {
        throttle(async () => {
          console.log(message.body);
          return client.messages(message.sid).remove();
        });
      });
    } catch (error) {
      console.error("Error processing messages:");
    }

    try {
      await throttle().then(() => {
        console.log(`Deleted ${messages.length} messages successfully.`);
      });
    } catch (error) {
      console.error("Error deleting messages:");
    }

    try {
      messagesPage = await messagesPage.nextPage();
    } catch (error) {
      console.error("Error fetching next page of messages:");
      break;
    }
  }

  const calls = await client.calls.list({
    limit: 400, // Adjust limit as needed
  });

  calls.map((call) => {
    throttle(async () => {
      return client.calls(call.sid).remove();
    });
  });

  throttle().then(() => {
    console.log(`Deleted ${calls.length} calls successfully.`);
  });
})();
