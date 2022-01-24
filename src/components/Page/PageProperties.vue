<script>
import { previewFile } from '../../utils/file';
import PageLayout from './PageLayout.vue'
export default {
  components: { PageLayout },

  data() {
      return {
          color: '',
          picture: undefined,
          bgPosition: "",
          bgSize: "",
          bgRepeat: "",
          indexItem: -1
      }
  },

  watch: {
      color(value) {
          console.log(value);
          this.$eventBus.$emit('changeBackground', {index: this.indexItem, color: value})
      }
  },

  methods: {

      closeProperties(){
          this.$eventBus.$emit('sibebarActive', '')
      },

      loadFile(e){
          const preview = previewFile(e)
          this.picture = preview
          this.$eventBus.$emit('changeBackground', {index: this.indexItem, image: preview})
      }

  },

  mounted() {
      this.$eventBus.$on('PageProperties',({color, index}) => {
             this.color = color
            this.indexItem = index
      })
  }
    
}
</script>
<template>
<div class="">
    <div class="d-flex align-items-center justify-content-between shadow mb-4 px-2" >
        <p class="mb-0">Page Properties</p>
        <button class="btn" @click="closeProperties">X</button>
    </div>
    <div class="px-2">
        <b-form-group id="color-group" label="Color de Fondo" label-for="color">
            <b-form-input id="color" v-model="color" type="color" placeholder="Color de fondo"></b-form-input>
        </b-form-group>
        <b-form-group id="color-group" label="Imagen de fondo" label-for="color">
             <b-form-file accept="image/*" placeholder="Seleccionar imagen" @change="loadFile"></b-form-file>
        </b-form-group>
        <div>
            <img v-if="picture" :src="picture" width="100%"/>
            <b-form-group id="papper-group" label="" label-for="papper">

                <b-form-select 
                    v-model="bgPosition"
                    :options="pages"
                    @change="onChange"
                >
                </b-form-select>
            </b-form-group>
            
        </div>
        <PageLayout />

    </div>
</div>
</template>

<style scoped>
.shadow {
    box-shadow: 0px 3px 8px 0px rgb(0 0 0 / 10%);
}
</style>
