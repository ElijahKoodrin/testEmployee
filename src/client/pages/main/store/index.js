import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        employees: [
            {
                "id": 1,
                "name": {
                    "first": "Илья",
                    "last": "Кудрин",
                    "father": "Олегович"
                },
                "email": "elijahkoodr@gmail.com",
                "friends": [
                    2
                ]
            },
            {
                "id": 2,
                "name": {
                    "first": "Александр",
                    "last": "Соколов",
                    "father": "Максимович"
                },
                "email": "sokolSanya@gmail.com",
                "friends": []
            },
            {
                "id": 3,
                "name": {
                    "first": "Иван",
                    "last": "Иванов",
                    "father": "Иванович"
                },
                "email": "tripleIvan@mail.ru",
                "friends": [
                    1,
                    2
                ]
            }
        ]
    },
    getters: {
        allEmployees: (state) => state.employees,
        employee: (state) => (id) => {
            return state.employees.find(e => e.id == id)
        },
        friends: (state, getters) => (id, isFriends) => {
            let list = []
            let employee = getters.employee(id)
            let allEmployees = getters.allEmployees
            for (let worker of allEmployees) {
                if (isFriends) {
                    if (employee.friends.includes(worker.id)) {
                        list.push(worker)
                    }
                } else {
                    if (!(employee.friends.includes(worker.id)) && worker.id != employee.id) {
                        list.push(worker)
                    }
                }
            }
            return list
        }
    },
    actions: {
        addEmployee({ commit }, employee) {
            commit("ADD_EMPLOYEE", employee);
        },
        deleteEmployee({ commit, state }, id) {
            for (let employee of state.employees) {
                if (employee.id != id) {
                    let index = employee.friends.indexOf(id);
                    if (index != -1) {
                        employee.friends.splice(index, 1)
                    }
                }
            }

            commit("DELETE_EMPLOYEE", id);
        },
        updateEmployee({ commit }, employee) {
            commit('UPDATE_EMPLOYEE', employee);
        },
        deleteFriend({ commit, state }, object) {
            let id = state.employees.findIndex(e => e.id == object.employee.id)
            let index = state.employees[id].friends.indexOf(object.id)

            commit('DELETE_FRIEND', { id: id, index: index });
        },
        addFriend({ commit, state }, object) {
            let id = state.employees.findIndex(e => e.id == object.employee.id)

            commit('ADD_FRIEND', { id: id, friend: object.id });
        }
    },
    mutations: {
        ADD_EMPLOYEE(state, employee) {
            state.employees.push(employee);
        },
        DELETE_EMPLOYEE(state, id) {
            state.employees = state.employees.filter(employee => employee.id != id)
        },
        UPDATE_EMPLOYEE(state, employee) {
            let id = state.employees.findIndex(e => e.id == employee.id)
            state.employees[id] = employee;
        },
        DELETE_FRIEND(state, object) {
            state.employees[object.id].friends.splice(object.index, 1)
        },
        ADD_FRIEND(state, object) {

            state.employees[object.id].friends.push(object.friend)
        }
    },
    modules: {},
});