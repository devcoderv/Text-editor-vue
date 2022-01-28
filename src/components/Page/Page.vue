<script>
import DroppableContainer from "../drap-and-drop/DroppableContainer.vue"
import DraggableItem from "../drap-and-drop/DraggableItem.vue";
import TextBox from "../blocks/TextBox.vue";
import ImageBox from "../blocks/ImageBox.vue";
import AddContentHover from "./AddContentHover.vue";
import vmodel from "../../mixins/custom-vmodel";
export default {
    components: { DroppableContainer, DraggableItem, TextBox, AddContentHover, ImageBox },
    mixins: [vmodel],

    props: {},
    
    data() {
        return {
            zoom: 1,
            isReady: false,
            html: ''
        };
    },

    computed: {
        padding(){
            return this.localValue.padding
        },
        background(){
            return this.localValue.background
        },
        size() {
            return this.localValue.pageSize
        },
        body() {
            return this.localValue.body
        },
        orientation(){
            return this.localValue.orientation
        },
        wrapper() {
              
            return {
                height: `calc(${this.size[1]}px)`,
                width: `calc(${this.size[0]}px)`,
                transform: ` scale(${this.zoom})`,
            };
        },

        stylesContainer() {
            return {
                backgroundColor: this.background.color,
                backgroundImage: `url(${this.background.image})`,
               
            };
        },

        contentStyle() {
            const padding = this.padding;
            return {
                marginLeft: `${padding[3] * 96}px`,
                marginRight: `${padding[1] * 96}px`,
                minHeight: "24px",
                flex: 1
            };
        },
        headerStyle() {
            const padding = this.padding;
            return {
                minHeight: this.padding[0] * 96 + "px",
                marginLeft: `${padding[3] * 96}px`,
                marginRight: `${padding[1] * 96}px`,
            };
        },
        footerStyle() {
            const padding = this.padding;
            return {
                minHeight: this.padding[2] * 96 + "px",
                marginLeft: `${padding[3] * 96}px`,
                marginRight: `${padding[1] * 96}px`,
            };
        },
        zoomStyle() {
            return {
                transform: `scale(${this.zoom})`,
                boxShadow: "3px 3px 8px rgba(0 0 0 / 10%)",
            };
        }
    },

    mounted() {
    
        this.localValue.innerHTML ? (this.$refs.page.innerHTML = this.localValue.innerHTML) : this.innerHTML()
        this.$eventBus.$on('uploadImage',() => {
            console.log('load');
            this.innerHTML()
        })


        this.$eventBus.$on('changeOrientation',({id, orientation}) => {
            if(this.localValue.id === id){
                this.localValue.orientation = orientation
                this.localValue.pageSize = this.localValue.pageSize.reverse()
                this.innerHTML()
            }
        })

         this.$eventBus.$on('changeBackground',({id, color, image}) => {
             if(this.localValue.id === id){
                 color ? this.localValue.background.color = color : this.localValue.background.image = image
                 this.innerHTML()
             }
        })
        
         this.$eventBus.$on('changeMarginPage',({id}) => {
             if(this.localValue.id === id){
                 console.log('margin');
                //  color ? this.localValue.background.color = color : this.localValue.background.image = image
                 this.innerHTML()
             }
        })

        this.$eventBus.$on('changePageSize',({id, typePage, size}) => {
               if(this.localValue.id === id){
                this.localValue.typePage = typePage
                this.localValue.pageSize = size
                this.$nextTick(() => {
                    this.innerHTML()
                })
            }
        })
    },


    methods: {
        innerHTML(){
            this.$nextTick(() => {
                this.localValue.innerHTML = this.$refs.page.innerHTML
            }) 
            console.log(this.$refs.page);
        }
    },
}
</script>

<template>
<div ref="page">
    <div ref="wrapper" class="page-wrapper mx-auto" :style="wrapper" @input="innerHTML">

            <div class="page" :style="stylesContainer">

                <div class="pageHeader" :style="headerStyle"></div>
                <div class="pageContent" :style="contentStyle">
                    <div v-if="body.length === 0">
                        <AddContentHover :hover="false" @click:option="innerHTML"/>
                        
                    </div>
                    <DroppableContainer v-else>
                        <div v-for="el in body" :key="el.id" style="position:relative">
                            <component   v-model="el.value" :is="el.render"  v-bind="el.props" />
                            <AddContentHover />
                        </div>
                    </DroppableContainer>
                    
                </div>
                <div class="pageFooter" :style="footerStyle"></div>
            </div>
    </div>

</div>

</template>

<style scoped lang="scss">
.page {

    display: flex;
    flex-direction: column;
    position: relative;
    position: absolute;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-shadow: 3px 3px 8px rgba(0 0 0 / 10%);

    &Content{
        flex: 1 1 auto;
    }
}
.page-wrapper{
    display: flex;
    justify-content: center;
    position: relative;
}
</style>