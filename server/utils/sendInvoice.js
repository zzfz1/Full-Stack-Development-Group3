import nodemailer from "nodemailer";

export const mailTransport = async (userEmail, order) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USERNAME_MAILTRAP,
      pass: process.env.PASSWORD_MAILTRAP,
    },
  });

  let mailOptions = {
    from: "web.shop@example.com", // sender address
    to: userEmail, // list of receivers
    subject: "Invoice of your order", // Subject line
    text: "The Invoice", // plain text body
    html: message(order), // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const message = (order) => {
  const orderItems = order.orderItems
    .map(
      (item) =>
        `<li>${item.name} (Qty: ${item.qty}) - Price: ${item.price} x ${
          item.qty
        } = ${item.price * item.qty}</li>`
    )
    .join("");
  return `<!DOCTYPE html>
<html>
<head>
  <title>Password Reset Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #F0F0F0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #FFFFFF;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
    }
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }
    p {
      font-size: 18px;
      margin-bottom: 20px;
      text-align: center;
    }
    button {
      background-color: #4CAF50;
      color: #FFFFFF;
      font-size: 18px;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #3E8E41;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Email Invoice</h2>
    <p>Here's all the information about your order:</p>
    <ul>
      ${orderItems}
    </ul>
    <p>Total Price: ${order.totalPrice}</p>
  </div>
</body>
</html>
`;
};
