
<script>
export default {
    
    props: {
        /***
         * @description contiene el HTML de cada pagina generado por el editor de texto
         */
        document: {
            type: Array,
            required: true,
            default: () =>  []
        },
         /***
         * @description Pagina activa en el editor
         */
        currentPage:{
            type: Number,
            required: true,
            default: 1
        }
    },
    
    data(){
        return {
            open: false,
            height: undefined
        }
    },


    updated(){
        this.calculeHeight()
    },

    methods:{
        /***
         * @description Metodo que verifica que la pagina actual y la posicion sea equivalente
         * @param { index } corresponde a la posicion de la pagina dentro del Documento
         * */
        pageActive(index) {
            return this.currentPage === index + 1
        },

         /***
         * @description Muestra y oculta el container de la preview
         * */        
        onOpenPreview() {
            this.open = !this.open
        },

        calculeHeight() {
                const height =    this.$refs.page.map((el) => el.offsetHeight)
                // console.log(height);
            this.height = height.reduce((a,b) => a+b,0)
        }
    }
    
}


</script>
<template>
    <div :class="{'preview-wrapper': true,  'is-active': open}" >
        <div class="preview-content">

        <div  class="relative" :style="{height:`${(height * 0.25) +  (30.12 * document.length - 1)}px`}">
                    <div ref="documents" class="preview" >
                        <div class="pages">
                            <div ref="page" v-for="(page, i) in document" :key="`page${i+1}`" class="relative m-5">
                                <div class="text-center mb-5">
                                    <div class="number-page btn-purple text-white mx-auto">
                                        {{i + 1}}
                                    </div>
                                </div>
                                <!-- con la directiva v-html se hace en render de html generado por el editor de texto -->
                                <div :class="{'current-page': pageActive(i)}" v-html="page.innerHTML"></div>
                                <div style="position: absolute; width: 100%;height: 100%;top: 0;"></div>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
            <!-- Boton que muestra y oculta la vista a preview del documento -->
            <div  class="preview-open btn-purple" role="button" @click="onOpenPreview">
                <i  :class="{'pe-7s-right-arrow icon' : true,  'is-active': open}" ></i>
            </div>
    </div>
</template>

<style scoped lang="scss">

.btn-purple {
    background-color: #90c;
    border-color: #90c;
    color: #f0f8ff;
}
.preview-content{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.preview {
    width: fit-content;
    overflow: hidden;
    transform: scale(.25);
    transform-origin: left top;
    width: 400%;
    display: flex;
    justify-content: center;

    &-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 350px;
        background: rgba($color: #000000, $alpha: 0.25);
        padding-top: 3.25rem;
        // overflow-y: auto;
        backdrop-filter: blur(8px);
        transform: translateX(-100%);
        transition: all .25s ease-in-out;
    
        &.is-active {
            transform: translateX(0);
        }
    }
    
    &-open {
        position: absolute;
        right: -32px;
        width: 32px;
        height: 37px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        z-index: 5;
        top: 50%;
        overflow: revert;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 1.5rem;
        font-weight: bold;
        transition: all .25 ease-in-out;

        .icon.is-active {
                transform: rotate(180deg);
        }
    }
}


.pages {
    width: fit-content;
    overflow: hidden;
}

.current-page .page-wrapper{
    box-shadow: 0px 0px 12px 17px rgba(153, 0, 204, .25);
}

.number-page{
    font-size: 5rem;
    border-radius: 50%;
    padding: 1rem;
    width: 7rem;
    height: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

</style>

