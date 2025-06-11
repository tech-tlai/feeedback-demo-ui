<script>
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { Home, User, Upload } from 'lucide-svelte'; // example icons
	import SearchableComboBox from '$lib/components/SearchableComboBox.svelte';
	import { goto } from '$app/navigation';

	// Define your navItems and actionButtons for each route
	const navConfig = {
		'/dashboard-portal': {
			navItems: [
				// { label: 'Home', href: '/' }
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

	let selectedStudent = null;
	let selectedTeacher = null;

	function handleStudentSelect(event) {
		console.log('e.detail from combobox', event.detail);
		const itemDetails = event.detail.itemDetails;
		selectedStudent = itemDetails;
		console.log('selectedStudent', selectedStudent);

		// Extract name and class from the selected item
		const name = selectedStudent.name;
		const class_ = selectedStudent.grade || itemDetails.class || itemDetails.class_; // fallback for different keys
		const id = selectedStudent.id;
		if (name) {
			const params = new URLSearchParams();
			params.set('name', name);
			if (class_) params.set('class', class_);
			goto(`/student/dashboard/${encodeURIComponent(id)}?${params.toString()}`);
			// goto(`/student/dashboard?${params.toString()}`);
		}
	}

	function handleTeacherSelect(event) {
		const itemDetails = event.detail.itemDetails;
		selectedTeacher = itemDetails;
		console.log('selectedTeacher', selectedTeacher);

		// Extract name and subject from the selected item
		const name = selectedTeacher.name;
		const subject = selectedTeacher.subject;
		const id = selectedTeacher.id;
		const params = new URLSearchParams();
		params.set('name', name);
		if (subject) params.set('subject', subject);
		if (name) {
			goto(`/teacher/dashboard/${encodeURIComponent(id)}?${params.toString()}`);
		}
	}

	// Compute the config based on the current route
	const headerConfig = derived(page, ($page) => {
		const path = $page.url.pathname;
		return navConfig[path] || { navItems: [], actionButtons: [] };
	});
</script>

<!-- Use $headerConfig to pass props -->
<Header {...$headerConfig}>
	<div slot="header-custom-actions">
		{#if $page.url.pathname.startsWith('/student/dashboard')}
			<SearchableComboBox
				options={[
					{ id: 1, name: 'Aarav Nair', grade: '10', section: 'A' },
					{ id: 2, name: 'Saanvi Das', grade: '10', section: 'A' },
					{ id: 3, name: 'Ishaan Gupta', grade: '10', section: 'B' },
					{ id: 4, name: 'Meera Menon', grade: '10', section: 'B' },
					{ id: 5, name: 'Aditya Pillai', grade: '10', section: 'C' },
					{ id: 6, name: 'Riya Sharma', grade: '10', section: 'C' },
					{ id: 7, name: 'Krishna Reddy', grade: '10', section: 'D' }
				]}
				placeholder="Search student..."
				on:handleDispatchComboBoxData={handleStudentSelect}
			/>
		{:else if $page.url.pathname.startsWith('/teacher/dashboard')}
			<SearchableComboBox
				options={[
					{ id: 1, name: 'Mrs. Sharma', subject: 'Maths', section: 'A' },
					{ id: 2, name: 'Mr. Kumar', subject: 'Science', section: 'A' },
					{ id: 3, name: 'Ms. Iyer', subject: 'English', section: 'B' },
					{ id: 4, name: 'Mr. Singh', subject: 'Social', section: 'B' },
					{ id: 5, name: 'Ms. Reddy', subject: 'Hindi', section: 'C' }
				]}
				placeholder="Search teacher..."
				on:handleDispatchComboBoxData={handleTeacherSelect}
			/>
		{/if}
	</div>
</Header>

<main>
	<slot></slot>
</main>
