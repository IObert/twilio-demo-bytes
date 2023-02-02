/************************************* 
Run this code to send a verification code a message

Required: Add the numbers which will communicate
Optional: Setup a connection to SendGrid if you 
want to test the email verification
Docs: 
 - https://www.twilio.com/docs/verify/authentication-channels
 - https://www.twilio.com/docs/verify/email
*************************************/

require("dotenv").config();
const client = require("twilio")();

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`
);

(async () => {
  /************************************* 
  Step 1: Create a new Verify service
  *************************************/
  const service = await client.verify.v2.services.create({
    friendlyName: "My Demo Verify Service",
  });
  console.log(service.sid);

  const verifyService = "VA000"; // TODO Insert verification service sid
  const to = "+491510000000"; // TODO Change number here

  /************************************* 
   Step 2: Create a new verification attempt
   *************************************/
  // const verification = await client.verify.v2
  //   .services(verifyService)
  //   .verifications.create({ to, channel: "whatsapp" }); // Optional: Change the channel here
  // console.log(verification);

  /************************************* 
  Step 4: Insert code and then call this
  function to check the verification attempt
  *************************************/
  // const verification_check = await client.verify.v2
  //   .services(verifyService)
  //   .verificationChecks.create({ to, code: '1234' }); // TODO Insert the code you received (or a random 6-digit code)
  // console.log(verification_check);
})();
