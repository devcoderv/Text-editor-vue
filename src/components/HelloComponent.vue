<script>
export default {
     props: {
        value: {
            require: false
        },
        title: String
    },

   data() {
        return{

            localValue: this.value
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
}
</script>
<template>
    <h1>{{title}}</h1>
</template>