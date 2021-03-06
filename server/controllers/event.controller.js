import HttpStatus from 'http-status-codes';
import fs from 'fs';
import readline from 'readline';
const {google} = require('googleapis');
import moment from 'moment';
import { isUndefined, pickBy } from 'lodash';
import timezones from 'google-timezones-json';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, req, res) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, req, res);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, req, res) {
	const { date, location } = req.query;
	if (isUndefined(date)) {
		return res.json({
			error: false,
			data: []
		});
	}
	const timezone = date.slice(-6);
	const dd = moment(date).format("YYYY-MM-DD");
  const startOfDate = moment(dd).startOf('day').format("YYYY-MM-DDTHH:mm:ss") + timezone;
	const endOfDate = moment(dd).add(7, 'days').endOf('day').format("YYYY-MM-DDTHH:mm:ss") + timezone;
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
		timeMin: startOfDate,
		timeMax: endOfDate,
    singleEvents: true,
		orderBy: 'startTime',
		q: location,
  }, (err, resp) => {
		if (err) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				error: err
			})
		}
    const events = resp.data.items;
		return res.json({
			error: false,
			data: events
		})
  });
}

function createEvent(auth, req, res) {
	// const event = {
	// 	'summary': 'Google I/O 2015',
	// 	'location': '800 Howard St., San Francisco, CA 94103',
	// 	'description': 'A chance to hear more about Google\'s developer products.',
	// 	'start': {
	// 		'dateTime': '2019-03-12T09:00:00-07:00',
	// 		'timeZone': 'America/Los_Angeles',
	// 	},
	// 	'end': {
	// 		'dateTime': '2019-03-12T09:30:00-07:00',
	// 		'timeZone': 'America/Los_Angeles',
	// 	},
	// 	'recurrence': [
	// 		'RRULE:FREQ=DAILY;COUNT=2'
	// 	],
	// 	'attendees': [
	// 		{'email': 'lpage@example.com'},
	// 		{'email': 'sbrin@example.com'},
	// 	],
	// 	'reminders': {
	// 		'useDefault': false,
	// 		'overrides': [
	// 			{'method': 'email', 'minutes': 24 * 60},
	// 			{'method': 'popup', 'minutes': 10},
	// 		],
	// 	},
	// };
	const { summary, description, location, start, end, email } = req.body;
	const timezone = start.slice(-6);
	let timezoneStr = 'America/Los_Angeles';
	pickBy(timezones, (value, key) => {
		if (value.indexOf(timezone) > -1) {
			timezoneStr = key;
		}
	});
	const event = {
		'summary': summary,
		'description': description,
		'location': location,
		'start': { 'dateTime': start, 'timeZone': timezoneStr },
		'end': { 'dateTime': end, 'timeZone': timezoneStr },
		'attendees': [
			{'email': email },
		],
		'recurrence': [
			'RRULE:FREQ=DAILY;COUNT=2'
		],
		'reminders': {
			'useDefault': false,
			'overrides': [
				{'method': 'email', 'minutes': 24 * 60},
				{'method': 'popup', 'minutes': 10},
			],
		},
	};

  const calendar = google.calendar({version: 'v3', auth});
	calendar.events.insert({
		auth: auth,
		calendarId: 'primary',
		resource: event,
	}, (err, resp) => {
		if (err) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				error: err
			})
		}
		// Resp is an event
		return res.json({
			error: false,
			data: resp.data
		})
  });
}


function deleteEvent(auth, req, res) {
	const eventId = req.params.id;
  const calendar = google.calendar({version: 'v3', auth});
	calendar.events.delete({
		auth: auth,
		calendarId: 'primary',
		resource: event,
		eventId: eventId,
	}, (err, resp) => {
		if (err) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				error: err
			})
		}
		// Resp is an event
		res.json({
			error: false,
			data: 'Successfully deleted Event'
		})
  });
}

/**
 * Find all the events
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
	fs.readFile('credentials.json', (err, content) => {
		if (err) return console.log('Error loading client secret file:', err);
		// Authorize a client with credentials, then call the Google Calendar API.
		authorize(JSON.parse(content), listEvents, req, res);
	});
}

/**
 * store new event
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
	fs.readFile('credentials.json', (err, content) => {
		if (err) return console.log('Error loading client secret file:', err);
		// Authorize a client with credentials, then call the Google Calendar API.
		authorize(JSON.parse(content), createEvent, req, res);
	});
}

/**
 * Destroy event by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
	fs.readFile('credentials.json', (err, content) => {
		if (err) return console.log('Error loading client secret file:', err);
		// Authorize a client with credentials, then call the Google Calendar API.
		authorize(JSON.parse(content), deleteEvent, req, res);
	});
}