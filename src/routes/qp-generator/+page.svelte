<script>
	import { QuestionGenerationForm } from '$lib/components/qpg';
	import MainContent from '$lib/components/qpg/MainContent.svelte';
	import { questions, chatHistoryStore ,pinnedChatStore} from '$lib/stores/qpgStore.js';
	import { page } from '$app/stores';
	$: pageTitle = $page.url.searchParams.get('title') || '';
	$: chatId = $page.url.searchParams.get('id') || '';

	
</script>


<div>
		
	<MainContent  questionStore={questions} title={pageTitle} {chatId}/>

</div>
