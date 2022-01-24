<script>
import DroppableContainer from "../drap-and-drop/DroppableContainer.vue"
import DraggableItem from "../drap-and-drop/DraggableItem.vue";
import TextBox from "../blocks/TextBox.vue";
import ImageBox from "../blocks/ImageBox.vue";
import AddContentHover from "./AddContentHover.vue";
export default {
    props: {
        padding: {
            type: Array,
            required: true,
            default: () => ([0.68, 0.68, 0.68, 0.68])
        },
        size: {
            type: Array,
            required: false,
            default: () => [0, 0]
        },
        bg: {
            type: Object,
            required: true,
            default: () => ({
                color: '#ffffff',
                image: undefined
            })
        },
        body: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {
            zoom: 1
        };
    },
    computed: {
        wrapper() {
            return {
                height: `calc(${this.size[1]}px)`,
                width: `calc(${this.size[0]}px)`,
                transform: ` scale(${this.zoom})`,
                position: "relative"
            };
        },
        stylesContainer() {
            return {
                height: "100%",
                width: `100%`,
                boxShadow: "3px 3px 8px rgba(0 0 0 / 10%)",
                // transform: ` scale(${this.zoom})`,
                backgroundColor: this.bg.color,
                backgroundImage: `url(${this.bg.image})`,
                position: "absolute",
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                top: "0",
                letf: "0"
            };
        },
        stylesPage() {
            return {
            // transform: ` scale(${this.zoom})`,
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
        // this.$eventBus.$on('zoom', (value) => {
        //     this.zoom = value
        //     // this.$refs.wrapper.querySelector('.pageContent').children.style.transform.scale =  value;
        // })
    },
    components: { DroppableContainer, DraggableItem, TextBox, AddContentHover, ImageBox }
}
</script>

<template>
<div ref="wrapper" class="page-wrapper mx-auto" :style="wrapper">

        <div class="page" :style="stylesContainer">

            <div class="pageHeader" :style="headerStyle"></div>
            <div class="pageContent" :style="contentStyle">
                <DroppableContainer>
                    <div v-for="el in body" :key="el.id" style="position:relative">
                        <component   v-model="el.value" :is="el.render"  v-bind="el.props" />
                        <AddContentHover />
                    </div>
                </DroppableContainer>
                
            </div>
            <div class="pageFooter" :style="footerStyle"></div>
        </div>
</div>

</template>

<style scoped lang="scss">
.page {

    display: flex;
    flex-direction: column;
    position: relative;

    &Content{
        flex: 1 1 auto;
    }
}
.page-wrapper{
    display: flex;
    justify-content: center;
}
.page-wrapper .pageContent  *{
    // transform: scale(.75);
}

.p {
    font-size: 1rem;
}

</style>