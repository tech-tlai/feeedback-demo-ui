<script>
	import { QuestionGenerationForm, Modal, Sidebar } from '$lib/components/qpg';
	 import { questions } from '$lib/stores/qpgStore.js';

	
</script>

<main class="flex h-screen">
    <Sidebar  />
    
	
	<section class="flex-grow h-screen flex flex-col items-center justify-center">
        <slot></slot>
    </section>
</main>
