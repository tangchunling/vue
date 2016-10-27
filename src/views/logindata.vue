<template>
  <div>
    <form class="form-horizontal">
	  <div class="form-group">
	    <label for="inputEmail3" class="col-sm-2 control-label">cookies</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" placeholder="cookies" v-model="logindata.cookies">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="inputPassword3" class="col-sm-2 control-label">淘口令</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" placeholder="淘口令" v-model="logindata.tbToken">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="inputPassword3" class="col-sm-2 control-label">Siteid</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" placeholder="Siteid" v-model="logindata.Siteid">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="inputPassword3" class="col-sm-2 control-label">Adzoneid</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" placeholder="Adzoneid" v-model="logindata.Adzoneid">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="inputPassword3" class="col-sm-2 control-label">TKZSCookiess</label>
	    <div class="col-sm-10">
	      <input type="text" class="form-control" placeholder="TKZSCookiess" v-model="logindata.TKZSCookiess">
	    </div>
	  </div>
	  <div class="form-group">
	    <div class="col-sm-offset-2 col-sm-10">
	      <button type="button" class="btn btn-default" @click="getlogindata">添加</button>
	    </div>
	  </div>
	</form>
  </div>
</template>

<script>
import {api} from '../assets/js/common';
export default {
  data () {
    return {
      logindata: {}
    }
  },
  methods:{
  	getlogindata:function(){
  		var self = this;
  		var _data = {
  			cookies:self.logindata.cookies,
  			tbToken:self.logindata.tbToken,
  			Siteid:self.logindata.Siteid,
  			Adzoneid:self.logindata.Adzoneid,
  			TKZSCookiess:self.logindata.TKZSCookiess
  		}
  		
  		this.$http.post(api+'/index.php?r=search/setdata',_data).then((response) => {

	    console.log(response.body);
	    
	    alert("添加成功！")
	
	  }, (response) => {
	    // error callback
	  });
  	}
  	
  },
  created(){
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
