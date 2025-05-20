import { writable } from 'svelte/store';

export const questions = writable([]);
export const genHistoryStore = writable([]);
export const chatHistoryStore = writable([]);
export const pinnedChatStore = writable([]);