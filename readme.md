# Twilio Demo Bytes

This mono repo hosts a collection of snippets that help to understand the power and ease of Twilio services. The code of these minimal demos is enriched with helpful comments to make the files as self-explaining as possible.

## Prerequisites

Before you can run this project, ensure that you have the following prerequisites:

- Node.js and npm installed on your machine.

- A SendGrid account. If you don't have one, sign up for free at [SendGrid](https://sendgrid.com/) and obtain an API key.

- A Twilio account. If you don't have one, sign up for free at [Twilio](https://www.twilio.com/) and obtain your account SID, auth token, API key, and API secret.

- A verified email sender in your SendGrid account. To set up a verified email sender, follow the instructions [here](https://sendgrid.com/docs/ui/sending-email/sender-verification/).

## Project Configuration

This project requires the usage of environment variables to configure certain services. To set up these variables, follow the steps below:

1. Copy the `sample.env` file and create a new file named `.env`.

2. Open the `.env` file and replace the placeholders with your actual API keys and credentials.

   ```
   SENDGRID_API_KEY="SG.xxxxxx"
   SENDGRID_EMAIL="demo@example.con"

   TWILIO_ACCOUNT_SID="xxxxxx"
   TWILIO_AUTH_TOKEN="xxxxxx"
   TWILIO_API_KEY="xxxxxx"
   TWILIO_API_SECRET="xxxxxx"

   TWILIO_IR_API_KEY="xxxxxx"
   TWILIO_IR_AUTH_TOKEN="xxxxxx"
   ```

   - Replace `SG.xxxxxx` with your actual SendGrid API key.
   - Replace `demo@example.con` with the email associated with your SendGrid account.
   - Replace `xxxxxx` with your actual Twilio account SID, auth token, API key, API secret, IR API key, and IR auth token.

3. Save the changes to the `.env` file
