<script>
import PageSize from './PageSize.vue'
export default {
  components: { PageSize },

    data(){
        return {
            index: 0,
            padding: [0,0,0,0],
            page: [0,0]
        }
    },

    computed: {
        sizePage(){
            const height = this.page[1] * 12.5 / 100
            const width = this.page[0] * 12.5 / 100

            return {
                height: height + 'px',
                width: width + 'px'
            }
        }
    },

    watch:{
        // padding(value){
        //     console.log(value);
        //     this.$eventBus.$emit('setPadding', {value})
        // }
    },

    created() {

        this.$eventBus.$on('pageLayout', (item) => {
            const { index,padding, size } = {...item}
            this.index = index +1
            this.padding = padding
            this.page = size
        })

    },

    methods: {
        onlyNumber(evt) {
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        }
    }
    
}
</script>

<template>
<div>
    <PageSize />

    <p>Margenes</p>
    <div class="d-flex align-items-center justify-content-center">
        <div>
            <input v-model.number="padding[3]" type="text" placeholder="in" @keypress="onlyNumber">
        </div>
        <div class="d-flex flex-column align-items-center px-2">
            <input v-model.number="padding[0]" type="text" placeholder="in" @keypress="onlyNumber">
            <div class="miniPage my-2" :style="{...sizePage}"></div>
            <input v-model.number="padding[2]" type="text" placeholder="in" @keypress="onlyNumber">
        </div>
        <div>
            <input v-model.number="padding[1]" type="text" placeholder="in" @keypress="onlyNumber">

        </div>
    </div>
    
</div>
</template>

<style scoped>
input {
    width: 40px;
}

.miniPage {
    border: 1px solid #00000025;
    background: #ffffff;
} 
</style>