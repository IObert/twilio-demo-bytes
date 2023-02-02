/************************************* 
Run this code to send an email 

Required: Add the recipient who will receive the email
Optional: Send a email with HTML content or use a template
Docs: https://docs.sendgrid.com/api-reference/mail-send/mail-send
*************************************/

const { MailService } = require("@sendgrid/mail");
const sendgridClient = new MailService();
sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);

const recipient = "name@example.com"; // TODO Change email here

(async () => {
  await sendgridClient.send({
    to: {
      email: recipient,
    },
    from: {
      email: process.env.SENDGRID_EMAIL,
      name: "SendGrid Demo",
    },
    subject: "Live Demo",
    // text: "Yay, the demo worked!", // Optional: Change to use a template
    html: `<h1>Yay, the demo worked!</h1> 
        <p>You can even write HTML content in this property</p>
        <h2>Emoji List</h2>
        <ul>
          <li>🍔 Food</li>
          <li>🚗 Transportation</li>
          <li>🏠 Home</li>
          <li>🌞 Nature</li>
          <li>😃 Emotions</li>
        </ul>
    
        <h2>Table of Emojis</h2>
        <table>
          <tr>
            <th>Emoji</th>
            <th>Category</th>
          </tr>
          <tr>
            <td>🍔</td>
            <td>Food</td>
          </tr>
          <tr>
            <td>🚗</td>
            <td>Transportation</td>
          </tr>
          <tr>
            <td>🏠</td>
            <td>Home</td>
          </tr>
          <tr>
            <td>🌞</td>
            <td>Nature</td>
          </tr>
          <tr>
            <td>😃</td>
            <td>Emotions</td>
          </tr>
        </table>`,
  });
  console.log(`Emails has been sent to ${recipient}.`);
})();
