const SUPPORTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
import { Config } from '../app.config';
import fetchWrapper from './fetchWrapper';

/**
 * @param {File} file
 */
export function makeMultipartFileRequest(file) {
	if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
		return Promise.reject('File type is not supported');
	}

	const formData = new FormData();

	formData.append('file', file);

	const requestParams = {
		method: 'POST',
		body: formData
	};

	return fetchWrapper(Config.API_URL, requestParams);
}
