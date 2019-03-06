console.log(' =====  ', process.env.APP_HOST);

export const apiPath = 'api/';

export const APP_HOST = process.env.APP_HOST;
export const APP_PORT = process.env.APP_PORT;
export const HOST = `http://${APP_HOST}:${APP_PORT}/`;

export const BASE_URL = `${HOST}`;
export const API_URL = `${HOST}${apiPath}`;