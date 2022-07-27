const LOCAL_API_URL = 'http://localhost:7071/api/classify';
const PRODUCTION_API_URL = 'https://emotiondetectionapp.azurewebsites.net/api/classify';

export const Config = Object.freeze({
	API_URL: process.env.NODE_ENV === 'development' ? LOCAL_API_URL : PRODUCTION_API_URL
});
