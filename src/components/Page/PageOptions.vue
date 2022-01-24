<script>
export default {

    props: {
        page:{
            type: Number,
            required:true,
            default: 0
        }
    },

    computed: {
        btns() {
            return [
                {
                    actions: (index) => this.onClickClone(index),
                    icon: 'pe-7s-copy-file',
                    title: 'Clonar'
                },
                {
                    actions: (index) => this.onClickConfig(index),
                    icon: 'pe-7s-config',
                    title: 'Configuracion'
                },
                {
                    actions: () => this.onClickConfig(),
                    icon: 'pe-7s-trash',
                    title: 'Eliminar'
                }
            ]
        }
    },

    methods: {
        onClickConfig(page) {
            this.$emit('click:config', page - 1)
        },
        onClickClone(page) {
            this.$emit('click:clone', page)
        },
        addPage(type){
            this.$eventBus.$emit("addPage", this.page + type)
        },
    }
}
</script>
<template>
<div class="mx-auto">
    <b-row class="mb-1">
        <b-col class="d-flex align-items-center">Página {{this.page}}</b-col>
        <b-col class="text-center">
             <b-dropdown class="dropdown-menu-page"  variant="light" size="sm">
                <template #button-content>
                    <i :class="['pe-lg pe-7s-plus']"></i>
                </template>
                <b-dropdown-item  size="sm" @click="addPage(1)">Agregar página</b-dropdown-item>
                <b-dropdown-item  size="sm" @click="addPage(-1)">Agregar página antes</b-dropdown-item>
            </b-dropdown>
            
        </b-col>
        <b-col class="text-right">
            <b-button-group>
                <b-button v-for="{actions, icon, title} in btns" :key="icon" variant="light" size="sm" @click="actions(page)" :title="title">
                    <i :class="['pe-lg', icon]"></i>
                </b-button>
            </b-button-group>

        </b-col>
    </b-row>

</div>
</template>

<style>

    .btn:hover .pe-7s-trash{
        color: red;
    }

    .dropdown-menu-page .dropdown-item {
        font-size: .85rem;
    }
    .dropdown-menu-page .dropdown-toggle::after {
        content: none;
    }

</style>