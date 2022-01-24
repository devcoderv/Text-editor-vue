<template>
  <div>
    <DraggableItem v-for="ball in balls" :key="ball.id" :transferData="ball">
      <div class="circle">
        {{ ball.id }}
      </div>
    </DraggableItem>    
    <hr />
    <DroppableItem>
      <div class="square" />
    </DroppableItem>
  </div>
</template>

<script>
import DraggableItem from './DraggableItem'
import DroppableItem from './DroppableItem'

export default {
  name: 'App',
  components: {
    DraggableItem,
    DroppableItem
  },
  data(){
      return{
           balls: [ { id: 1 }, { id: 2 }, { id: 3 } ]
      }
  }
}
</script>

<style>
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%; 
  border: 1px solid red;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}

.square {
  display: inline-block;
  width: 250px;
  height: 250px;
  border: 1px dashed black;
  padding: 10px;
}
</style>