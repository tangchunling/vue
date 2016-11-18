<template>
  <div>
    <div class="form">
    		<table class="table table-striped" v-if="titledata">
    			<thead>
    				<tr><th>标题</th><th></th><th></th></tr>
    			</thead>
    			<tbody>
    				<tr v-for="item in titledata">
	    				<td>{{item.Title}}</td>
	    				<td><button type="button" class="btn btn-default" @click="deletetitle(item.ID)">删除</button></td>
	    				<td><button type="button" class="btn btn-default" @click="update(item)">修改</button></td>
	    			</tr>
    			</tbody>
    		</table>
	</div>
	<div class="mask" v-if="isshow">
		<div class="maskcontent">
			<div class="form-group">
			    <label for="exampleInputEmail1">{{title.Title}}</label>
			    <input type="text" class="form-control" placeholder="标题" v-model="Title" required>
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
      title:"",
      isshow:false,
      Title:""
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
  			this.$http.post(actapi+"/act/del_activity",{activityId:val}).then((response) => {
	  			if(response.body.code == 0){
	  				alert("删除成功！");
	  				self.gettitle()
	  			}
	  			else{alert("删除失败！")}
	  		},(response) => {
	  			alert("删除失败！")
	  		})
  		}
  		
  	},
  	updatetitle:function(){
  		var _data = {title:this.Title,activityId:this.title.ID};
		_data = JSON.stringify(_data);
		var self = this;
		if(this.Title == ""){
			alert("请输入标题");
			return false;
		}
		this.$http.post(actapi+"/act/update_activity",_data).then((response) => {
	  			if(response.body.code == 0){
	  				alert("提交成功！");
	  				self.isshow = false;
	  				self.Title = "";
	  				self.gettitle();
	  			}
	  		},(response) => {
	  			
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
