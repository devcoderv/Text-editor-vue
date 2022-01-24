<template>
  <div class="row p-4">
    <div class="col-9">
        <div style="display:flex; justify-content:center">
            <div style="box-shadow: 0 0 8px 8px rgba(0,0,0,0.1); height: 1000px; width:700px">
                <div role="presentation" style="height: 100%; width:100%; padding: 4rem">
                    <draggable
                    style="height: 100%; width:100%;position:relative"
                        class="dragArea list-group"
                        :list="pdf"
                        group="people"
                       :animation="250"
                       handle=".handle"
                        @change="log"
                    >
                        <div class="" v-for="element in pdf" :key="element.id">
                            <div class="handle"></div>
                            <component  v-model="element.value" :is="element.render"  v-bind="element.props" />
                        </div>
                    </draggable>

                </div>

            </div>

        </div>
    </div>

    <div class="col-3">

       
      <draggable
        class="dragArea row"
        :list="elements"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :sort="false"
        :clone="cloneDog"
        @change="log"
      >
        <div class="col-6" v-for="element in elements" :key="element.id">
            <div class="list-group-item ">

                {{ element.name }}
            </div>
        </div>
      </draggable>
    </div>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import TextArea from "@/components/TextArea.vue";
// let idGlobal = 8;
export default {
  name: "custom-clone",
  display: "Custom Clone",
  order: 3,
  components: {
    draggable,
    TextArea
  },
  data() {
    return {
      elements: [
        // { name: "dog 1"},
        // { name: "dog 2"},
        // { name: "dog 3"},
        // { name: "dog 4"}
         { name: "Text Area", render: "TextArea", value: '', props: {}}
      ],
      pdf: [
      ]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    cloneDog(e) {
      return {
        id: this.pdf.length + 1,
        ...e
      };
    }
  }
};
</script>
<style scoped>

.handle::before {
    content: '';
    width: 24px;
    height: 24px;
    background: red;
    position: absolute;
    left: -30px;
}
</style>