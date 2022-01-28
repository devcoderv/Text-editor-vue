<script>
import { calculeSizePage } from '../../utils/page';
import { pageSizes } from '../../helpers/page-size'
import vmodel from "../../mixins/custom-vmodel";
export default {
    mixins: [vmodel],
    data(){
        return{
            selected: null,
            pages: [{value: null, text: 'Seleccionen página'}]
        }
    },

    created(){
        this.initialize()
    },

    // mounted(){
    //     this.$nextTick(() => {
    //         this.selected = this.localValue

    //     })
    // },

    methods: {
        initialize(){
            for (const key in pageSizes) {
                if (Object.hasOwnProperty.call(pageSizes, key)) {
                    // this.pages.push({value:key, text: key})
                    this.pages.push(key)
                }
            }
           
        },

        onChange(){
            // this.$eventBus.$emit('changePageSize', this.selected)
            console.log(pageSizes[this.selected]);

            // this.localValue = pageSizes[this.selected]
            this.$emit('change:page', calculeSizePage(this.localValue))
        }
    }
}
</script>

<template>
    <div>
         <b-form-group id="papper-group" label="Tamaño de Página" label-for="papper">

            <b-form-select 
                v-model="localValue"
                :options="pages"
                @change="onChange"
            >
            </b-form-select>
         </b-form-group>
    </div>
</template>