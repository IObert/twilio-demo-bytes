/************************************* 
Run this code after a live demo 
or at the end of the day 
to remove all user data from the logs
*************************************/

//TODO make sure this works before commiting and pushing

require("dotenv").config();
const { throttledQueue, seconds } = require("throttled-queue");
const client = require("./getTwilioClient")();

console.log(`Clearing logs for account ${process.env.TWILIO_ACCOUNT_SID}.`);

const throttle = throttledQueue({
  maxPerInterval: 5,
  interval: seconds(1),
  evenlySpaced: true,
});

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
        }).catch((error) => {
          console.error(`Error deleting message ${message.sid}:`, error.message);
        });
      });
    } catch (error) {
      console.error("Error processing messages:");
    }

    try {
      await throttle(() => {
        console.log(`Deleted ${messages.length} messages successfully.`);
      });
    } catch (error) {
      console.error("Error deleting messages:");
    }

    try {
      // Re-fetch page 1 instead of calling nextPage(): the messages we just
      // deleted have fallen out of the list, so this naturally advances.
      // nextPage() would instead request Twilio's cursor for this page,
      // which is anchored to the last message's SID - already deleted by
      // now - and Twilio returns a 400 for a cursor pointing at a missing
      // resource.
      messagesPage = await client.messages.page({ pageSize: 1000 });
    } catch (error) {
      console.error("Error fetching next page of messages:", error.message);
      break;
    }
  }

  const calls = await client.calls.list({
    limit: 400, // Adjust limit as needed
  });

  calls.map((call) => {
    throttle(async () => {
      return client.calls(call.sid).remove();
    }).catch((error) => {
      console.error(`Error deleting call ${call.sid}:`, error.message);
    });
  });

  throttle(() => {
    console.log(`Deleted ${calls.length} calls successfully.`);
  });
})();
