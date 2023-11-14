/************************************* 
Run this code to reply to incoming emails  

Required: Expose this server with ngrok and register 
the inbound parse URL in the SendGrid application
Docs: https://docs.sendgrid.com/ui/account-and-settings/inbound-parse
*************************************/

require("dotenv").config();
const fastify = require("fastify");
const ngrok = require("ngrok");
const FastifyMultipart = require("@fastify/multipart");
const { MailService } = require("@sendgrid/mail");
const { email } = require("datamask");

const sendgridClient = new MailService();
sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);
const server = fastify({});

const regExFloat = /([0-9]*[.])?[0-9]+/g;
server
  .register(FastifyMultipart, { addToBody: true })
  .all("/mail", async (request, reply) => {
    const sender = JSON.parse(request.body.envelope).from;
    console.log(
      `Incoming email "${request.body.subject}" from: ${email(sender)}`
    );
    const readNumber =
      request.body.text.match(regExFloat) &&
      request.body.text.match(regExFloat)[0];

    try {
      await sendgridClient.send({
        to: {
          email: sender,
        },
        from: {
          email: process.env.SENDGRID_EMAIL,
          name: "SendGrid Demo",
        },
        subject: `RE: ${request.body.subject}`,
        html: `<h1>Thanks for your email!</h1>
        <p>Here's the number you sent us "${readNumber}" based on the content of your email</p>
        <p style="margin-left:10%; margin-right:10%;font-style: italic;">${request.body.text}</p>`,
      });
      console.log(`Response has been sent to ${email(sender)}`);
      reply.code(201);
    } catch (error) {
      console.error(error);
      reply.code(500);
    }
    reply.send();
  });

const port = 3000;

server.listen({ port }, async function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Started locally at: ${address}`);
  process.env.NGROK_TOKEN && (await ngrok.authtoken(process.env.NGROK_TOKEN));
  ngrok
    .connect({ port, subdomain: process.env.NGROK_SUBDOMAIN })
    .then((url) => {
      console.log(
        `Started globally at: ${url}. Make sure to enter this in the SendGrid Console under "Inbound Parse".`
      );
    })
    .catch((err) => {
      console.log(`Couldn't start ngrok ${err?.body?.details?.err}`);
    });
});
