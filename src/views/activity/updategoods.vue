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
		    <label for="exampleInputEmail1">公司名称</label>
		    <select class="form-control" v-model="pid">
		  		  <option v-for="item in piddata" v-bind:value = "item.Pid">{{item.name}}</option>
			</select>
		  </div>
		  <table class="table table-striped" v-if="goods">
    			<thead>
  				<tr>
  					<th>商品名称</th><th>商品图片</th><th>价格</th><th>原价</th><th></th>
  				</tr>
  			</thead>
		  <tbody >
		  	<tr v-for="item in goods">
				<td v-html="JSON.parse(item.Item).title"></td><td><img v-bind:src="JSON.parse(item.Item).pictUrl" alt="" width="200"/></td>
				<td>{{JSON.parse(item.Item).zkPrice}}</td><td>{{JSON.parse(item.Item).reservePrice}}</td>
				<td><button type="button" class="btn btn-default" @click="deletegoods(item.ID)">删除</button></td>
		  	</tr>
		  </tbody>
    		</table>
    		<div v-else>暂无此分类商品数据</div>
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
      goods:"",
      navigationId:"",
      piddata:"",
      pid:""
    }
  },
  methods:{
  	deletegoods:function(val){
  		var self = this;
  		var is = confirm("确认删除！");
  		if(is){
  			this.$http.post(actapi+"/act/del_item",{itemId:val}).then((response) => {
	  			var data = response.body;
	  			if(data.code == 0){
	  				alert("删除成功！");
	  				self.getgoods();
	  			}
	  			else{
	  				alert("删除失败！");
	  			}
	  		},(response) => {alert("删除失败！");})
  		}
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
  			console.log(data)
  			if(data.code == 0){
  				self.category = data.data.navigation;
  			}
  		})
  	},
  	getgoods:function(){
  		var self = this;
  		this.$http.post(actapi+"/act/get_activity_items",{navigationId:this.navigationId,taobaoPid:this.pid}).then((response) => {
  			var data = response.body;
  			console.log(data)
  			if(data.code == 0){
  				if(data.data.List){
  					self.goods = data.data.List;
  				}
  				else{self.goods = "";}
  			}
  			else{self.goods = "";}
  		},(response) => {self.goods = "";})
  	},
  	getpid:function(){
  		var self = this;
  		this.$http.get(api+"/index.php?r=search/pidlist").then((response) => {
  			var data = response.body;
  			console.log(data)
  			if(data.state == 1000){
  				self.piddata = data.data;
  			}
  		})
  	}
  },
  watch:{
  	activityId:function(val){
  		if(val){
  			this.acturl = "http://cms.duobb.cn/?activityId="+this.activityId
  			this.getcategory()
  		}
  	},
  	navigationId: function(val){
  		if(val){
  			this.getpid();
  		}
  	},
  	pid: function(val){
  		if(val){
  			this.getgoods();
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
