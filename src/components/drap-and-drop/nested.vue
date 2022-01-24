<script>
import draggable from "vuedraggable";
import TextArea from "../blocks/TextBox.vue";

export default {
    name: "nested-draggable",
    props: {
    elements: {
      required: true,
      type: Array
    },
    className: {
        type: String,
        required: false
    },
    handle: {
        type: String,
        required: false,
        default: 'handle'
    },
    direction: {
        type: String,
        required: false,
        default: 'vertical'
    }
  },
  components: {
    draggable,
    TextArea
  },

  computed: {
      },

  updated(){
      console.log('update');
  },
  methods:{
      subHandle(el){
          return el.length > 1 ? 'handle' : ''
      }, 
      onChange(){
          console.log('change')
          const index = this.elements.findIndex(el => el.children === 0);
          console.log(index);
      }
  }
    
}
</script>
<template>
     <draggable
        :class="className"
        :list="elements"
        group="people"
        dragClass="dragClass"
        ghostClass="ghostClass"
        :animation="250"
        handle=".handle"
        :swapThreshold="0"
        @change="onChange"
        >
        <template v-for="el in elements" >
            <div class="" :key="el.id" >
                <div class="relative de-flex border-r">
                    <component   v-model="el.value" :is="el.render"  v-bind="el.props" />
                    <div>
                    <nested-draggable :elements="el.children" :handle="subHandle(el.children)" />

                    </div>
                </div>
            </div>
        </template>
        </draggable>
</template>

<style scoped>
.de-flex {
    display: flex;
    flex: 1 1 50%;
    gap: 1rem;
}
.border-r:hover {
    border: 1px solid red;
} 
.relative {
    position: relative;
}
.list-group-item {
    border: 1px solid #666666;
    padding: 1rem;
}
.dragClass .list-group-item {
    opacity: 0;
}
.ghostClass .list-group-item{
    border: 1px #808080;
    border-style:  dashed solid;
    background-color: #cccccc;
    transition: all .5 ease-in-out;
}
.dragArea{
    height: 100%;
    width: 100%;
    position: relative;
}
.handle::before {
    content: '';
    width: 24px;
    height: 24px;
    background: red;
    position: absolute;
    left: -30px;
}
</style>