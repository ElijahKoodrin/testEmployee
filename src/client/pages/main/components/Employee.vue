<template>
        <router-link :to="`/employee/${employee.id}`" class="employee-list employee" v-if="!editing">
            <div class="employee__name" >
                <p>{{ employee.name.last }}</p>
                <p>{{ employee.name.first }}</p>
                <p>{{ employee.name.father }}</p>
            </div>
            <a class="employee__email" @click.prevent="mail()">{{ employee.email }}</a>
            <p class="employee__friends">Друзья: {{ employee.friends.length }}</p>
            <button class="employee__button delete" @click.prevent="deleteEmployee()"><i class="fa-regular fa-trash-can"></i></button>
            <button class="employee__button edit" @click.prevent="editing = true"><i class="fa-solid fa-user-pen"></i></button>
        </router-link>

        <form  class="employee-list employee" v-else>
            <div class="employee__name">
                <input  type="text" v-model="employee.name.last" placeholder="Фамилия" class="employee__name" required>
                <input type="text" v-model="employee.name.first" placeholder="Имя" class="employee__name" required>
                <input type="text" v-model="employee.name.father" placeholder="Отчество" class="employee__name">
            </div>
            <input type="email" v-model="employee.email" placeholder="Электронная почта" class="employee__name" required>
            <button @click.prevent="updateEmployeeI()" type="submit" class="employee__button confirm"><i class="fa-regular fa-circle-check"></i></button>
        </form>
</template>

<script>
import validate from "../utils/validate.js"
import store from '../store/index'


export default {
    name: "employee",
    data(){
        return{
            editing: false           
        }
    },
    methods:{
        deleteEmployee(){
            console.log(this.employee)
            store.dispatch('deleteEmployee', this.employee.id)
        },
        updateEmployeeI(){
                let name = {
                    first: this.employee.name.first,
                    last: this.employee.name.last,
                    father: this.employee.name.father
                }
                if (
                    validate.validateEmail(this.employee.email)
                    &&
                    validate.validateName(name))
                {
                    this.employee = {
                        id: this.employee.id,
                        name: name,
                        email: this.employee.email,
                        friends: this.employee.friends
                    }
                    this.editing = false
                }
        },
        mail(){
            window.location.href = `mailto: ${this.employee.email}`
        }
    },
    computed: {
        employee: {
            get(){
                let employee = store.getters.employee(this.$vnode.key)
                return {
                    id: employee.id,
                    friends: employee.friends,
                    email: employee.email,
                    name: {
                        first: employee.name.first,
                        last: employee.name.last,
                        father: employee.name.father
                    }
                }
            },
            set(value){
                store.dispatch('updateEmployee', value)
            }
        }
    }
}
</script>

<style scoped>
*{
    text-decoration: none;
}
</style>

