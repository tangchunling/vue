<template>
  <div>
	  <header class="r-head">
  		微信公众后台管理系统<div class="loginright"><label >{{name}}</label><span @click="loginout()">登出</span></div>
	  </header>
	    <div class="row procontainer">
		  <div class="col-xs-2">
		  	<div class="rslider">
		  		<ul>
		  			<!--<h2>CMS系统</h2>
			  		<li>
			  			<router-link to="distribution">CMS系统</router-link>
			  		</li>-->
			  		<h2>分销系统</h2>
			  		<li>
			  			<router-link to="logindata">数据设置</router-link>
			  		</li>
			  		<li>
			  			<router-link to="goods">商品管理</router-link>
			  		</li>
			  		<li>
			  			<router-link to="tktoken">自定义淘口令</router-link>
			  		</li>
			  		<li>
			  			<router-link to="orders">订单管理</router-link>
			  		</li>
			  		<li>
			  			<router-link to="orderupload">订单录入</router-link>
			  		</li>
			  		<li>
			  			<router-link to="uploadcode">上传二维码</router-link>
			  		</li>
			  		<h2>运营活动管理</h2>
			  		<li>
			  			<router-link to="activity">新建活动标题</router-link>
			  		</li>
			  		<li>
			  			<router-link to="actdetail">活动内容管理</router-link>
			  		</li>
			  		<li>
			  			<router-link to="actgoods">活动商品管理</router-link>
			  		</li>
			  		<li>
			  			<router-link to="updatetitle">修改活动标题</router-link>
			  		</li>
			  		<li>
			  			<router-link to="update_navigation">修改分类</router-link>
			  		</li>
			  		<li>
			  			<router-link to="updategoods">修改活动商品</router-link>
			  		</li>
			  		<li>
			  			<router-link to="updatebanner">修改活动banner</router-link>
			  		</li>
			  		<!--<h2>微信</h2>
			  		<li>
			  			<router-link to="distribution">群管理</router-link>
			  		</li>-->
			  	</ul>
		  	</div>
		  </div>
		  <div class="col-xs-10 rcontent">
		  	<router-view v-on:namechild="getname"></router-view>
		  </div>
	  </div>
  </div>
</template>

<script>
require('./assets/common.css');
import {api,islogin} from './assets/js/common';

export default {
	data(){
		return {name:""}
	},
	methods:{
		loginout:function(){
			var self = this;
			this.$http.get(api+"/index.php?r=user/logout",{credentials: true}).then((response) => {
				if(response.body.state == 1000){
					self.$router.push('/login');
					self.name = ""
				}
			},(response) => {
				
			})
		},
		getname:function(name){
			this.name=name;
		}
	},
	created:function(){
		var self = this;
		islogin(function(val){
			if(val) self.name = val.data.userName;
		})
	}
}
</script>
<style>
html,body{height: 100%;color:#666;}
#app{min-width: 1000px;}
.r-head{padding:20px;background: #42B983;color:#fff;position: fixed;width: 100%; z-index: 10;}
.rslider{font-size: 16px;height: 100%;border-right: 1px solid #eee;position: fixed;background: #fff;z-index: 22;overflow-y: scroll;}
.rslider ul li a{display: block;line-height: 40px;font-size: 14px;padding:0 20px;color:#666}
.rslider ul h2{line-height: 40px;background: #f1f2f4;color:#444;padding:0 20px;}
.rcontent{padding:30px;}
.loginright{display: inline-block;float: right;}
.loginright label{margin-right: 10px;}
.loginright span{cursor: pointer;}
.rslider ul li a.router-link-active{color: #42B983;font-weight: bold;}
.procontainer{padding-top: 56px;}
</style>
