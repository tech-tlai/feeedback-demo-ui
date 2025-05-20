<script>
    import Tabs from '$lib/components/Tabs.svelte';

    export let history = [];
    export let pinnedCount = 0;

    let selectedTab = 0;

    const tabs = [
        { label: 'Chat History', icon: '📚' },
        { label: 'Pinned Chats', icon: '📌' }
    ];
    
</script>

<div class="bg-white rounded-lg shadow p-4">
    <Tabs
        tabs={tabs.map((tab,index) =>{ return {id:index, text:tab.label}})}
        icons={tabs.map(tab => tab.icon)}
        bind:selectedIndex={selectedTab}
    />

    <div class="space-y-3 mt-4  h-[clamp(300px,320px,384px)] overflow-y-auto">
        {#if selectedTab === 0}
            {#each history as chat}
                <button class="p-3 text-left bg-gray-100 rounded-lg text-gray-600 text-sm hover:bg-gray-200 cursor-pointer">
                    {chat}
                </button>
            {/each}
        {:else}
            <div class="text-gray-500 text-sm">You have {pinnedCount} pinned chats.</div>
        {/if}
    </div>
</div>