<template>
        <div>
            <router-view></router-view>
            <button v-if="!showForm" @click="showForm = !showForm">Добавить сотрудника</button>
            <AddEmployee v-if="showForm" @added="added"/>
        </div>
</template>

<script>
import AddEmployee from "./components/AddEmployee.vue"

export default {
    name : 'app-main',
    data(){
        return{
            showForm: false
        }
    },
    components: {
        AddEmployee
    },
    methods:{
        added(){
            this.showForm = false
        }
    }
}
</script>


<style lang="sass" src="./styles/btn.scss"></style>
<style lang="sass" src="./styles/main.scss"></style>