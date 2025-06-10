<script>
	import { createEventDispatcher } from 'svelte';
	import { Upload, BarChart3 } from 'lucide-svelte';
	// Accept navItems as prop: [{ label, href, icon }]
	// Accept actionButtons as prop: [{ label, href, icon, type }]
	// icon should be a Svelte component from lucide-svelte

	export let navItems = [
		// Example:
		// { label: 'Features', href: '#features', icon: BarChart3 },
		// { label: 'Upload', href: '#upload', icon: Upload }
	];
	export let actionButtons = [
		// Example:
		// { label: 'Sign Up', href: '/signup', icon: Upload, type: 'primary' },
		// { label: 'Login', href: '/login', icon: null, type: 'secondary' }
	];

	const dispatch = createEventDispatcher();

	// Button style classes by type
	const buttonTypeClass = {
		primary:
			'bg-black/80 text-white border-0 px-6 py-2 rounded-lg font-medium text-base transition-all flex items-center gap-2',
		secondary:
			'bg-white text-black border border-black px-6 py-2 rounded-lg font-medium text-base transition-all flex items-center gap-2'
		// Add more types as needed
	};
</script>

<header class="bg-white shadow-lg relative ">
	<div class="absolute inset-0 bg-gradient-to-r from-white to-accent-blue/20"></div>
	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center py-6">
			<a href="/">
				<div class="flex items-center">
					<!-- Logo Icon (default: BarChart3) -->

					<div class="">
						<BarChart3 class="h-6 w-6 text-black" />
					</div>
					<span class="ml-3 text-xl font-bold text-black">EduMetrics</span>
				</div>
			</a>

			<nav class="hidden md:flex space-x-8">
				{#each navItems as item, i}
					<a
						href={item.href}
						class="flex items-center gap-2 text-black hover:text-black/80 transition-colors"
					>
						{#if item.icon}
							<svelte:component this={item.icon} class="h-5 w-5" />
						{/if}
						{item.label}
					</a>
				{/each}
			</nav>

			<!-- Action buttons (primary, secondary, etc.) -->
			{#if actionButtons.length}
				<div class="flex gap-3">
					{#each actionButtons as btn}
						<a href={btn.href}>
							<button type="button" class={buttonTypeClass[btn.type] || buttonTypeClass.primary}>
								{#if btn.icon}
									<svelte:component this={btn.icon} class="h-5 w-5" />
								{/if}
								{btn.label}
							</button>
						</a>
					{/each}
				</div>
			{/if}
			<!-- Custom header content slot -->
			<slot name="header-custom-actions" />
		</div>
	</div>
</header>
