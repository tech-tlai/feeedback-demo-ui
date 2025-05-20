<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  // Props with default values
  export let width = 300;
  export let height = 300;
  export let data = {
    
  };

  export let chartSentiment="positive"

  const backgroundColor = chartSentiment === "positive" ? "#D1FFA6" : "#FFF2F2";
  // Color scale for different categories
  const colorScale = d3.scaleOrdinal()
    .domain([ "Strengths", "Weaknesses"])
    .range([ "#D1FFA6", "#FFF2F2"]);
    // .range([backgroundColor]);

  // DOM element for chart
  let chartContainer;
  
  // For tooltip
  let tooltip;
  let tooltipVisible = false;
  let tooltipData = { name: "", value: 0, x: 0, y: 0 };

  function showTooltip(event, d) {
    tooltipData = {
      name: d.data.name,
      value: d.data.value,
      x: event.pageX,
      y: event.pageY
    };
    tooltipVisible = true;
  }

  function hideTooltip() {
    tooltipVisible = false;
  }

  function moveTooltip(event) {
    if (tooltipVisible) {
      tooltipData.x = event.pageX;
      tooltipData.y = event.pageY;
    }
  }

  function getStrokeColor() {
    return chartSentiment === "positive" ? "#076414" : "#A20B0B";
  }

  onMount(() => {
    createBubbleChart();
    
    // Handle window resize
    const handleResize = () => {
      d3.select(chartContainer).selectAll("*").remove();
      createBubbleChart();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function createBubbleChart() {
    // Clear previous chart if any
    d3.select(chartContainer).selectAll("*").remove();
    
    // Get actual container dimensions
    const containerRect = chartContainer.getBoundingClientRect();
    const actualWidth = containerRect.width;
    const actualHeight = Math.min(containerRect.height, actualWidth);
    
    // Create SVG
    const svg = d3.select(chartContainer)
      .append("svg")
      .attr("width", actualWidth)
      .attr("height", actualHeight)
      .attr("viewBox", `0 0 ${actualWidth} ${actualHeight}`)
      
    
    // Create hierarchical data structure
    const root = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);
      
    
    // Create pack layout
    const pack = d3.pack()
      .size([actualWidth - 10, actualHeight - 10])
      .padding(3);
    
    // Generate the packed data
    const packedData = pack(root);

        
    // Create a group for all circles
    const circleGroup = svg.append("g")
      .attr("transform", `translate(5, 5)`);
    
    // Add circles for each node
    const nodes = circleGroup.selectAll("g")
      .data(packedData.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);
    
    // Add circles
    nodes.append("circle")
    .attr("r", d => d.r)
    .attr("opacity", d => d.children ? 1 : 0.8)
    .attr("stroke", d => d.children ? colorScale(d.data.name) : getStrokeColor())
    .attr("stroke-width", d => d.children ? 2 : 1)
    .attr("fill", d => d.children ? "transparent" : colorScale(d.parent.data.name))
      .attr("cursor", "pointer")
      .on("mouseover", (event, d) => {
        if (!d.children) {
          d3.select(event.currentTarget)
            .attr("opacity", 1)
            .attr("stroke-width", 2);
          showTooltip(event, d);
        }
      })
      .on("mousemove", moveTooltip)
      .on("mouseout", (event, d) => {
        if (!d.children) {
          d3.select(event.currentTarget)
            .attr("opacity", 0.8)
            .attr("stroke-width", 1)              
          hideTooltip();
        }
      });
    
    // Add text labels for parent nodes (categories)
  //   nodes.filter(d => d.depth === 1)
  //     .append("text")
  //     .attr("dy", 4)
  //     .attr("text-anchor", "middle")
  //     .attr("font-size", d => Math.min(d.r / 3, 16))
  //     .attr("font-weight", "bold")
  //     .attr("pointer-events", "none")
  //     .attr("fill", d => colorScale(d.data.name))
  //     .text(d => d.data.name);
    
    // Add text labels for leaf nodes (if they're big enough)
    nodes.filter(d => !d.children && d.r > 20)
      .append("text")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      .attr("font-size", d => Math.min(d.r / 4, 12))
      .attr("pointer-events", "none")
      .attr("fill", "#076414")
      .text(d => d.data.name.length > d.r / 4 ? 
      d.data.name.substring(0, Math.floor(d.r / 4)) + "..." : 
      d.data.name);
  }

 
</script>

<div class="chart-container" bind:this={chartContainer} on:mousemove={moveTooltip}></div>

{#if tooltipVisible}
  <div class="tooltip" style="left: {tooltipData.x + 15}px; top: {tooltipData.y - 28}px;">
    <div class="tooltip-title">{tooltipData.name}</div>
    <div class="tooltip-value">Value: {tooltipData.value}</div>
  </div>
{/if}

<style>
  .chart-container {
    width: 300px;
    height: 300px;
    /* background-color: #f9f9f9; */
    border-radius: 8px;
    overflow: hidden;
  }
  
  .tooltip {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    pointer-events: none;
    z-index: 100;
    max-width: 200px;
    transform: translate(0, -100%);
  }
  
  .tooltip-title {
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 15px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  }
</style>