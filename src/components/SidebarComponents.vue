
<script>
import PageProperties from './Page/PageProperties.vue'

import TypeContent from './TypeContent.vue'
export default {
    
    components: { TypeContent, PageProperties },
    
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        }
    },

    data(){
        return {
            active: 'TypeContent'
        }
    },

    mounted(){
        this.$eventBus.$on('sibebarActive', (value)=> (this.active = value ))
    },

    computed: {
        sibebarActive() {
            switch (this.active) {
                case 'PageProperties':
                    return {render: "PageProperties", value: '', props: {}};
                default:
                    return {render: "TypeContent", value: '', props: {items: this.items}};
            }
        }
    },

    
}
</script>

<template>
<div>
    
    <!-- <keep-alive> -->
        <component  :is="sibebarActive.render" v-bind="sibebarActive.props"/>
    <!-- </keep-alive> -->
</div>
</template>

<style>

</style>