const SUPPORTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
import { Config } from '../app.config';

/**
 * @param {File} file
 */
export function makeMultipartFileRequest(file) {
	return new Promise((resolve, reject) => {
		if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
			reject('File type is not supported');
		}

		const formData = new FormData();

		formData.append('file', file);

		const requestParams = {
			method: 'POST',
			body: formData
		};

		fetch(Config.API_URL, requestParams)
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
