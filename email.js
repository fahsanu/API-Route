const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/test/email', async (req, res) => {
    // const { from, to, subject, text } = req.body

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'fah1204fah@gmail.com',
            pass: 'kmmlgeoqxtlrcifm'
        }
    })

    // const data = {
    //     "from": "fah1204fah@gmail.com",
    //     "to": "sasinapaa@gmail.com",
    //     "subject": "sawaddeeja1",
    //     "text": "eiei1"
    // }

    try{ 
        const result = transporter.sendMail(req.body, (err, info) => {
            if(err) {
            // console.log(err);
            return res.json({ status: false, message: err });
            } else {
            console.log("Success")
                // console.log(info)
                // console.log(info.response)
                // return res.json({ status: true, message: "success"})
        }})
    res.send({ status: true, message: "success"})
    }catch(err) {
        return res.json({status: false, message: "error"})
    }
});

app.listen(3000, () => {
    console.log('Listening to port 3000..');
});