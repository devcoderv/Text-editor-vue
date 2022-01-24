<script>
export default {

    methods: {
        loadFile(){
            this.$refs.inputFile.click()
        },
        onChangeFile(e){
            const file = e.target.files[0]
            
            const src = URL.createObjectURL(file)
            this.$emit('change:loadFile', src)
        }
    }
    

}
</script>
<template>
    <div>
        <div class="fileArea" role="button" @click="loadFile">
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 4l-7 7h3.999v5.001H15V11h4l-7-7zM5 20h14v-2H5v2z">
                </path>
            </svg>
            <p class="mb-0 mt-1">Click para cargar una imagen</p>
        </div>
        <input ref="inputFile" type="file" hidden @change="onChangeFile">
    </div>
</template>


<style scoped>

    .fileArea {
        background: #eeeeee;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
    }

</style>