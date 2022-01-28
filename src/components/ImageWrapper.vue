
<script>
export default {

    prop: {
        edit: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            
        }
    },

    methods: {
        onCancel(){
            this.$emit('click:cancel', undefined)
        },
        upload(){
            this.$emit('click:upload')
        }
    }
    
}
</script>
<template>
    <div class="relative wrapper-image overflow-hidden mb-4">
        <slot></slot>
        <div class="absolute options p-2 w-full">
            <div class="justify-content">

                <div class="">
                        <b-button class="mr-2" size="sm" @click="onCancel">Cancelar</b-button>
                        <b-button variant="primary" size="sm" @click="upload"> Aplicar</b-button>
                </div>
            </div>
        </div>

    </div>  
</template>

<style scoped>
    .wrapper-image
    .options {
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
        z-index: 1;
    }
    
</style>