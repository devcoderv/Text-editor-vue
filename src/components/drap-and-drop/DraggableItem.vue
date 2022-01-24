<template>
  <div
    draggable="true"
    @dragstart="handleDragStart"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DraggableItem',
  props: ['transferData'],
  methods: {
      handleDragStart(event) {
          console.log(event);
        // event.dataTransfer.setData('value', JSON.stringify(this.transferData))
      }

  }
}
</script>