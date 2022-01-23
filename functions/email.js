const nodemailer = require("nodemailer");

const Email = async (req, res) => {
    try {
        console.log("application successfully accepted");
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "asaindus.company@gmail.com", // generated ethereal user
                pass: "ASAindus1234", // generated ethereal password
            },
        });

        let html = `<div style="border-radius:0.5rem;border-width:2px;border-color:rgb(0,0,0);display:grid;place-items:center"><p style="font-size:1.25rem;line-height:1.75rem;width:80%;margin-left:auto;margin-right:auto;margin-top:1rem;margin-bottom:1rem;">The OTP for Curato login is ${res.locals.otp}</div>`; // html body

        // send mail with defined transport object
        /* let info =  */ await transporter.sendMail({
            from: '"Applicant Manager" <asaindus.company@gmail.com>', // sender address
            to: res.locals.email, // list of receivers
            subject: `${req.body.first} ${req.body.lastName} applied for ${req.body.applyingFor}`, // Subject line
            html,
        });
        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        // main().catch(console.error);

        res.status(201).send("success");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
};
module.exports = Email;
