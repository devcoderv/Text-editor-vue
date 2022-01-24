

<script>
import { calculeSizePage } from "../utils/page";
import { scrollDirection } from "../utils/scroll";
import BarOptions from './BarOptions.vue'
import Page from './Page/Page.vue'
import PageOptions from './Page/PageOptions.vue'
export default {
  components: { BarOptions, Page, PageOptions },

  data(){
      return{
        //   padding: [0.68,0.68,0.68,0.68],
            loading: false,
          typePage: 'Letter',
          pageActive: 1,
          typeScroll: 'down',
          currentTop:0,
          maxWidth: 'auto',
          zoom: 1,
          pages: [],
          height: 0,
          heightC: 0
      }
  },

  computed: {
      countPages() {
          return  this.pages.length
      },

      editorStyle(){
          return {
              maxWidth: this.maxWidth
        }
      },
      scale(){
          if(this.loading){
                console.log(calculeSizePage(this.typePage));
                const document = this.$refs.document.offsetWidth
                const scale = this.$refs.scale.offsetWidth * this.zoom
                this.zoomDocument()
                return {
                    transform: `scale(${this.zoom})`,
                    transformOrigin: document < scale ? 'left top' : 'center top',
                    height: this.height + 'px',
                    width: calculeSizePage(this.typePage)[0] + 'px'
                }
          }
          return {}
      }
  },

    watch: {
        pages(){
            this.zoomDocument()
        },

        zoom() {
            this.zoomDocument()
        }
    },
  

  created(){
      this.initialize()
  },

  mounted(){
        this.maxWidth = `${this.$refs.editorWrapper.offsetWidth}px`

        console.log(this.$refs.page[0].sc);

        this.$eventBus.$on('zoom', (value) => {
            this.zoom = value
            
        })

        /***
         * @description Evento para crear nuevos elementos
         *              Metodo es emitido desde el componente <AddContentHover />
         */
        this.$eventBus.$on('addElement', (value) => {
            // console.log(value);
            value.id = Date.now()
            this.pages[this.pageActive-1].body.push(value)
        })
         this.$eventBus.$on('changeBackground',({index, color, image}) => {
                color ? this.pages[index].background.color = color : this.pages[index].background.image = image
            })
        this.loading = true
        this.heightC = this.$refs.scale.offsetHeight
  },

  methods: {
        /***
         * @description Metodo contiene llamadas a funciones que debe ejecutarse al 
         *              crear el commponentes
         */
        initialize() {
            this.$eventBus.$on('addPage',(value) => (this.addPage(value)))
            this.$eventBus.$on('changePageSize',(value) => (this.pageSizes = value))
           
            this.addPage(0)
        },

        /***
         * @description Metodo agrega un nueva pagina indicando la posicion en el Array
         * @param index posision en la que se colocara la pagina
         * @param data Objeto con propiedades de pagina
         */
        addPage(index, data) {
            const size =  calculeSizePage(this.typePage)
            const page = data || {
                id: this.pages.length + 1,
                padding: [0.68,0.68,0.68,0.68],
                pageSize: size,
                typePage: 'Letter',
                background: {
                    color: '#ffffff',
                    image: undefined
                },
                body: [
                    { 
                    id: Date.now(),
                    icon: "img",
                    name:'Imagen', 
                    render: 'ImageBox',
                    value: '', 
                    props: {
                        src: undefined
                    }}
                ],
                header: [],
                footer:[],
                innerHtml: ''
            }
            // console.log(index);
            this.pages.splice(index, 0, page )
        },

         /***
         * @description Metodo permiter configurar una pagina
         */
        onClickConfig(index) {
            const page = this.pages[index]
            this.$eventBus.$emit('sibebarActive', 'PageProperties')
            this.$nextTick(() => {
                this.$eventBus.$emit('pageLayout', { index, padding:page.padding, size:page.pageSize })
                this.$eventBus.$emit('PageProperties', { index, color: page.color })
            })

        },
        
        /***
         * @description Metodo permiter clonar un pagina con su configuracion segun el
         */
        onClickClone(page){
            const newArray = []
            const clone = {...this.pages[page - 1]}
            clone.padding.forEach(element => {
                newArray.push(element)
            });
            delete clone.padding
            clone.padding = newArray
            this.addPage(page, {...clone})
        },

         /***
         * @description Metodo que escucha el evento Scroll del documento
         */
        scrollDocument({target}){
            const element = this.$refs.page[this.pageActive-1]
            this.scrollDirection(target.scrollTop)
            this.isInViewport(element)
            
        },

        /***
         * @description Metodo detecta en que direccion se mueve el Scroll
         */
        scrollDirection(scrollTop){
            if(scrollTop === 0) {return}
            console.log(scrollDirection(scrollTop,this.typeScroll));
            this.typeScroll = scrollDirection(scrollTop,this.currentTop)
            this.currentTop = scrollTop
        },

        isInViewport(el) {
            const rect = el.getBoundingClientRect();
            const diffBottom = rect.bottom < (this.$refs.document.clientHeight  - (235 * this.zoom))
            const diffTop = rect.top > (this.$refs.document.clientHeight - (235 * this.zoom))
            
            if((diffBottom) && ( this.typeScroll === 'down')){
                this.pageActive++
            }
           
           if((diffTop) && (this.pageActive !== 1)  && (this.typeScroll === 'up')){
                this.pageActive--
            }
        },

        zoomDocument(){
            if(this.zoom > 1) {
                this.height = ((this.heightC * this.countPages)  + ((this.countPages * 24)))
                return
            }
            this.height = ((this.heightC * this.countPages)  + ((this.countPages - 1)  * 24)) * this.zoom
        },

        previusPage() {
            this.pageActive--
            this.ScrollToElement()
        },
        nextPage() {
            this.pageActive++
            this.ScrollToElement()
        },

        ScrollToElement() {
            console.log(this.$refs.page[this.pageActive].offsetTop);
            this.$refs.document.scrollTop = this.pageActive === 1 ? 0 : this.$refs.page[this.pageActive -1].offsetTop
            
        }

  }
    
}
</script>
<template>
    <section ref="editorWrapper" class="d-flex flex-column bg-editor" :style="editorStyle">
        <BarOptions :pages="countPages"  :pageActive="pageActive" @click:nextPage="nextPage" @click:previusPage="previusPage"/>    
        
        <div ref="document" class="p-4" style="overflow:auto" @scroll="scrollDocument">
            <div ref="scale" class="mb-4 mx-auto" :style="scale">
                <div ref="page" v-for="(page,i) in pages" :key="i" class="mb-4">

                    <PageOptions :page="i+1"  @click:config="onClickConfig" @click:clone="onClickClone" :style="{width: `${page.pageSize[0] }px`,}"/>
                    <Page :padding="page.padding" :size="page.pageSize" :bg="page.background" :header="''" :body="page.body" :footer="''"/>
                
                </div>

            </div>
        </div>
    
    </section>
</template>

<style>
.bg-editor{
    background-color: #f6f8fa;
}
</style>