

<script>
import vmodel from "../../mixins/custom-vmodel";
export default {
    mixins: [vmodel],

    props: {
        size: {
            type:Array,
            required:true
        }
    },

    computed: {
        sizePage(){
            const height = this.size[1] * 12.5 / 100
            const width = this.size[0] * 12.5 / 100
            return {
                height: height + 'px',
                width: width + 'px',
            }
        },

        margen() {
            return this.localValue
        },
        paddingTop() {
            return this.localValue[0] * 12.5 / 100
        },
        paddingRight() {
            return this.localValue[1] * 12.5 / 100
        },
        paddingBottom() {
            return this.localValue[2] * 12.5 / 100
        },
        paddingLeft() {
            return this.localValue[3] * 12.5 / 100
        },

        lines() {
            return [
                { className: 'line-marigin-x', style: {top: `${this.paddingTop}in`}},
                { className: 'line-marigin-y', style: {right: `${this.paddingRight}in`}},
                { className: 'line-marigin-x', style: {bottom: `${this.paddingBottom}in`}},
                { className: 'line-marigin-y', style: {left: `${this.paddingLeft}in`}},
            ]
        }
        
    },


    methods: {
        /**
         * @description Metodo para permitir solo numero en un input
         * @param {evt} recibe el evento del teclado
         */
        onlyNumber(evt) {
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
    }

}
</script>

<template>
    <div>
        <p>Márgenes</p>
        <div class="d-flex align-items-center justify-content-center">
            <div>
                <b-input v-model.number="localValue[3]" type="text" placeholder="in" size="sm" @keypress="onlyNumber" />
            </div>
            <div class="d-flex flex-column align-items-center px-2">
                <b-input v-model.number="localValue[0]" type="text" placeholder="in" size="sm" @keypress="onlyNumber" />
                <div class="miniPage my-2" :style="sizePage">
                    <div
                        v-for="(line, i) in lines" 
                        :key="`${line}-${i}`"
                        :class="line.className"
                        :style="line.style">
                    </div>
                </div>
                <b-input v-model.number="localValue[2]" type="text" placeholder="in" size="sm" @keypress="onlyNumber" />
            </div>
            <div>
                <b-input v-model.number="localValue[1]" type="text" placeholder="in" size="sm" @keypress="onlyNumber" />

            </div>
        </div>
        
    </div>
</template>

<style scoped>
input {
    width: 50px;
}

.miniPage {
    border: 1px solid #00000025;
    background: #ffffff;
    position: relative;
} 

.line-marigin-x {
    position: absolute;
    width: 100%;
    background-color: var(--teal);
    height: 1px;

}
.line-marigin-y {
    position: absolute;
    height: 100%;
    background-color: var(--teal);
    width: 1px;

}

.top-0{
    top: 0;
}
.right-0{
    right: 0;
}
.bottom-0{
    bottom: 0;
}
.left-0{
    left: 0;
}
</style>