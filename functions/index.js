const functions = require('firebase-functions');

const sendgrid = require('sendgrid')
const client = sendgrid("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")

function parseBody(body) {
  var helper = sendgrid.mail;
  var fromEmail = new helper.Email(body.from);
  var toEmail = new helper.Email(body.to);
  var subject = body.subject;
  var content = new helper.Content('text/html', body.content);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  return  mail.toJSON();
}


exports.httpEmail = functions.https.onRequest((req, res) => {
  return Promise.resolve()
    .then(() => {
      if (req.method !== 'POST') {
        const error = new Error('Only POST requests are accepted');
        error.code = 405;
        throw error;
      }


      const request = client.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: parseBody(req.body)
      });

      return client.API(request)


    })
    .then((response) => {
      if (response.body) {
          res.send(response.body);
          return null;
      } else {
          res.end();
          return null;
      }
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });


})