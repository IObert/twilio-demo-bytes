require("dotenv").config();
const client = require("./getTwilioClient")();

client.usage.records
  .list({
    startDate: new Date(Date.UTC(2023, 9, 1)),
    endDate: new Date(Date.UTC(2023, 9, 30)),
    limit: 100,
  })
  .then((records) => records.forEach((r) => console.log(r.asOf)));
