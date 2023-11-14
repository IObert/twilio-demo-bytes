/************************************* 
Run this code to return TwiML responses 

Required: Expose this server with ngrok and register 
the callback URL in the Twilio console
Docs: 
 - https://www.twilio.com/docs/messaging/twiml#a-basic-twiml-sms-response-example 
 - https://www.twilio.com/docs/voice/twiml/say
*************************************/

const fastify = require("fastify");
const ngrok = require("ngrok");
const FastifyBodyParser = require("@fastify/formbody");

const server = fastify({});

server
  .register(FastifyBodyParser)
  .all("/voice", async (req, reply) => {
    console.log(req.body);
    reply.type("text/xml");
    reply.send(`<Response>
    <Say>This call is powered by Twilio.</Say>
    <Pause length="2" />
    </Response>`);
  })
  .all("/text", async (req, reply) => {
    console.log(req.body);
    reply.type("text/xml");
    reply.send(`<Response>
    <Message><Body>
      Ahoy from Twilio,\nthanks for you're message!
      </Body></Message>
    </Response>`);
  });

const port = 3000;

server.listen({ port }, async function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Started locally at: ${address}`);
  process.env.NGROK_TOKEN && (await ngrok.authtoken(process.env.NGROK_TOKEN));
  ngrok
    .connect({ port, subdomain: process.env.NGROK_SUBDOMAIN })
    .then((url) => {
      console.log(
        `Started globally at: ${url}. Make sure to enter this in the Twilio Console under "Webhooks".`
      );
    })
    .catch((err) => {
      console.log(`Couldn't start ngrok ${err?.body?.details?.err}`);
    });
});
