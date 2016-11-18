<template>
  <div>
     <div class="form">
		  <div class="form-group">
		    <label for="exampleInputEmail1">标题</label>
		    <select class="form-control" v-model="activityId">
		  		  <option v-for="item in title" v-bind:value = "item.ID">{{item.Title}}</option>
			</select>
		  </div>
		  <div class="form-group">
		    <label for="exampleInputEmail1">分类</label>
		    <select class="form-control" v-model="navigationId">
		  		  <option v-for="item in category" v-bind:value = "item.navigationId">{{item.navigationName}}</option>
			</select>
		  </div>
		  <div class="form-group">
		    <label for="exampleInputEmail1">链接</label>
	    		<input type="text" class="form-control" placeholder="商品标题或链接" v-model="name" required>
	    		<button type="button" class="btn btn-primary" @click="searchgoods()">搜索</button> 		
		  </div>
		  <div v-if="goods!=''">
		  		<table class="table" >
		  			<thead>
		  				<tr>
		  					<th>商品名称</th><th>商品图片</th><th>价格</th><th>原价</th>
		  				</tr>
		  			</thead>
				  <tbody >
				  	<tr>
						<td v-html="goods.title"></td><td><img v-bind:src="goods.pictUrl" alt="" width="200"/></td>
						<td>{{goods.zkPrice}}</td><td>{{goods.reservePrice}}</td>
				  	</tr>
				  </tbody>
				</table>
				<div class="form-group">
				    <label for="exampleInputEmail1">推荐理由</label>
			    		<input type="text" class="form-control" placeholder="推荐理由" v-model="reason">
				
				  </div>
				<button class="btn btn-primary" @click="getyh(goods.sellerId,goods.auctionId,goods.pid)">设置优惠券</button>
				<table class="table" v-if="yhdata.length">
		  			<thead>
		  				<tr>
		  					<th></th><th>优惠券名称</th><th>优惠券有效日期</th><th>描述</th>
		  				</tr>
		  			</thead>
				  <tbody >
				  	<tr>
				  		<td><input type="radio" name="yh" v-model="yhselect1" v-bind:value="goods"/></td>
						<td>{{goods.couponInfo}}</td><td>{{goods.couponEffectiveStartTime}} - {{goods.couponEffectiveEndTime}}</td>
						<td>{{goods.couponStartFee}}</td>
				  	</tr>
				  	<tr v-for="item in yhdata">
				  		<td><input type="radio" name="yh" v-model="yhselect" v-bind:value="item"/></td>
						<td>{{item.ticketName}}</td><td>{{item.titckDate}}</td>
						<td>{{item.titckExplain}}</td>
				  	</tr>
				  </tbody>
				</table>
		  </div>
		  <div>
		  		<button class="btn btn-success" @click="submitgoods()">确认并提交</button>
		  </div>
		  <div><span>生成的链接：</span>{{acturl}}</div>
	  </div>
  </div>
</template>

<script>
import {actapi,api} from '../../assets/js/common';
export default {
  data () {
    return {
      title: [],
      category:[],
      activityId:"",
      name:"",
      goods:"",
      yhdata:[],
      yhselect:"",
      yhselect1:"",
      navigationId:"",
      acturl:"",
      reason:"",
      allgoods:"",
      pid:"",
      allyh:""
    }
  },
  methods:{
  	submitgoods:function(){
  		var self = this;
  		var _data = {
  				navigationId:this.navigationId,
  				itemList:[]
  		};
  		if(this.activityId && this.navigationId){
  			var pidyh = self.allyh[self.pid];
  			for(var item in pidyh){
  				if(pidyh[item] == self.yhselect){
  					for(var j in self.allgoods){
  						self.allgoods[j].yh = (self.allyh[(self.allgoods[j].pid)])[item];
  						
  					}
  				}
  			}
  			for(var j in self.allgoods){
  				_data.itemList.push({
						item : JSON.stringify(self.allgoods[j]),
						pid : self.allgoods[j].pid
					});
  			}
  			
  			this.goods.reason = this.reason;
  			_data = JSON.stringify(_data);
  			this.$http.post(actapi+"/act/add_activity_items",_data).then((response) => {
	  			var data = response.body;
	  			if(data.code == 0){
	  				alert("添加成功");	
	  			}
	  			else{alert("添加失败")}
	  			self.goods = '';
  				self.yhdata = [];
  				self.reason = "";
  				self.yhselect = "";
	  		},(response) => {
				alert("添加失败")
				self.goods = '';
  				self.yhdata = [];
  				self.reason = "";
  				self.yhselect = "";
	  		})
  		}
  		else{
  			alert("请填写完整信息")
  		}
  	},
  	getyh:function(sellerId,auctionId,pid){
  		var self = this;
  		var _data = {sellerId:sellerId,auctionId:auctionId};
  		this.$http.post(api+"/index.php?r=search/cmsgetticket",_data).then((response) => {
  			var data = response.body;
  			if(data.state == 1000){
  				self.yhdata = data.data[pid];
  				self.allyh = data.data;
  			}
  			else{
  				self.yhdata = [];
  				alert("没有优惠券！");
  			}
  		},(response) => {
  			self.yhdata = [];
  			alert("搜索失败！");
  		})
  	},
  	gettitle:function(){
  		var self = this;
  		this.$http.post(actapi+"/act/get_activitys").then((response) => {
  			var data = response.body;
  			if(data.code == 0){
  				self.title = data.data;
  			}
  		})
  	},
  	getcategory:function(){
  		var self = this;
  		var _data = {activityId:this.activityId};
  		_data = JSON.stringify(_data);
  		this.$http.post(actapi+"/act/get_activity_header",_data).then((response) => {
  			var data = response.body;
  			if(data.code == 0){
  				self.category = data.data.navigation;
  			}
  		})
  	},
  	searchgoods:function(){
  		var _data = {q:this.name};
  		var self = this; 
  		if(this.name.indexOf("http")>=0){
  			this.$http.post(api+"/index.php?r=search/cmssearch",_data).then((response) => {
	  			var data = response.body;
	  			if(data.state == 1000){
	  				self.goods = data.data[0];
		  			self.allgoods = data.data;
		  			self.pid = data.data[0].pid;
	  			}
	  			else{
	  				self.goods = "";
	  				alert("没有此商品数据")
	  			}
	  		})
  		}
  		else{
  			alert("请输入合法链接")
  		}	
  	}
  },
  watch:{
  	activityId:function(val){
  		if(val){
  			this.acturl = "http://cms.duobb.cn/?activityId="+this.activityId
  			this.getcategory()
  		}
  	}
  },
  created(){
  	this.gettitle();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
.form-group>label{margin-bottom: 10px;}
.form input,.form select{max-width: 600px;}
.form button{margin: 10px;}
</style>
