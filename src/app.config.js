export const Config = Object.freeze({
	API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:7071' : ''
});
