// eslint-disable-next-line no-unused-vars
import { apiDataStore } from './app.store';
import { makeFileUrlRequest } from '../requests/makeFileUrlRequest';
import { getTimestampInSeconds } from './../utils/getTimestamp';

export async function fetchFileUrltWithStateHandler(url) {
	console.debug('Setting local state', url);
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
