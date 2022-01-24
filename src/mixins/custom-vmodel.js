export default {
    props:{
        value: {}
    },

    data(){
        return {
            localValue: this.value
        }
    },

    watch: {
        locaValue(value) {
            this.$emit('input', value)
        },

        value(value) {
            this.localValue = value
        }
    }
}