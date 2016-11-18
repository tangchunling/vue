<template>
  <div>
    <div class="form">
    	  <div class="form-group">
	    <label for="exampleInputEmail1">标题</label>
	    <select class="form-control" v-model = "activityId">
	  		  <option v-for="item in titledata" v-bind:value = "item.ID">{{item.Title}}</option>
		</select>
	  </div>
    		<table class="table table-striped" v-if="banner">
    			<thead>
    				<tr><th>图片</th><th>链接</th><th></th></tr>
    			</thead>
    			<tbody>
    				<tr v-for="item in banner">
	    				<td><img v-bind:src="item.bannerImgUrl" alt="" width="200"/></td>
	    				<td>{{item.bannerLinkUrl}}</td>
	    				<td><button type="button" class="btn btn-default" @click="deletebanner(item.bannerId)">删除</button></td>
	    			</tr>
    			</tbody>
    		</table>
    		<div v-else>暂无banner</div>
	</div>
  </div>
</template>

<script>
import {actapi} from '../../assets/js/common';
export default {
  data () {
    return {
      titledata: "",
      banner:"",
      activityId:""
    }
  },
  methods:{
  	deletebanner:function(val){
  		var self = this;
  		var is = confirm("确认删除！");
  		if(is){
  			this.$http.post(actapi+"/act/del_banner",{bannerId:val}).then((response) => {
	  			if(response.body.code == 0){
	  				alert("删除成功！");
	  				self.getbanner()
	  			}
	  			else{alert("删除失败！")}
	  		},(response) => {
	  			alert("删除失败！")
	  		})
  		}
  		
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
  	getbanner:function(){
  		var self = this;
  		this.$http.post(actapi+"/act/get_activity_header",{activityId:self.activityId}).then((response) => {
	  			if(response.body.code == 0){
	  				console.log(response.body);
	  				var data = response.body;
	  				self.banner = data.data.banner;
	  			}
	  			else{self.banner = "";}
	  		},(response) => {
	  			self.banner = "";
	  		})
  	}
  	
  },
  watch:{
  	activityId:function(val){
  		this.getbanner();
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
