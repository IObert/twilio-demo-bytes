module.exports = function getClient(region) {
  if (region === "dublin") {
    return require("twilio")(
      process.env.TWILIO_IR_API_KEY,
      process.env.TWILIO_IR_AUTH_TOKEN,
      {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        edge: "dublin",
        region: "ie1",
      }
    );
  }
  return require("twilio")(
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
    }
  );
};
