const functions = require('firebase-functions');

const sendgrid = require('sendgrid')
const cors = require('cors')({ origin: true });

const SENDGRID_API_KEY = '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';


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);


exports.httpEmail = functions.https.onRequest((req, res) => {

    cors( req, res, () => { 

        const toName  = req.body.toName;
        const toEmail = req.body.toEmail;

        const msg = {
            to: toEmail,
            from: 'hello@angularfirebase.com',
            subject:  'New Follower',
           
        };

        return sgMail.send(msg)
                
            .then(() => res.status(200).send('email sent!') )
            .catch(err => res.status(400).send(err) )

        });

});