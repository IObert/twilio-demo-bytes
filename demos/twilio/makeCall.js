/************************************* 
Run this code to make a call

Required: Add the numbers which will communicate
in the call
Optional: Update the call once active
Docs: https://www.twilio.com/docs/voice/twiml/say
*************************************/

require("dotenv").config();
const client = require("./getTwilioClient")();

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`
);

const from = "+491510000000",
  to = "+491510000000"; // TODO Change numbers here

(async () => {
  /************************************* 
  Step 1: Trigger the call
  *************************************/
  const call = await client.calls.create({
    twiml: `<Response>
    <Say>Hi</Say>
    <Say language="de-DE">Ich werde 60 Sekunden warten und dann auflegen.</Say>
    <Pause length="60" />
    </Response>`,
    to,
    from,
    // statusCallback: "https://mobert.ngrok.io",
  });
  console.log(call.sid);

  const callSid = "CA0000000"; // TODO Insert call sid

  /************************************* 
  Step 2: Update the call with new instructions
  *************************************/

  // client
  //   .calls(callSid)
  //   .update({ twiml: "<Response><Say>Ahoy there, this is an update. Good bye.</Say></Response>" })
  //   .then((call) => console.log(call.to));
})();
