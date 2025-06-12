<script>
  import { onMount } from 'svelte';
 
  // Props
  export let size = 'normal'; // 'small', 'normal', 'large'
  export let active = true;
  export let withOverlay = false;
  export let description = '';
  export let color = null; // Custom color
  export let loaderType = 'spinner'; // 'spinner', 'dots', 'bars', 'pulse'
 
  // Size classes
  const sizeClasses = {
    small: 'w-4 h-4',
    normal: 'w-8 h-8',
    large: 'w-12 h-12'
  };
 
  const dotSizeClasses = {
    small: 'w-2 h-2',
    normal: 'w-3 h-3',
    large: 'w-4 h-4'
  };
 
  const barHeightClasses = {
    small: 'h-4',
    normal: 'h-6',
    large: 'h-8'
  };
 
  const barWidthClasses = {
    small: 'w-0.5',
    normal: 'w-1',
    large: 'w-1.5'
  };
 
  $: sizeClass = sizeClasses[size] || sizeClasses.normal;
  $: dotSize = dotSizeClasses[size] || dotSizeClasses.normal;
  $: barHeight = barHeightClasses[size] || barHeightClasses.normal;
  $: barWidth = barWidthClasses[size] || barWidthClasses.normal;
  $: showLoader = active;
 
  // Validations
  $: {
    if (!['small', 'normal', 'large'].includes(size)) {
      console.warn('Loading: size must be one of: small, normal, large');
    }
    if (color && typeof color !== 'string') {
      console.warn('Loading: color prop should be a string');
    }
    if (!['spinner', 'dots', 'bars', 'pulse'].includes(loaderType)) {
      console.warn('Loading: loaderType should be one of: spinner, dots, bars, pulse');
    }
  }
 
  // Prevent body scroll when overlay is active
  $: {
    if (typeof document !== 'undefined') {
      if (withOverlay && showLoader) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  }
 
  onMount(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('overflow-hidden');
      }
    };
  });
</script>
 
{#if showLoader}
  {#if withOverlay}
    <!-- Overlay variant -->
    <div
      class="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={description || 'Loading'}
    >
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center justify-center" aria-hidden="true">
          {#if loaderType === 'spinner'}
            <div
              class="border-4 rounded-full animate-spin border-solid border-t-transparent {sizeClass}"
              style="border-color: rgba(255, 255, 255, 0.3); border-top-color: {color || 'white'};"
            ></div>
          {:else if loaderType === 'dots'}
            <div class="flex gap-2 items-center">
              <div
                class="rounded-full animate-bounce {dotSize}"
                style="animation-delay: -0.32s; background-color: {color || 'white'};"
              ></div>
              <div
                class="rounded-full animate-bounce {dotSize}"
                style="animation-delay: -0.16s; background-color: {color || 'white'};"
              ></div>
              <div
                class="rounded-full animate-bounce {dotSize}"
                style="background-color: {color || 'white'};"
              ></div>
            </div>
          {:else if loaderType === 'bars'}
            <div class="flex gap-1 items-end {barHeight}">
              {#each [0.4, 0.3, 0.2, 0.1] as delay}
                <div
                  class="{barWidth} rounded-sm bar-animate"
                  style="background-color: {color || 'white'}; animation-delay: -{delay}s;"
                ></div>
              {/each}
            </div>
          {:else if loaderType === 'pulse'}
            <div
              class="rounded-full animate-ping {sizeClass}"
              style="background-color: {color || 'white'};"
            ></div>
          {/if}
        </div>
        {#if description}
          <p class="text-white text-center text-sm font-medium">{description}</p>
        {/if}
      </div>
    </div>
  {:else}
    <!-- Inline variant -->
    <div class="flex items-center gap-3" role="status" aria-label={description || 'Loading'}>
      <div class="flex items-center justify-center flex-shrink-0" aria-hidden="true">
        {#if loaderType === 'spinner'}
          <div
            class="border-4 rounded-full animate-spin  border-4 border-solid border-t-transparent {sizeClass}"
            style="border-color: rgba(255, 255, 255, 0.3); border-top-color: {color || '#3b82f6'};"
          ></div>
        {:else if loaderType === 'dots'}
          <div class="flex gap-1 items-center">
            <div
              class="rounded-full animate-bounce {dotSize}"
              style="animation-delay: -0.32s; background-color: {color || '#3b82f6'};"
            ></div>
            <div
              class="rounded-full animate-bounce {dotSize}"
              style="animation-delay: -0.16s; background-color: {color || '#3b82f6'};"
            ></div>
            <div
              class="rounded-full animate-bounce {dotSize}"
              style="background-color: {color || '#3b82f6'};"
            ></div>
          </div>
        {:else if loaderType === 'bars'}
          <div class="flex gap-0.5 items-end {barHeight}">
            {#each [0.4, 0.3, 0.2, 0.1] as delay}
              <div
                class="{barWidth} rounded-sm bar-animate"
                style="background-color: {color || '#3b82f6'}; animation-delay: -{delay}s;"
              ></div>
            {/each}
          </div>
        {:else if loaderType === 'pulse'}
          <div
            class="rounded-full animate-ping {sizeClass}"
            style="background-color: {color || '#3b82f6'};"
          ></div>
        {/if}
      </div>
      {#if description}
        <span class="text-gray-600 text-sm">{description}</span>
      {/if}
    </div>
  {/if}
{/if}
 
<style>
  @keyframes bar-stretch {
    0%, 40%, 100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
 
  .bar-animate {
    animation: bar-stretch 1.2s ease-in-out infinite;
    transform-origin: bottom;
    height: 100%;
  }
</style>
 