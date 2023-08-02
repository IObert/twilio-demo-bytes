module.exports = function getClient() {
  return require("twilio")(
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
    }
  );
};
