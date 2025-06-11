import { writable } from 'svelte/store';

// Store for uploaded teacher files (File[])
export const teacherUploadedFiles = writable([]);
