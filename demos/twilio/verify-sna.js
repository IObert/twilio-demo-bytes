/************************************* 
Run this code to trigger a SNA challenge

Required: 
 * Add the number as a SNA Live Test Number (for demo purposes only)
 * Make sure the number is associated with a supported carrier
Optional: Create a account in you local edlge location, e.g. if you want to test EU numbers
Docs:
 - https://www.twilio.com/docs/verify/verify-sna-live-test-number
 - https://www.twilio.com/docs/verify/using-verify-silent-network-auth-with-twilio-regions 
*************************************/

require("dotenv").config();
const client = require("./getTwilioClient")("dublin");

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`
);

(async () => {
  /************************************* 
  Step 1: Create a new Verify service
  *************************************/
  const service = await client.verify.v2.services.create({
    friendlyName: "My Irish Verify Service",
  });
  console.log(service.sid);

  const verifyService = "VA000"; // TODO Insert sid of the verification service
  const to = "+491510000000"; // TODO Change number here

  /************************************* 
  Step 2: Create a new verification attempt
  *************************************/
  // const verification = await client.verify.v2
  //   .services(verifyService) // TODO Insert sid of the verification service
  //   .verifications.create({ to, channel: "sna" });
  // console.log(verification);

  /************************************* 
  Step 3: Send the verification URL to the user's phone 
  and ask them to open it. Make sure Slack, Gmail or other
  apps don't preview the link to avoid invalidation
  *************************************/

  /************************************* 
  Step 4: Check the verification attempt
  status: 'pending' could also mean "failed". 
  Need to check `snaAttemptsErrorCodes` as well
  *************************************/
  // const verification_check = await client.verify.v2
  //   .services(verifyService)
  //   .verificationChecks.create({ to });
  // console.log(verification_check);
})();
