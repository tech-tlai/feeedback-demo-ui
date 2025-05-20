<script>
    export let items = [];
  </script>
  
  <div class="bg-white rounded-lg shadow p-4">
    <h2 class="text-lg font-bold text-gray-700 mb-4">New Badges unlocked</h2>
    
    <div class="space-y-4">
      {#each items as item, i}
        <div class="flex items-center p-2 {item.color} rounded-lg">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl mr-3">
            {item.icon}
          </div>
          <div>
            <h3 class="font-medium">{item.title}</h3>
            {#if item.metadata}
              <p class="text-sm text-gray-500">{item.metadata}</p>
            {/if}
            {#if item.target}
              <div class="flex items-center text-sm">
                <span class="mr-2">🎯 Target : {item.target}</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="mr-2">✅ Your score: {item.score}</span>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
    
    {#if items.length > 0 && !items[1].metadata}
      <h2 class="text-lg font-bold text-gray-700 mt-6 mb-4">New goals acheived</h2>
    {/if}
  </div>