<script>

export default {

    props: {
        pages: {
            type: Number,
            required: true,
            default: 0
        },
        pageActive: {
            type: Number,
            required: true,
            default: 0
        },
    },

    data() {
        return {
            zoom: 1
        }
    },

    computed: {
        disableNextPage(){
            console.log('next');
            console.log(this.pageActive === 1);
            return this.pages === 1 || this.pageActive === this.pages
        },
        disablePrevPage(){
            console.log(this.pageActive === 1);
            return this.pageActive === 1 
        },
      
    },

    methods: {
        zoomOut(){
            this.zoom > 0.75 && (this.zoom = this.zoom - 0.25)
            this.$eventBus.$emit('zoom', this.zoom)
        },
        zoomIn(){
            this.zoom < 2 && (this.zoom = this.zoom + 0.25)
            this.$eventBus.$emit('zoom', this.zoom)
        },
        zoomReset(){
            this.zoom = 1 
            this.$eventBus.$emit('zoom', this.zoom)
        },
        nextPage(){
            this.$emit('click:nextPage', this.pageActive + 1)
        },
        previusPage(){
            this.$emit('click:previusPage', this.pageActive - 1)
        },
    }


}
</script>
<template>
    <div class="bar-options d-flex align-items-center">
        <div class="d-flex align-items-center">
            <span>Página</span>
            <b-button-group class="mx-2">
                <b-button  variant="light" size="sm" @click="previusPage" :disabled="disablePrevPage">
                     <i :class="['pe-lg pe-7s-angle-left']"></i>
                </b-button>
                <b-button disabled variant="light" size="sm">
                     {{pageActive}}
                </b-button>
                <b-button  variant="light" size="sm" @click="nextPage" :disabled="disableNextPage">
                     <i :class="['pe-lg pe-7s-angle-right']"></i>
                </b-button>
            </b-button-group>
            <span>de {{ pages }}</span>
        </div>
        <b-button-group>
            <b-button  variant="light" size="sm" @click="zoomOut">
                <img :src="require(`../assets/icons/zoon-out.svg`)" width="18" height="18"  >
            </b-button>
            <b-button  variant="light" size="sm" disabled>
                {{this.zoom * 100 + '%'}}
            </b-button>
            <b-button  variant="light" size="sm" @click="zoomIn">
                <img :src="require(`../assets/icons/zoom-in.svg`)" width="18" height="18">
            </b-button>
        </b-button-group>
    </div>
</template>


<style>
.bar-options{
    background-color: #ffffff;
    box-shadow: 0px 3px 8px 0px rgb(0 0 0 / 10%);
    gap: 2rem;
    padding: .25rem 0;
    z-index: 1;
}
</style>