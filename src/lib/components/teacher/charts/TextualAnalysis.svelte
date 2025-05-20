<script>
    // Props
    export let title = "Achievements";
    export let feedbackText = [
     {id:1, text: "Consistent pass percentage above 80% in the last 5 tests."},
    ];
    export let type = "success"; // success, warning, info
    export let customBgColor = ""; // Optional custom background color
    
    // Determine icon and colors based on type
    $: iconAndColors = {
      success: {
        bgColor: customBgColor || "bg-green-light",
        iconBgColor: "bg-green-500",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>`
      },
      warning: {
        bgColor: customBgColor || "bg-orange-light",
        iconBgColor: "bg-orange-500",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>`
      },
      info: {
        bgColor: customBgColor || "bg-gray-light",
        iconBgColor: "bg-blue-500",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM6.293 6.707a1 1 0 011.414 0L10 9.414l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.5a1 1 0 102 0V5z" />
              </svg>`
      }
    };
    
    $: currentStyle = iconAndColors[type] || iconAndColors.success;
  </script>
  
  <div class=" rounded-lg shadow-sm overflow-hidden text-sm">
    <div class="p-4 flex items-center gap-2 {customBgColor || currentStyle.bgColor}">
      <div class="{currentStyle.iconBgColor} rounded text-white flex items-center justify-center w-6 h-6">
        {@html currentStyle.icon}
      </div>
      <h2 class=" font-semibold text-gray-dark ">{title}</h2>
    </div>
    
    <div>
      {#each feedbackText as feedback, index}
        <div class="border-t border-gray-200 p-4">
          <p class="text-gray-dark">{feedback.text}</p>
        </div>
      {/each}
    </div>
  </div>