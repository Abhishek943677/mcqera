import nodemailer from "nodemailer";

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const senderName = req.body.senderName;
      const senderEmail = req.body.senderEmail;
      const msg = req.body.msg;
      const lastmsg =
        `Msg from ${senderName} \n
         Email : ${senderEmail} \n
         and message is :\n` +
        msg;

      // Nodemailer transporter setup
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "solity.fun@gmail.com", // Replace with your Gmail email
          pass: process.env.EMAIL_PASS, // Replace with your Gmail password or app password
        //   pass: "sbhxgwbneqyxpzlk", // Replace with your Gmail password or app password
        },
      });

      //   this is for owner
      const info = await transporter.sendMail({
        to: "solity.fun@gmail.com", // list of receivers
        subject: "Message From solity.tech user", // Subject line
        text: lastmsg, // plain text body
      });

      // this is for user
      const info2 = await transporter.sendMail({
        from: `"solity" <solity.fun@gmail.com>`, // sender address
        to: senderEmail, // list of receivers
        subject: "Message From solity.tech", // Subject line
        text: "thanks for contacting us. We received your email.", // plain text body
      });

      transporter.sendMail(info, function (error, info) {
        if (error) {
          res.json({ error: "sorry , Error occured while sending message." });
          return res.end();
        }

        res.json({ ok: "Message Sent , Thanks for contacting us." });
        return res.end();
      });
    } catch (error) {
      console.log(error);
      res.json({
        error:
          "Sorry , Some error occured at server, please try after some time.",
      });
      return res.end();
    }
  }
};
