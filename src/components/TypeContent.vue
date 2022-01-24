
<script>
import DraggableItem from "./drap-and-drop/DraggableItem.vue";
export default {
    props: {
        items: {
            type: Array,
            required: true,
            default: () => ([])
        }
    },
    data() {
        return {};
    },
    components: { DraggableItem }
}
</script>
<template>
<div>

        <h2 class="text-center mb-4">Contenido</h2>
    <div class="row content">
        
        <DraggableItem v-for="item in items" 
            :key="item.id"
            :item="item"  class="col-6 mb-2 px-1">
            <div class="list-group-item text-center">
                <img class="fik-icon mb-2 mx-auto" :src="require(`./../assets/icons/${item.icon}.svg`)">
                <p class="mb-0">{{item.name}}</p>
            </div>
        </DraggableItem>  

    </div>
</div>
</template>

<style scoped>
    .fik-icon {
        width: 24px;
        height: 24px;
    }

    .content {
        width: 100%;
        margin: 0 auto;
    }
</style>
