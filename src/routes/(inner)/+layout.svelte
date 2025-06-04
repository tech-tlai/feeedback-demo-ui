<script>
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { Home, User, Upload } from 'lucide-svelte'; // example icons

	// Define your navItems and actionButtons for each route
	const navConfig = {
		'/dashboard-portal': {
			navItems: [
				{ label: 'Home', href: '/' }
				// { label: 'Profile', href: '/dashboard/profile', icon: User }
			],
			actionButtons: []
			// actionButtons: [{ label: 'Upload', href: '/dashboard/upload', icon: Upload, type: 'primary' }]
		},
		'/student/upload': {
			navItems: [],
			actionButtons: []
		},
		'/teacher/upload': {
			navItems: [],
			actionButtons: []
		}
	};

	// Compute the config based on the current route
	const headerConfig = derived(page, ($page) => {
		const path = $page.url.pathname;
		return navConfig[path] || { navItems: [], actionButtons: [] };
	});
</script>

<!-- Use $headerConfig to pass props -->
<Header {...$headerConfig} />

<main>
	<slot></slot>
</main>
