/************************************* 
Run this code to send a message

Required: Add the numbers which will communicate
Optional: Send WhatsApp messages if the sender is enabled
Docs: 
 - https://www.twilio.com/docs/messaging/features/link-shortening/onboarding-guide
 - https://www.twilio.com/blog/how-to-schedule-and-track-marketing-campaigns
*************************************/

require("dotenv").config();
const client = require("./getTwilioClient")();

console.log(
  `Initialized client with account sid ${process.env.TWILIO_ACCOUNT_SID}`
);

// // Step 1: Link the Message Service with the domain

// client.messaging.v1
//   .linkshorteningMessagingService('DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
//   .create()
//   .then(linkshortening_messaging_service => console.log(linkshortening_messaging_service.domainSid));

//   // Step 2: Upload the certificate and private key
//   client.messaging.v1.domainCerts('DNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
//   .update({
//      tlsCert: `-----BEGIN CERTIFICATE-----
//      -----END CERTIFICATE-----
//      -----BEGIN PRIVATE KEY-----
//      -----END PRIVATE KEY-----`
//    })
//   .then(domain_certs => console.log(domain_certs.domainName));

// Step 3: Configuring Fallback and Callback URLs
// client.messaging.v1.domainConfig('DN54503f1128b44dc9b19b1bd881117a55')
//   .update({
//     messagingServiceSids: 'MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//     continueOnFailure: true,
//     disableHttps: true,
//     fallbackUrl: 'https://twilio.com',
//     callbackUrl: 'https://mobert.ngrok.io'
//   })
//   .then(domain_config => console.log(domain_config.domainSid));

// Step 4: Send a message with a shortened link

client.messages
  .create({
    shortenUrls: true,
    body: "Check out this awesome link https://www.twilio.com/docs/messaging/features/link-shortening/onboarding-guide",
    to: "whatsapp:+491510000000", // TODO Add your number here
    from: "MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // TODO Add your messaging service here
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(error));
