<template>
  <div class="e-legend">
    <div class='e-legend-title' v-if='$slots.title || title'>
      <div 
        v-if='["center", "right"].indexOf(position) > -1' 
        class='e-legend-line e-legend-line-left'></div>
      <div v-if='$slots.title'><slot name='title'></slot></div>
      <div v-else>{{title}}</div>
      <div 
        v-if='["center", "left"].indexOf(position) > -1' 
        class='e-legend-line e-legend-line-right'></div>
    </div>
    <div class="e-legend-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    position: {
      type: String,
      default: 'left'
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
