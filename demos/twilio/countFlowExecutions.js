/************************************* 
Run this code to count all flow executions
from a given flow sid

Required: Add the twilio flow sid you check
*************************************/

require("dotenv").config();
const client = require("./getTwilioClient")();

const FLOW_SID = "FWxxxxxxxxx"; // TODO Add flow sid here

console.log(
  `Counting for number ${FLOW_SID} of account ${process.env.TWILIO_ACCOUNT_SID}.`,
);

(async () => {
  const executions = await client.studio.v2.flows(FLOW_SID).executions.list({
    limit: 1000,
  });

  const lastSteps = await Promise.all(
    executions.map(async (execution) => {
      const steps = await client.studio.v2
        .flows(FLOW_SID)
        .executions(execution.sid)
        .steps.list({ limit: 1 });

      return steps[0].transitionedTo;
    }),
  );

  const lastStepsCount = lastSteps.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  console.log("Last steps count: ", lastStepsCount);

  const uniqueExecutions = new Set(
    executions.map((m) => m.contactChannelAddress),
  );
  console.log(`Triggered total executions: ${executions.length}`);
  console.log(`Triggered unique executions: ${uniqueExecutions.size}`);
})();
