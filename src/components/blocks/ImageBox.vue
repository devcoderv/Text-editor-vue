
<script>
import InputFileArea from "../InputFileArea.vue"
export default {
    components: { InputFileArea },


    props: {
        src: {
            type: String,
            required: true,
            default: ''
        },
        // item: {
        //     required: false,
        //     default: () => ({
        //         src: ""
        //     })
        // }
    },

    data() {
        return {
            picture: "",
            style: {
                objectFit: 'cover',
                width: '100%'
            }
        };
    },

    mounted() {
        this.picture = this.src;
    },

    methods: {
        loadFile(e){
            console.log(e);
            this.picture = e
        }
    }

}
</script>
<template>
    <div>
        <div v-if="picture" class="d-flex">
            <img :src="picture" :style="style">
        </div>
        <InputFileArea v-else @change:loadFile="loadFile"/>
    </div>
</template>

<style>

</style>