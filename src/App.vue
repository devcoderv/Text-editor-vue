<template>
  <div id="app" class="app-content px-4 borrar-clase">
    <EditorView  class="fik-editor"/>
    <div class="type-content bg-white">
        <SidebarComponents :items="elements" />
    </div>
    <!-- <custom-clone  /> -->
    <!-- <example /> -->
  </div>
</template>

<script>
// import CustomClone from './components/CustomClone.vue';
// import Example from './components/drap-and-drop/Example.vue';
import { excel, image, textBox, video } from "./helpers/type-content";
import EditorView from './components/EditorView.vue'
import SidebarComponents from './components/SidebarComponents.vue'
export default {
  name: 'App',
  components: {
    // CustomClone,
    // Example
    EditorView,
    SidebarComponents
  },

  data: () => ({
   elements: [
       { ...textBox },
       { ...image },
       { ...video },
       { ...excel }
   ]
  }),

  computed: {
    props(){
      return {title: 'Hello Word'}
    }

  },

 
  methods: {
  
  }
}
</script>

<style lang="scss">
// .handle {
//   position: absolute;
//   padding-top: 8px;
//   padding-bottom: 8px;
//   background-color: red;
//   width: 20px;
//   height: 20px;
//   left: -20px;
//   top: 0;
// }
body{
    background: #f1f4f6;
}

.borrar-clase{
 margin-left: 280px;
 margin-top: calc(135px + 60px);
 background: #f1f4f6;
}

.app-content {
    display: flex;
    height: calc(100vh - calc(135px + 60px));
    gap: 1rem;
}
.fik-editor{
    flex: 1;
    
}

.type-content {
    width: 300px;
    // background: red;
}
</style>
