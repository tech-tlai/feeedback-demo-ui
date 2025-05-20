<script>
	export let isOpen = false;
	export let title = 'Popup';
	export let type="normal" //normal, danger
	export let closeModal = () => {};

	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
		on:click={closeModal}
		tabindex="0"
		on:keydown={(e) => {
			if (e.key === 'Escape') closeModal();
		}}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<div
			class="relative w-full max-w-5xl rounded-lg bg-white overflow-hidden shadow-lg"
			on:click|stopPropagation
			on:keydown={handleKeyDown}
		>
			<div class="p-6">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-xl font-bold {type === 'danger' ? 'text-red-600' : ''}">{title}</h2>
					<button
						on:click={closeModal}
						class="rounded-full p-1 hover:bg-gray-100"
						aria-label="Close"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-6 w-6"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>
				<slot></slot>
			</div>
			<slot name="action-buttons"></slot>
		</div>
	</div>
{/if}
