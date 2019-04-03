import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import Admin from '../models/admin.model';
const sgMail = require('@sendgrid/mail');

function sendMail(to, subject, message, res) {
  const msg = {
    to: to,
    from: 'projects@andraemichaels.com',
    subject,
    text: message,
    html: message,
  };
  sgMail.send(msg, function(err, json) {
    if (err) { 
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err
      });
    }
    return res.json({
      error: false,
    });
  });
}

export function store(req, res) {
  const { subject, message, to, toAdmin } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  if (to) {
    sendMail(to, subject, message);
  } else if (toAdmin) {
    User
      .forge()
      .fetchAll()
      .then(users => {
        const emails = users.map(item => item.email);
        sendMail(emails, subject, message, res);
      })
  } else {
    Admin
      .forge()
      .fetchAll()
      .then(admins => {
        const emails = admins.map(item => item.email);
        sendMail(emails, subject, message, res);
      })
  }
}
