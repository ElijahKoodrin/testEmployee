<template>
    <form style="margin-top: 20px; display: flex; align-items:center; justify-content: center; flex-direction: column">
        <div class="name">
            <input type="text" placeholder="Фамилия" v-model="employeeLast" required>
            <input type="text" placeholder="Имя" v-model="employeeFirst" required>
            <input type="text" placeholder="Отчество" v-model="employeeFather">
        </div>
        <input type="email" placeholder="email" v-model="employeeMail" required>
        <button @click="cancelAddition" class="cancel">Отмена</button>
        <button @click="addEmployeeI" class="add">Добавить</button>
    </form>

</template>

<script>
import { mapGetters } from "vuex";
import store from '../store/index'
import validate from "../utils/validate.js"

export default {
    name: 'add-employee',
    data() {
        return {
            employeeMail: '',
            employeeLast: '',
            employeeFirst: '',
            employeeFather: '',
        }
    },
    methods: {
        cancelAddition(){
            this.$emit('added')
        },
        addEmployeeI(){
            if (
                validate.validateEmail(this.employeeMail)
                &&
                validate.validateName({
                    last: this.employeeLast,
                    first: this.employeeFirst,
                    father: this.employeeFather,
                })
            )
            {
                store.dispatch('addEmployee',
                    {
                    id: this.allEmployees.length === 0 ? 1 : this.allEmployees.length + 1,
                    email: this.employeeMail,
                    name: {
                        last: this.employeeLast,
                        first: this.employeeFirst,
                        father: this.employeeFather,
                    },
                    friends: []
                })
                this.$emit('added')
            }
        },
    },
    computed: {
        ...mapGetters(["allEmployees"]),
    }
}
</script>

<style lang="sass" src="../styles/AddEmployee.scss" scoped></style>
