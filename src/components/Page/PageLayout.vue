<script>
import PageSize from './PageSize.vue'
import PageMargin from './PageMargin.vue'
export default {
  components: { PageSize, PageMargin },

    data(){
        return {
            id: null,
            index: 0,
            padding: [0,0,0,0],
            orientation: '',
            page: [0,0],
            typePage: undefined,
            pageOrientation: null,
            options: [
                { value: 'Vertical', text: 'Vertical' },
                { value: 'Horizontal', text: 'Horizontal' },
            ]
        }
    },

    watch: {
        padding(){
            this.onChangeMargin()
        }
    },

    created() {

        this.$eventBus.$on('pageLayout', (item) => {
            const { id, index,padding, size, orientation, typePage } = {...item}
            this.index = index +1
            this.padding = padding
            this.page = size
            this.typePage = typePage
            this.pageOrientation =  orientation
            this.id = id
        })

    },

    methods: {
        onChange(){
            this.$eventBus.$emit('changeOrientation', {id: this.id, orientation: this.pageOrientation})
        },
        onChangePage(size){
            this.$eventBus.$emit('changePageSize',  {id: this.id, typePage: this.typePage, size})
            // this.$eventBus.$emit('changeOrientation', {id: this.id, orientation: this.pageOrientation})
        },

        onChangeMargin(){
            this.$eventBus.$emit('changeMarginPage',  {id: this.id, padding: this.padding})
        }
    }
    
}
</script>

<template>
<div>
    <PageSize v-model="typePage" @change:page="onChangePage"/>

     <b-form-group label="Orientación">
         <b-form-select 
         v-model="pageOrientation"
                :options="options"
                @change="onChange"
        />
    </b-form-group>
    <PageMargin v-model="padding" :size="page" />
   
</div>
</template>

<style scoped>
</style>