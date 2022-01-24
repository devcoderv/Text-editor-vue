<script>
import vmodel from "../../mixins/custom-vmodel";
export default {
    
    
    mixins: [vmodel],

    data() {
        return{}
    },

    mounted(){
        this.initialize()
    },

    methods: {
        initialize(){
            this.localValue.length & (this.$refs.textbox.innerHTML =  this.localValue)
            this.$refs.textbox.focus()
        },
         handleInput () {
            this.localValue = this.$refs.textbox.innerHTML;
        },
    }

}
</script>

<template>
    <div>
        <div>
            <div ref="textbox" role="textbox" class="textbox" contenteditable="true" @input="handleInput">
                <div style="min-height:24px;"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .textbox {
        outline: none;
         padding: 8px;
       
    }
     .textbox:focus {
        border: 1px solid #ededed;
    }
     .textbox:hover {
        border: 1px solid #ededed;
    }
</style>