<script>
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { Home, User, Upload } from 'lucide-svelte'; // example icons
	import SearchableComboBox from '$lib/components/SearchableComboBox.svelte';
	import { goto } from '$app/navigation';
	import { teacherListStore } from '$lib/stores/teacherUploadStore.js';
	import { selectedClassStore } from '$lib/stores/globalFilters.js';
	import { studentListStore } from '$lib/stores/studentUploadState.js';
	import {getStudentDashboardUrl} from "$lib/utils"

	// Define your navItems and actionButtons for each route
	const navConfig = {
		'/dashboard-portal': {
			navItems: [
				// { label: 'Upload teacher data', href: '/teacher/upload' }
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
		// const name = selectedStudent.name;
		// const class_ = selectedStudent.grade || itemDetails.class || itemDetails.class_; // fallback for different keys
		// const id = selectedStudent.id;
		// if (name) {
		// 	// const params = new URLSearchParams();
		// 	// params.set('name', name);
		// 	// if (class_) params.set('class', class_);
		// 	// goto(`/student/dashboard/${encodeURIComponent(id)}?${params.toString()}`);
			
		// }
		goto(getStudentDashboardUrl({
			studentId: selectedStudent.studentId,
			name: selectedStudent.name,
			subject: selectedStudent?.subjects[0] || '',
			allSubjects: selectedStudent?.subjects
		}));
	}

	function handleTeacherSelect(event) {
		const itemDetails = event.detail.itemDetails;
		selectedTeacher = itemDetails;
		console.log('selectedTeacher', selectedTeacher);
		// Extract name and subject from the selected item

		const name = selectedTeacher.name;
		const id = selectedTeacher.id;
		const classSubject = selectedTeacher.class_subject?.[0] || {};
		const className = classSubject.class ? classSubject.class : '-';
		selectedClassStore.set({
			className: className,
			class_: classSubject.class?.[0],
			division: classSubject.class?.[1],
			subject: classSubject.subject,
			teacherId: id,
			fullClassName: `${className} ${classSubject.subject}`
		});
		const params = new URLSearchParams();
		params.set('name', name);
		if (classSubject.subject) params.set('subject', classSubject.subject);
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
				options={$studentListStore}
				placeholder="Search student..."
				on:handleDispatchComboBoxData={handleStudentSelect}
			/>
		{:else if $page.url.pathname.startsWith('/teacher/dashboard')}
			<div class="flex w-[400px] gap-8 items-center">
				<ul>
					<li>
						<a href="/teacher/upload" class="min-w-[200px]">Upload teachers</a>
					</li>
				</ul>
				<SearchableComboBox
					options={$teacherListStore}
					placeholder="Search teacher..."
					on:handleDispatchComboBoxData={handleTeacherSelect}
				/>
			</div>
		{/if}
	</div>
</Header>

<!-- {#key $page.url.pathname}
	<main>
		<slot></slot>
	</main>
{/key} -->
<main>
	<slot></slot>
</main>
