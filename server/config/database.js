if (process.env.NODE_ENV === 'development') {
	require('dotenv').config({ path: '.env.development' });

} else {
	require('dotenv').config();
}

export default {
	client: process.env.DB_CLIENT,
	connection: {
		host: process.env.DB_HOST || '127.0.0.1',
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		charset: 'utf8'
	},
	migrations: {
		tableName: 'migrations',
		directory: process.cwd() + '/server/migrations',
	},
	debug: true
};