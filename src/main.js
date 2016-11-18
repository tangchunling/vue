// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';
import {islogin} from './assets/js/common'

Vue.use(VueRouter);
Vue.use(vueResource);

var router = new VueRouter(
	{
		mode: 'history',
		routes:
		[{
		    path: '/',
		    component: require('./views/goods.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  }, {
		    path: '/distribution',
		    component: require('./views/distribution.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  }, {
		    path: '/goods',
		    component: require('./views/goods.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/orders',
		    component: require('./views/orders.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/logindata',
		    component: require('./views/logindata.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/orderupload',
		    component: require('./views/orderupload.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/tktoken',
		    component: require('./views/tktoken.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/uploadcode',
		    component: require('./views/uploadcode.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/login',
		    component: require('./views/login.vue')
		  },
		  {
		    path: '/adminlogin',
		    component: require('./views/adminlogin.vue')
		  },
		  {
		    path: '/activity',
		    component: require('./views/activity/activity.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/actdetail',
		    component: require('./views/activity/actdetail.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/actgoods',
		    component: require('./views/activity/actgoods.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/updatetitle',
		    component: require('./views/activity/updatetitle.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/update_navigation',
		    component: require('./views/activity/update_navigation.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/updategoods',
		    component: require('./views/activity/updategoods.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  },
		  {
		    path: '/updatebanner',
		    component: require('./views/activity/updatebanner.vue'),
		    auth: true,
		    meta: {
		      requiresAuth: true
		    }
		  }
		]
		
		
	   }
);
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
	    // this route requires auth, check if logged in
	    // if not, redirect to login page.
		islogin(function(val){
			if(val){
				next()
			}else{
				next({
					path:'login'
				});
			}
		})
	  } else {
	    next() // make sure to always call next()!
	  }
})

const api = "http://api.jianshen.so";
/* eslint-disable no-new */
const app = new Vue({
  router,render:h=>h(App)
}).$mount('#app')