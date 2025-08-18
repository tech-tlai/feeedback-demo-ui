<script>
  export let title = 'Live Analytics';
  export let subtitle = 'Class Performance';
  export let data = [
    { label: 'Math', value: 80 },
    { label: 'Science', value: 65 },
    { label: 'English', value: 90 },
    { label: 'History', value: 70 },
  ];
</script>

<div class=" rounded-2xl p-6 w-full max-w-md">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-lg font-semibold text-gray-900">{title}</h2>
    <div class="flex space-x-2">
      <span class="w-3 h-3 rounded-full bg-green-400"></span>
      <span class="w-3 h-3 rounded-full bg-blue-400"></span>
      <span class="w-3 h-3 rounded-full bg-red-dark"></span>
    </div>
  </div>

  <p class="text-gray-500 mb-4">{subtitle}</p>

  {#each data as item}
    <div class="mb-3">
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm font-medium text-gray-700">{item.label}</span>
        <span class="text-sm font-medium text-gray-700">{item.value}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
          style="width: {item.value}%;"
        ></div>
      </div>
    </div>
  {/each}
</div>
