// eslint-disable-next-line no-unused-vars
import { apiDataStore } from './app.store';
import { makeFileUrlRequest } from '../requests/makeFileUrlRequest';
import { getTimestampInSeconds } from './../utils/getTimestamp';
import { makeMultipartFileRequest } from './../requests/makeMultipartFileRequest';

export async function fetchFileUrltWithStateHandler(url) {
	apiDataStore.set({
		updatedOn: getTimestampInSeconds(),
		loadingState: 'loading',
		fileUrl: url,
		requestType: 'url'
	});

	try {
		const response = await makeFileUrlRequest(url);

		apiDataStore.set({
			updatedOn: getTimestampInSeconds(),
			loadingState: 'success',
			fileUrl: url,
			requestType: 'url',
			resource: response
		});
	} catch (error) {
		apiDataStore.set({
			updatedOn: getTimestampInSeconds(),
			loadingState: 'failure',
			fileUrl: url,
			requestType: 'url',
			error
		});
	}
}

export async function fetchMultipartFiletWithStateHandler(file) {
	apiDataStore.set({
		updatedOn: getTimestampInSeconds(),
		loadingState: 'loading',
		file: file,
		requestType: 'upload'
	});

	try {
		const response = await makeMultipartFileRequest(file);

		apiDataStore.set({
			updatedOn: getTimestampInSeconds(),
			loadingState: 'success',
			file: file,
			requestType: 'upload',
			resource: response
		});
	} catch (error) {
		apiDataStore.set({
			updatedOn: getTimestampInSeconds(),
			loadingState: 'failure',
			file: file,
			requestType: 'upload',
			error
		});
	}
}
