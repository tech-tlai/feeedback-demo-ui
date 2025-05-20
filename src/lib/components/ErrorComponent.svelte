<script>
    import NotFound  from '$lib/svgComponents/NotFound.svelte';
    export let errorMessage = "Not Found"
//     export let title = "No performance data available";
//   export let description = "We couldn't find any student performance data to display at this moment.";
//   export let showButton = true;
//   export let buttonText = "Refresh Data";
//   export let buttonAction = () => {};
//   export let icon = true;
</script>
<div class="flex flex-col items-center p-6 sm:gap-8 gap-4">
    <NotFound addClass="w-1/2 sm:w-1/3 h-auto"/>
    <h2 class="text-base sm:text-xl font-bold text-primary">{errorMessage}</h2>
</div>	
<!-- <div class="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-md border-2 border-indigo-100 min-h-[250px] w-full">
    {#if icon}
      <div class="mb-5 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-full">
   
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-violet-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 3v18h18" />
          <path d="M18.4 7.5l-3.9 6.5-3.5-3.5-3 4.5" />
          <circle cx="18.5" cy="5.5" r="2" />
          <circle cx="14.5" cy="14" r="2" />
          <circle cx="11" cy="10.5" r="2" />
          <circle cx="7.5" cy="15" r="2" />
        </svg>
      </div>
    {/if}
    
    <h3 class="text-xl font-bold text-violet-800 mb-2">{title}</h3>
    <p class="text-sm text-indigo-600 mb-6 max-w-md">{description}</p>
    
    {#if showButton}
      <button 
        on:click={buttonAction}
        class="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200 transform hover:scale-105 shadow-md"
      >
        {buttonText}
      </button>
    {/if}
  </div> -->