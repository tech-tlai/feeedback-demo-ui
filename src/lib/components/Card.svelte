
<!-- <div class="bg-white rounded-lg shadow-sm p-4 relative">
<slot></slot>
</div> -->

<div class="bg-white rounded-lg shadow-sm overflow-hidden h-full">
    
    <slot name="image"></slot> <!-- No padding -->
    <div class="p-4 h-full">
      <slot></slot> <!-- Text content with padding -->
    </div>
  </div>