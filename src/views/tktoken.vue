<template>
  <div class="hello">
    <form class="form-horizontal">
	  <div class="form-group">
	    <label for="inputPassword3" class="col-sm-3 control-label">商品地址</label>
	    <div class="col-sm-8">
	      <input type="text" class="form-control" placeholder="商品地址" v-model="tktoken.url">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="inputPassword3" class="col-sm-3 control-label">logo地址</label>
	    <div class="col-sm-8">
	      <input type="text" class="form-control" placeholder="logo地址" v-model="tktoken.logo">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="inputPassword3" class="col-sm-3 control-label">生产淘口令的用户ID</label>
	    <div class="col-sm-8">
	      <input type="text" class="form-control" placeholder="生产淘口令的用户ID" v-model="tktoken.user_id">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="inputEmail3" class="col-sm-3 control-label">描述</label>
	    <div class="col-sm-8">
	      <textarea type="text" class="form-control" placeholder="描述" v-model="tktoken.text">
	    </div>
	  </div>
	  <div class="form-group">
	    <div class="col-sm-offset-3 col-sm-8">
	      <button type="button" class="btn btn-default" @click="gettktoken">获取淘口令</button>
	    </div>
	  </div>
	</form>
	<div class="col-sm-offset-3 col-sm-8" style="margin-top:40px">
		获取的淘口令：{{tktokendata}}
	</div>
  </div>
</template>

<script>
import {api} from "../assets/js/common"
export default {
  data () {
    return {
      tktoken:{},
      tktokendata:""
    }
  },
  methods:{
  	gettktoken:function(){
  		var self = this;
  		var _data = {
  			url:this.tktoken.url,
  			text:this.tktoken.text,
  			logo:this.tktoken.logo,
  			user_id:this.tktoken.user_id
  		}
  		this.$http.post(api+"/index.php?r=data/ctoken",_data).then((response) =>{
  			var data = JSON.parse(response.body);
  			if(data.state == 1000){
  				self.tktokendata = data.data.taoToken;
  			}
  			else{
  				alert(data.message)
  			}
  		},(response) =>{
  			
  		})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
