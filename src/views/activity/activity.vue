<template>
  <div>
    <div class="form">
	  <div class="form-group">
	    <label for="exampleInputEmail1">标题</label>
	    <input type="text" class="form-control" placeholder="标题" v-model="title" required>
	  </div>
	  <button type="button" class="btn btn-default" @click="submittitle()">提交</button>
	  
	</div>
  </div>
</template>

<script>
import {actapi} from '../../assets/js/common';
export default {
  data () {
    return {
      title: ""
    }
  },
  methods:{
  	submittitle:function(){
  		var _data = {title:this.title};
		_data = JSON.stringify(_data);
		var self = this;
		if(this.title == ""){
			alert("请输入标题");
			return false;
		}
		this.$http.post(actapi+"/act/add_activity",_data).then((response) => {
	  			if(response.body.code == 0){
	  				alert("提交成功！");
	  				self.$router.push('/actdetail');
	  			}
	  		},(response) => {
	  			
	  		})
  		
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
.form-group>label{margin-bottom: 10px;}
.form input,.form select{max-width: 600px;}
</style>
