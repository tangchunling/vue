<template>
  <div class="login">
    <div>
	  <div class="form-group">
	    <label for="exampleInputEmail1">用户名</label>
	    <input type="text" class="form-control" placeholder="用户名" v-model="name" required>
	  </div>
	  <div class="form-group">
	    <label for="exampleInputPassword1">密码</label>
	    <input type="password" class="form-control" placeholder="密码" v-model="password" required>
	  </div>
	  <button type="submit" class="btn btn-default" @click="getlogin()">登录</button>
	</div>
  </div>
</template>

<script>
import {api} from '../assets/js/common';
export default {
  data () {
    return {
     name:"",
     password:""
    }
  },
  methods:{
  	getlogin:function(){
  		if(this.name && this.password){
  			var _data = {userName:this.name,passWord:this.password};
  			var self = this;
	  		this.$http.post(api+"/index.php?r=user/login",_data,{credentials: true}).then((response) => {
	  			console.log(response.body);
	  			if(response.body.state == 1000){
	  				self.$router.push('/goods')
	  			}
	  		},(response) => {
	  			
	  		})
  		}
  		else{
  			alert("用户名或密码必须填写")
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width:400px;
}
label{margin-bottom: 10px;}
</style>
