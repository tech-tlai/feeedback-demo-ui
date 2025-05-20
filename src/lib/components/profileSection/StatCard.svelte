<script>
    export let title = '';
    export let value = '';
    export let total = null;
    export let percentage = null;
    export let icon = '';
    export let color = 'bg-purple-100';
  </script>
  
  <div class="bg-white rounded-lg p-4 shadow flex flex-col  {color}">
    <div class="text-sm font-semibold text-gray-700 mb-2">{title}</div>
    <div class="flex gap-2">

      <div class="text-4xl mb-2">{icon}</div>
      <div class="text-center">
        <div class="text-2xl font-bold">{value}</div>
        {#if total}
          <div class="text-gray-500">/{total}</div>
        {/if}
        {#if percentage}
          <div class="text-gray-500">{percentage}</div>
        {/if}
      </div>
    </div>
  </div>