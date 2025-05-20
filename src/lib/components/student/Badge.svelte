<script>
    // Props
    export let title = "Achiever of the month";
    export let subtitle = "Metadata";
    export let badgeIcon = "medal"; // Default badge icon
    
    // Optional custom icon
    export let customIcon = "";
  
    // Badge icon mapping
    const badgeIcons = {
      scholar: {
        icon: `<div class="relative">
                <img src="violet_medal.png" alt="Medal" class="w-8 h-8" />
              </div>`,
      },
      wizard: {
        icon: `<div class="relative">
                 <img src="green_medal.png" alt="Medal" class="w-8 h-8" />
              </div>`,
      },
      achiever: {
        icon: `<div class="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 text-yellow-600">
                  <path fill="#FFA000" d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                </svg>
              </div>`,
      },
      genius: {
        // For custom icon, pass the SVG directly as a prop
        icon: `<div class="relative">
                <img src="red_medal.png" alt="Medal" class="w-8 h-8" />
              </div>`
      },
      custom:{
        icon: `<div></div>`
      }
    };
    
    // Get the icon based on the badgeIcon prop
    $: iconToRender = badgeIcon === 'custom' ? customIcon : badgeIcons[badgeIcon]?.icon || badgeIcons.medal.icon;
    
  </script>
  
  <div class="flex items-center shadow-md rounded-md p-2">
    <div class="bg-blue-100 rounded-lg p-3 flex items-center justify-center w-14 h-14 mr-3">
      {@html iconToRender}
    </div>
    
    <div>
      <h3 class="text-black font-medium">{title}</h3>
      <p class="text-gray-500 text-sm">{subtitle}</p>
    </div>
  </div>