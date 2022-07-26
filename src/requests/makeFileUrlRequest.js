import { Config } from '../app.config';
import fetchWrapper from './fetchWrapper';

const API_URL = Config.API_URL;

export function checkURLisImage(url) {
	return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function testImage(url, timeoutInMs = 5000) {
	return new Promise(function (resolve, reject) {
		let timer;
		let img = new Image();

		img.onerror = img.onabort = function () {
			clearTimeout(timer);
			reject('Error loading image');
		};

		img.onload = function () {
			clearTimeout(timer);
			resolve('Verified image can be loaded');
		};

		timer = setTimeout(function () {
			// reset .src to invalid URL so it stops previous
			// loading, but doesn't trigger new load
			img.src = '//!!!!/test.jpg';
			reject('timeout');
		}, timeoutInMs);

		img.src = url;
	});
}

/** @type {(fileUrl: string) => Promise<any>} */
export function makeFileUrlRequest(fileUrl) {
	if (!checkURLisImage(fileUrl)) {
		return Promise.reject('File URL is not an image');
	}

	testImage(fileUrl).catch(() => {
		return Promise.reject('File URL could not be loaded');
	});

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ img_url: fileUrl })
	};

	return fetchWrapper(API_URL, requestOptions);
}
