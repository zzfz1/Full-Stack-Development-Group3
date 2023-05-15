import nodemailer from "nodemailer";

export const mailTransport = async (name, userEmail, feedback) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USERNAME_MAILTRAP,
      pass: process.env.PASSWORD_MAILTRAP,
    },
  });

  let mailOptions = {
    from: userEmail, // sender address
    to: "web.shop@example.com", // list of receivers
    subject: `Feedback From ${name}`, // Subject line
    text: "Feedback", // plain text body
    html: message(name, userEmail, feedback), // html body
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

const message = (name, email, feedback) => {
  return `<!DOCTYPE html>
<html>
<head>
  <title>User Feedback</title>
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
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>User Feedback</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Feedback:</strong> ${feedback}</p>
  </div>
</body>
</html>`;
};
