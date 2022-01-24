<script>
export default {

    props: {
        value: {}
    },

    data() {
        return{

            localValue: this.value,
            section: ''
        }
    },

    watch: {
        value(val){
            this.localValue = val
        },

        localValue(val){
            this.$emit('input', val)
        }
    },
    mounted(){
        // const h1 = this.$createElement('h1','hola')
        // console.log(this.$refs.label.$options);
        // this.resize();
           
        this.localValue.length && (this.$refs.textbox.innerHTML = this.localValue)
        this.$refs.textbox.focus()
        // this.$refs.textbox.firstChild.focus();
          document.addEventListener('mouseup', event => {
            if (event.target === this.$refs.textbox || event.target.contains(this.$refs.textbox))
                this.getSelection();
            });
    },

    methods: {
        // resize() {
        //     const { textarea } = this.$refs;
        //     textarea.style.height = textarea.scrollHeight - 4 + 'px';
        // }
        change(e){
            console.log(e);
            this.localValue = this.localValue + e.data
        },
        handleInput () {
            this.localValue = this.$refs.textbox.innerHTML;
        },
        getSelection() {
       
            console.log(window.getSelection());
            
        },
        bold(){
            document.execCommand('bold');
        }

    }

}
</script>

<template>

        <div class="relative">
            <!-- <button @click="bold"><b>B</b></button> -->
            <div class="handle"></div>
            <p ref="textbox"  contenteditable="true" @input="handleInput" @mouseup="getSelection" data-text="Enter comment...."  style="min-height:24px;">
                <!-- <p ref="text"></p> -->
                <!-- <div></div> -->
            </p>

        </div>
        

    
</template>

<style scoped>
textarea {
    resize: none;
    overflow: hidden;
    width: 100%;
    outline: none;
    border: none;
}
.relative {
    position: relative;
}
.handle {
    /* content: ''; */
    width: 24px;
    height: 24px;
    background: red;
    position: absolute;
    left: -30px;
}

</style>

