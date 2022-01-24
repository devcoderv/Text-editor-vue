<script>
import { pageSizes } from '@/helpers/page-size'
export default {
    data(){
        return{
            selected: null,
            pages: [{value: null, text: 'Seleccionen página'}]
        }
    },

    created(){
        this.initialize()
    },

    mounted(){
        // this.
    },

    methods: {
        initialize(){
            for (const key in pageSizes) {
                if (Object.hasOwnProperty.call(pageSizes, key)) {
                    this.pages.push({value:key, text: key})
                }
            }
        },

        onChange(){
            this.$eventBus.$emit('changePageSize', this.selected)
        }
    }
}
</script>

<template>
    <div>
         <b-form-group id="papper-group" label="Tamaño de Página" label-for="papper">

            <b-form-select 
                v-model="selected"
                :options="pages"
                @change="onChange"
            >
            </b-form-select>
         </b-form-group>
    </div>
</template>