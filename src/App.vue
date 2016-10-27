<template>
  <div id="app">
	  <header class="r-head">
  		微信公众后台管理系统
	  </header>
	    <div class="row">
		  <div class="col-xs-2">
		  	<div class="rslider">
		  		<ul>
		  			<h2>CMS系统</h2>
			  		<li>
			  			<router-link to="distribution">CMS系统</router-link>
			  		</li>
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
			  	</ul>
		  	</div>
		  </div>
		  <div class="col-xs-10 rcontent">
		  	<router-view></router-view>
		  </div>
	  </div>
  </div>
</template>

<script>
require('./assets/common.css');
</script>
<style>
html,body{height: 100%;color:#666;}
#app{min-width: 1000px;}
.r-head{padding:20px;background: #42B983;color:#fff}
.rslider{font-size: 16px;height: 100%;border-right: 1px solid #eee;}
.rslider ul li a{display: block;line-height: 40px;font-size: 14px;padding:0 20px;color:#666}
.rslider ul h2{line-height: 40px;background: #f1f2f4;color:#444;padding:0 20px;}
.rcontent{padding:30px;}
</style>
