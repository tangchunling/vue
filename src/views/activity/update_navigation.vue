<template>
  <div>
    <div class="form">
    	  <div class="form-group">
	    <label for="exampleInputEmail1">标题</label>
	    <select class="form-control" v-model = "activityId">
	  		  <option v-for="item in titledata" v-bind:value = "item.ID">{{item.Title}}</option>
		</select>
	  </div>
    		<table class="table table-striped" v-if="navigation">
    			<thead>
    				<tr><th>分类</th><th></th><th></th></tr>
    			</thead>
    			<tbody>
    				<tr v-for="item in navigation">
	    				<td>{{item.navigationName}}</td>
	    				<td><button type="button" class="btn btn-default" @click="deletetitle(item.navigationId)">删除</button></td>
	    				<td><button type="button" class="btn btn-default" @click="update(item)">修改</button></td>
	    			</tr>
    			</tbody>
    		</table>
    		<div v-else>暂无分类</div>
	</div>
	<div class="mask" v-if="isshow">
		<div class="maskcontent">
			<div class="form-group">
			    <label for="exampleInputEmail1">{{title.navigationName}}</label>
			    <input type="text" class="form-control" placeholder="标题" v-model="Title" required>
		 	</div>
		 	<div class="form-group">
			    <label for="exampleInputEmail1">权重</label>
			    <input type="number" class="form-control" placeholder="权重" v-model="weight" required>
		 	</div>
		 	<div>
		 		<button type="button" class="btn btn-default" @click="updatetitle()">确定</button>
		 		<button type="button" class="btn btn-default" @click="close()">取消</button>
		 	</div>
		</div>
	</div>
  </div>
</template>

<script>
import {actapi} from '../../assets/js/common';
export default {
  data () {
    return {
      titledata: "",
      navigation:"",
      title:"",
      isshow:false,
      Title:"",
      activityId:"",
      weight:""
    }
  },
  methods:{
  	update:function(val){
  		this.title = val;
  		this.isshow = true;
  	},
  	close:function(){
  		this.isshow = false;
  	},
  	deletetitle:function(val){
  		var self = this;
  		var is = confirm("确认删除！");
  		if(is){
  			this.$http.post(actapi+"/act/del_navigation",{navigationId:val}).then((response) => {
	  			if(response.body.code == 0){
	  				alert("删除成功！");
	  				self.getnavigation()
	  			}
	  			else{alert("删除失败！")}
	  		},(response) => {
	  			alert("删除失败！")
	  		})
  		}
  		
  	},
  	updatetitle:function(){
  		var _data = {navigation:this.Title,navigationId:this.title.navigationId,weight:this.weight};
//		_data = JSON.stringify(_data);
		var self = this;
		if(this.Title == "" || this.weight == ""){
			alert("请填入完整信息");
			return false;
		}
		this.$http.post(actapi+"/act/update_navigation",_data).then((response) => {
	  			if(response.body.code == 0){
	  				alert("提交成功！");
	  				self.isshow = false;
	  				self.Title = "";
	  				self.weight = "";
	  				self.getnavigation();
	  			}
	  			else{alert("提交失败！");}
	  		},(response) => {
	  			alert("提交失败！");
	  		})
  		
  	},
  	gettitle:function(){
  		var self = this;
  		this.$http.post(actapi+"/act/get_activitys").then((response) => {
  			var data = response.body;
  			if(data.code == 0){
  				self.titledata = data.data;
  			}
  		})
  	},
  	getnavigation:function(){
  		var self = this;
  		this.$http.post(actapi+"/act/get_activity_header",{activityId:self.activityId}).then((response) => {
	  			if(response.body.code == 0){
	  				console.log(response.body);
	  				var data = response.body;
	  				self.navigation = data.data.navigation;
	  			}
	  		},(response) => {
	  			
	  		})
  	}
  	
  },
  watch:{
  	activityId:function(val){
  		this.getnavigation();
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
.mask{position: fixed;left:0;right:0;top: 0;bottom: 0;background: rgba(0,0,0,0.6);z-index: 22;}
.maskcontent{width: 400px;background: #fff;padding:20px;margin: 200px auto;}
</style>
