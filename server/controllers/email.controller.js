import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import Admin from '../models/admin.model';
import verifyTemplate from '../utils/verifyemail-template';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('SG.' + 'SbBCuVDmTtSnWW2HT6wIIw.VsqLHSCtei5zLJgIWA7DW99gnYBXIbr4lM-WD_eU_eg');

function sendMail(to, subject, message, res) {
  const msg = {
    to: to,
    from: 'projects@andraemichaels.com',
    subject,
    html: message,
  };
  sgMail.send(msg, function(err, json) {
    if (err && res) { 
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err
      });
    }
    if (res)
      return res.json({
        error: false,
      });
    return;
  });
}

export function store(req, res) {
  const { subject, message, to, toAdmin } = req.body;
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

export function confirmEmail(email, first_name, last_name, link) {
  const subject = 'Confirm your Email Address';
  const message = verifyTemplate(first_name, last_name, link);
  sendMail(email, subject, message);
}
