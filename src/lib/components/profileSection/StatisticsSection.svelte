<script>
    import StatCard from './StatCard.svelte';
    
    export let stats = [];
  </script>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- <div class="grid grid-cols-[repeat(auto-fit,minmax(min(255px,100%),255px))] gap-4"> -->
    {#each stats as stat}
  
    <StatCard {...stat} />
    {/each}
  </div>