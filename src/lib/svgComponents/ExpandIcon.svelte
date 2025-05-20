<script>
    // Props with default values
    export let size = 16; // Icon size in pixels
    export let color = "currentColor"; // Icon color, defaults to inherit from parent
    export let strokeWidth = 2; // Stroke width of the icon
    export let className = ""; // Additional CSS classes
  </script>
  
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    aria-hidden="true"
  >
    <!-- Diagonal line from bottom-left to top-right -->
    <line 
      x1="5" 
      y1="19" 
      x2="19" 
      y2="5" 
      stroke={color} 
      stroke-width={strokeWidth} 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
    
    <!-- Top-right arrowhead -->
    <polyline 
      points="10,5 19,5 19,14" 
      stroke={color} 
      stroke-width={strokeWidth} 
      stroke-linecap="round" 
      stroke-linejoin="round"
      fill="none"
    />
    
    <!-- Bottom-left arrowhead -->
    <polyline 
      points="14,19 5,19 5,10" 
      stroke={color} 
      stroke-width={strokeWidth} 
      stroke-linecap="round" 
      stroke-linejoin="round"
      fill="none"
    />
  </svg>