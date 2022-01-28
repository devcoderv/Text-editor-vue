<script>
import { previewFile } from '../../utils/file';
import PageLayout from './PageLayout.vue'
import ImageWrapper from '../ImageWrapper.vue';
export default {
  components: { PageLayout, ImageWrapper },

  data() {
      return {
          color: '',
          picture: undefined,
          file: undefined,
          bgPosition: "",
          bgSize: "",
          bgRepeat: "",
          indexItem: -1,
          id: null
      }
  },

  watch: {
      color(value) {
        //   console.log(value);
          this.$eventBus.$emit('changeBackground', {id: this.id,index: this.indexItem, color: value})
      }
  },

  methods: {

      closeProperties(){
          this.$eventBus.$emit('sibebarActive', '')
      },

      loadFile(e){
          try {
                const preview = previewFile(e)
                this.picture = preview
                this.$eventBus.$emit('changeBackground', {id: this.id, index: this.indexItem, image: preview})
          } catch (error) {
                 console.log(error);
                // this.preview = error   
          }
      },

      toUpload(){
          
      },

      onCancelBg(e) { 
          this.file = e
          this.picture = e
          this.$eventBus.$emit('changeBackground', {index: this.indexItem, image: undefined})
      },

      resert(){
          this.color = '',
          this.picture = undefined
          this.file = undefined
      }

  },

  mounted() {
        this.$eventBus.$on('PageProperties',({id, background, index}) => {
            this.resert()
            this.color = background.color
            this.picture = background.image
            this.indexItem = index
            this.id = id
      })
  }
    
}
</script>
<template>
<div class="">
    <div class="d-flex align-items-center justify-content-between shadow-title mb-4 px-2" >
        <p class="mb-0">Page Properties</p>
        <button class="btn" @click="closeProperties">X</button>
    </div>
    <div class="p-2">
        <b-form-group id="color-group" label="Color de Fondo" label-for="color">
            <b-form-input id="color" v-model="color" type="color" placeholder="Color de fondo" />
        </b-form-group>
        <b-form-group id="file-group" label="Imagen de fondo" label-for="color">
             <b-form-file id="file" v-model="file" accept="image/*" placeholder="Seleccionar imagen" @change="loadFile" />
        </b-form-group>
        <div>
            <ImageWrapper @click:cancel="onCancelBg" @click:upload="toUpload">
                <img v-if="picture" :src="picture" width="100%"/>
            </ImageWrapper>
            <!-- <b-form-group id="papper-group" label="" label-for="papper">

                <b-form-select 
                    v-model="bgPosition"
                    :options="pages"
                    @change="onChange"
                >
                </b-form-select>
            </b-form-group> -->
            
        </div>
        <PageLayout />

    </div>
</div>
</template>

<style scoped>
.shadow-title {
    box-shadow: 0px 3px 8px 0px rgb(0 0 0 / 10%);
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 2;

}
</style>
