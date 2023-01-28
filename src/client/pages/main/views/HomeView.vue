<template>
        <div class="employee-list">
            <Employee v-for="employee in allEmployees" :id="employee.id" :key="employee.id" />
        </div>
</template>

<script>
import store from '../store/index'
import Employee from "../components/Employee.vue"

export default {
    name: 'home-view',
    components: {
        Employee
    },
    data() {
        return {
        }
    },
    props: ['employees'],
    computed:{
        allEmployees(){
            return store.getters.allEmployees
        }
    }
}
</script>
