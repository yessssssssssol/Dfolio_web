import nodemailer from "nodemailer";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

module.exports = (to, subject, text) =>
  new Promise((resolve, reject) => {
    const message = {
      to, // 발송 메일 주소
      subject, // 메일 제목
      text, // 메일 내용
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(info);
    });
  });
