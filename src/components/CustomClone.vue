<template>
    <div class="row p-4" style="width: 100%">
        <div class="col-9">
            <div style="display: flex; justify-content: center;">
                <div style="box-shadow:  0 0 8px 8px rgba(0,0,0, 0.1); height: 800px; width: 600px; padding: 4rem;"> 
                    <div role="presentation" style="height: 100%; width: 100%;">

                        <!-- <draggable
                        class="dragArea list-group"
                        :list="pdf"
                        group="people"
                        dragClass="dragClass"
                        ghostClass="ghostClass"
                        :animation="250"
                        handle=".handle"
                        >
                            <div class="list-group-item  list-group" v-for="field in pdf" :key="field.id" >
                                <component  v-model="field.value" :is="field.render"  v-bind="field.props" />
                            </div>
                        </draggable> -->
                       <!-- <nested :elements="pdf" className="dragArea"/> -->
                        <FImage />
                    </div>

                 </div>

            </div>
        </div>
        <div class="col-3">
             <div draggable="true">hola</div>
      
            <draggable
            class="row"
            :list="elements"
            :group="{ name: 'people', pull: 'clone', put: false }"
            :clone="cloneDog"
            dragClass="dragClass"
            ghostClass="ghostClass"
            :animation="150"
            :sort="false"
             @change="onchange"
        
            >

                <div class="col-6" v-for="element in elements" :key="element.id">
                    <div class="list-group-item">
                        {{ element.name }}
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable"
// import InputFileArea from "./InputFileArea.vue";
import FImage from "./blocks/Image.vue";
// import Nested from './drap-and-drop/nested.vue';
// import HelloComponent from "./HelloComponent.vue";
// import TextArea from "./TextArea.vue";
// let idGlobal = 8;
export default {
  name: "custom-clone",
  display: "Custom Clone",
  order: 3,
  components: {
    draggable,
    // InputFileArea,
    FImage
},
  data() {
    return {
      elements: [
        { id:1,name: "Text Area", render: "TextArea", value: '', props: {}}
      ],
      pdf: [
      ]
    };
  },

  computed: {
      
          EmpyList(){
              return (this.pdf.length === 0)
          },

  },
  methods: {
    // log: function(evt) {
    //   window.console.log(evt);
    // },
    update(e){
        console.log('update', e);
    },

    onchange(){
        return
    },

    cloneDog(item) {
        // return
        delete item.id
      return {
          id: Date.now(),
          name: 'container' + Date.now(),
        ...item,
          children: [] 
        };
    },
  }
};
</script>
<style scoped>
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