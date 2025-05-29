<script>
	export let chat;
	export let selected;
	export let onSelect;
</script>

<button class="flex-1 text-left text-sm text-black w-full p-3" on:click={() => onSelect(chat)}>
	{chat.text}
</button>
