// src/lib/context.js
import { writable } from 'svelte/store';

export const selectedClassStore = writable('');
export const chatContextStore = writable(null);
