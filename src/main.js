// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(vueResource);

var router = new VueRouter(
	{
		mode: 'history',
		routes:
		[{
		    path: '/',
		    component: require('./views/Hello.vue')
		  }, {
		    path: '/distribution',
		    component: require('./views/Hello.vue')
		  }, {
		    path: '/goods',
		    component: require('./views/goods.vue')
		  },
		  {
		    path: '/orders',
		    component: require('./views/orders.vue')
		  },
		  {
		    path: '/logindata',
		    component: require('./views/logindata.vue')
		  },
		  {
		    path: '/orderupload',
		    component: require('./views/orderupload.vue')
		  },
		  {
		    path: '/tktoken',
		    component: require('./views/tktoken.vue')
		  },
		  {
		    path: '/uploadcode',
		    component: require('./views/uploadcode.vue')
		  }
		]
		
		
	   }
);
const api = "http://api.jianshen.so";
/* eslint-disable no-new */
const app = new Vue({
  router,render:h=>h(App)
}).$mount('#app')