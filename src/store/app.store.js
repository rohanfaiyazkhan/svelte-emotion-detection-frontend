// eslint-disable-next-line no-unused-vars
import { writable, Writable } from 'svelte/store';

/**
 * @typedef {"success" | "failure" | "loading" | "idle"} LoadingState
 *
 * @typedef {{
 *  loadingState: LoadingState;
 *  error?: unknown;
 *  resource?: unknown;
 *  requestType?: "url" | "upload"
 *  fileUrl?: string;
 *  file?: File
 * }} ApiData
 *


/** @type {ApiData} */
const inititalApiData = {
	loadingState: 'idle'
};

export const apiDataStore = writable(inititalApiData);
