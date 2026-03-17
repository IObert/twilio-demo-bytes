/************************************* 
Run this code to handle incoming WhatsApp messages with typing indicators

Required: Expose this server with ngrok and register 
the callback URL in the Twilio console
Docs: 
 - https://www.twilio.com/docs/whatsapp/api/typing-indicators-resource
 - https://www.twilio.com/docs/sms/api/message-resource
*************************************/

require("dotenv").config();
const fastify = require("fastify");
const ngrok = require("ngrok");
const FastifyBodyParser = require("@fastify/formbody");
const client = require("./getTwilioClient")();

const server = fastify({});

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

server
  .register(FastifyBodyParser)
  .all("/message", async (req, reply) => {
    console.log("Incoming message:", req.body);
    
    const { From, To, Body, MessageSid } = req.body;
    
    // Immediately respond with empty TwiML (200 OK)
    reply.type("text/xml");
    reply.send(`<Response></Response>`);
    
    // Handle the typing indicator and message reply asynchronously
    (async () => {
      try {
        // Wait 2 seconds before sending typing indicator
        await delay(2000);
        
        // Send typing indicator using the incoming message SID
        console.log("Sending typing indicator for message:", MessageSid);
        const authToken = process.env.TWILIO_AUTH_TOKEN || client.password;
        const accountSid = process.env.TWILIO_ACCOUNT_SID || client.username;
        const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
        
        const formData = new URLSearchParams();
        formData.append('messageId', MessageSid);
        formData.append('channel', 'whatsapp');
        
        await fetch('https://messaging.twilio.com/v2/Indicators/Typing.json', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData
        });

        // Wait 10 seconds before sending the actual reply
        await delay(10000);
        
        // Send the reply message
        console.log("Sending reply message...");
        const message = await client.messages.create({
          from: To,
          to: From,
          body: `Thanks for your message: "${Body}". This is an automated reply with typing indicator!`
        });
        
        console.log("Reply sent with SID:", message.sid);
      } catch (error) {
        console.error("Error handling message:", error);
      }
    })();
  });

const port = 3000;

server.listen({ port }, async function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Started locally at: ${address}/message`);
  console.log(`Webhook endpoint: /message`);
  process.env.NGROK_TOKEN && (await ngrok.authtoken(process.env.NGROK_TOKEN));
  ngrok
    .connect({ port, subdomain: "mobert" })
    .then((url) => {
      console.log(
        `Started globally at: ${url}/message`
      );
      console.log(`Configure this URL in the Twilio Console for WhatsApp incoming messages.`);
    })
    .catch((err) => {
      console.log(`Couldn't start ngrok ${err?.body?.details?.err}`);
    });
});
