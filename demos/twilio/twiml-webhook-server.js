/************************************* 
Run this code to return TwiML responses 

Required: Expose this server with ngrok and register 
the callback URL in the Twilio console
Docs: 
 - https://www.twilio.com/docs/messaging/twiml#a-basic-twiml-sms-response-example 
 - https://www.twilio.com/docs/voice/twiml/say
*************************************/

const fastify = require("fastify");
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
      Hello,\nThanks for you're message.
      </Body></Message>
    </Response>`);
  });

server.listen({ port: 3000 }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Restarted at: ${address}`);
});
