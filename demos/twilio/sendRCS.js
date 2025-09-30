/************************************* 
Run this code to send a message

Required: Add the numbers which will communicate
Optional: Send WhatsApp messages if the sender is enabled
Docs: 
 - https://www.twilio.com/docs/sms/api/message-resource
 - https://www.twilio.com/docs/whatsapp/self-sign-up
*************************************/

const { Twilio } = require("twilio");

require("dotenv").config();
const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`,
);

client.messages
  .create({
    // step 1: Greeting, ask for email
    // contentSid: "HX40653d0c27f7bee398c7bff65fc74541",

    // step 2: Ask for email
    // body: "Thanks. Please enter your business email address. We will then use Twilio Verify and SendGrid to send you an one-time password.",

    // step 3: Send OTP
    // body: "We have sent you an email with a verification code. Please reply with the code we sent to your email address.\n\nIf you did not receive the email, please check your spam folder or enter a new email address.\n\n\nBy entering the password, you agree to our privacy policy and terms of service.",


    // step 4: Finish registration
    // body: "Thank you! Your email address has been verified. Have a look at out menu below ⬇️\n\nPS: Every attendee can get up to 2 tea.",

    // step 5: Send menu, order a flat white!
    // contentSid: "HXcc1ef1e572bbb47715c152aae066993a",
    body: `I'm sorry, I don't understand "Can I have another one?". Please choose one of the following options:
- Cappuccino
- Caffè Latte
- Espresso
- Latte Macchiato
- Flat White

Milk options:
- Whole milk
- Oat milk
- Almond milk`,
    body: "Got it. Your order #9 (Latte Macchiato) is on its way ☕️"
    body: `We're still preparing your Latte Macchiato order #9.
Send "cancel" to cancel the order or "change to <new order>" to modify it.`
    body: "I'm sorry. "Oatly" is not a valid milk option. Please choose between: Whole milk, Oat milk, or Almond milk.",
  body: "Got it. Your order #9 (Latte Macchiato with oat milk) is on its way ☕️"
    body: `We're still preparing your Latte Macchiato with oat milk order #9.
Send "cancel" to cancel the order or "change to <new order>" to modify it.`


    // curl -X GET 'https://content.twilio.com/v1/Content/HXe43e1c8eafe52dfe8111eb41e04bf154/ApprovalRequests' \
    // -H 'Content-Type: application/json' \
    // -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

    // step 6: order confirmation
    // contentSid: "HXa6289dd49e967193d7f8c5064201f4db",

    // step 7: order ready
    // body: "Your order is ready! Come to the counter and show this message to get your Flat White.",
    contentVariables: {},
    to: "rcs:+4915161873292",
    from: "rcs:burgernow_gotbbd66_agent"
    // mediaUrl: "https://pbs.twimg.com/media/GZbs3vZWAAAwqVX?format=jpg&name=medium",
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error));
