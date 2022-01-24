<script>
export default {
    props: {
        type: String
    },
    render(createElement){
        return createElement(this.type)
    }
}
</script>