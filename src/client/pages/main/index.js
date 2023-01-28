import Vue from "vue";
import VueRouter from "vue-router";
// import Vuex from "vuex";

import routes from './router';

// import Vuetify from "vuetify/lib";

// import 'vuetify/dist/vuetify.css';

import Main from './AppMain';

Vue.use(VueRouter);
const router = new VueRouter({
    routes
})

// Vue.use(Vuex);
import store from "./store"

new Vue({
    router: router,
    store: store,
    render: (h) => h(Main)
}).$mount('#app');

