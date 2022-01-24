<template>
  <div
    @dragover="handleOnDragOver"
  
  >
  <!-- <div
    @dragover="handleOnDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  > -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DroppableItem',
  props: [
    'onDragOver',
    // 'onDragLeave',
    // 'onDrop'
  ],
  methods: {
      handleOnDragOver(e) {
        e.preventDefault()
        // this.onDragOver && this.onDragOver(e)
        console.log(e);
    },

    // onDragLeave(e) {
    //     console.log(e);
    // }
  }
}
</script>