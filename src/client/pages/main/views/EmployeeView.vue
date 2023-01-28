<template>
    <div class="employee">
        <div class="left">
            <div class="name">
                <div class="name_child">Фамилия: <span>{{ employee.name.last }}</span></div>
                <div class="name_child">Имя: <span>{{ employee.name.first }}</span></div>
                <div class="name_child">Отчество: <span>{{ employee.name.father }}</span></div>
            </div>
            <a class="email" :href="`mailto: ${employee.email}`">E-mail: <span>{{ employee.email }}</span></a>
        </div>
        <div class="friends-list right"> Друзья:
            <div v-if="employee.friends.length > 0">
                <router-link
                :to="`/employee/${friend.id}`"
                class="friends-list friend"
                v-for="friend in friends"
                :key="friend.id">
                {{ friend.name.last }} {{ friend.name.first }} {{ friend.name.father }}
                <i class="fa-solid fa-user-xmark" @click.prevent="deleteFriendI(friend.id)"></i>
                </router-link>
            </div>
            <div v-if="addingFriend" class="addingFriend">
                <select name="addFriend" id="" v-model="addFriendVal">
                    <option :value="notFriend.id" v-for="notFriend in notFriends" :key="notFriend.id">
                      {{ notFriend.name.last }} {{ notFriend.name.first }} {{notFriend.name.father}}
                    </option>
                </select>
            </div>
            <button class="friends_list add" @click="addFriendI(addFriendVal)">Добавить друга</button>
        </div>
            <router-link to="/">На главную</router-link>
    </div>
</template>


<script>
import store from '../store/index'

    export default {
        name: "employee-view",
        data(){
            return{
                addingFriend: false,
                addFriendVal: 0,
            }
        },
        methods:{
            deleteFriendI(id){
                store.dispatch('deleteFriend', {id: id, employee: this.employee})
            },
            addFriendI(id){
                if (this.addingFriend){
                    store.dispatch('addFriend', {id: id, employee: this.employee})
                    this.addingFriend = false
                }
                else{
                    this.addingFriend = true
                }
            },
        },
        computed: {
            employee()  {
                return store.getters.employee(this.$route.params.id)
            },
            notFriends() {
                return store.getters.friends(this.$route.params.id, false)
            },
            friends(){
                return store.getters.friends(this.$route.params.id, true)
            }

        }
    }
</script>


<style scoped lang="sass" src="../styles/oneEmployee.scss"></style>
