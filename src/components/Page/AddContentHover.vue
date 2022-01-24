<script>
import { excel, image, textBox, video } from "../../helpers/type-content"

export default {

    data(){
        return {
            element: {
                'textBox': {...textBox},
                'image': {...image},
                'excel': {...excel},
                'video': {...video},
            },
            dropdownItem: [
                // { name: 'TextBox', action() {this.onClickOption(textBox)}},
                // { name: 'Imagen', action: () =>  this.onClickOption(image) },
                // { name: 'Video', action: () =>  this.onClickOption(video) },
                // { name: 'Excel', action: () =>  this.onClickOption(excel) }
            ]
        }
    },

    computed: {
    },
    
    methods: {
        /***
         * @description Metodo pare crear nuevo elemento en pagina
         */
        onClickOption(element){
            console.log('glo', this.element[element]);
            this.$eventBus.$emit('addElement', {...this.element[element] } )
        }
    }
    
}
</script>

<template>
<div class="addContentWrapper">
    <div class="addContent bg-info">
       <b-dropdown class="dropdown-menu-page"  variant="light" size="sm">
            <template #button-content>
                <i :class="['pe-lg pe-7s-plus']"></i>
            </template>
            <b-dropdown-item size="sm" @click="onClickOption('textBox')">
                <div class="d-flex aling-items-center">
                    <img :src="require(`../../assets/icons/input.svg`)" width="16px">
                    <span class="ml-2">Texto</span>
                </div>
            </b-dropdown-item>
            <b-dropdown-item size="sm" @click="onClickOption('image')">
                <div class="d-flex aling-items-center">
                    <img :src="require(`../../assets/icons/img.svg`)" width="16px">
                    <span class="ml-2">Imagen</span>
                </div>
            </b-dropdown-item>
            <!-- <b-dropdown-item size="sm" @click="onClickOption('image')">
                Imagen
            </b-dropdown-item>
            <b-dropdown-item size="sm" @click="onClickOption('image')">
                Video
            </b-dropdown-item>
            <b-dropdown-item size="sm" @click="onClickOption('excel')">
                Excel
            </b-dropdown-item> -->
        </b-dropdown>
    </div>
</div>
</template>

<style scoped>
    .btn {
        box-shadow: 0px 3px 8px 0px rgb(0 0 0 / 10%);
    }

    .addContentWrapper {
        z-index: 2;
        position: absolute;
         width: 100%;
         padding:  8px 0;
         bottom: -8px;
    }
    .addContentWrapper {
        opacity: 0;
        transition: opacity .2s ease-in-out;
    }
    .addContentWrapper:hover {
        opacity: 1;
    }
    .addContent {
        height: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #17a2b8;
        
    }
</style>