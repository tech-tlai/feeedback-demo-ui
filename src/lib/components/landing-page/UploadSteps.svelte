<script>
  export let currentStep = 1;

  const steps = [
    { number: 1, title: "Upload teacher data", description: "Upload CSV file with teacher information" },
    { number: 2, title: "Upload answer sheets", description: "Upload student answer sheet files" },
    { number: 3, title: "Submit", description: "Review and submit your data" },
  ];
</script>

<div class="w-full max-w-5xl mx-auto mb-8">
  <div class="flex items-center justify-between">
    {#each steps as step, index}
      <div class="flex items-center {index < steps.length - 1? 'flex-1':''}">
        <!-- Step Circle and Content -->
        <div class="flex flex-col items-center">
          <div
            class={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {#if currentStep > step.number}
              <!-- Check icon -->
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            {:else}
              {step.number}
            {/if}
          </div>

          <!-- Step Content -->
          <div class="mt-3 text-center">
            <h3 class={`text-sm font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'}`}>
              {step.title}
            </h3>
            <p class="text-xs text-gray-400 mt-1 max-w-32">{step.description}</p>
          </div>
        </div>

        <!-- Connector Line -->
        {#if index < steps.length - 1}
          <div class="flex-1 mx-4">
            <div class={`h-0.5 transition-colors ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
