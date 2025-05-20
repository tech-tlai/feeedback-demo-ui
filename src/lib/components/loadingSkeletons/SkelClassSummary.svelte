<script>
    // Props to customize the skeleton
    export let showSubjects = 2; // Number of subject placeholders to show
  </script>
  
  <div class="bg-white rounded-xl p-6 shadow-sm max-w-sm animate-pulse">
    <!-- Class name skeleton -->
    <div class="h-7 bg-gray-200 rounded-md w-1/3 mb-4"></div>
    
    <!-- Students count skeleton -->
    <div class="flex items-center mb-6">
      <div class="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
      <div class="h-5 bg-gray-200 rounded-md w-1/4"></div>
    </div>
    
    <!-- Divider -->
    <div class="border-t border-gray-100 mb-4"></div>
    
    <!-- Average score header skeleton -->
    <div class="flex items-center mb-5">
      <div class="h-5 bg-gray-200 rounded-md w-1/2 mr-2"></div>
      <div class="h-4 bg-gray-200 rounded-md w-1/4"></div>
    </div>
    
    <!-- Subject skeletons -->
    {#each Array(showSubjects) as _, i}
      <div class="flex items-center justify-between mb-4">
        <div class="h-5 bg-gray-200 rounded-md w-1/3"></div>
        <div class="h-6 bg-gray-100 rounded-full w-20"></div>
      </div>
    {/each}
  </div>
  
  <style>
    /* Add a subtle shimmer effect */
    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: 200px 0;
      }
    }
    
    .animate-pulse {
      background: linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.08) 37%, rgba(0,0,0,0.06) 63%);
      background-size: 400px 100%;
      animation: shimmer 1.4s infinite linear;
    }
  </style>