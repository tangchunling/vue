<template>
  <div class="hello">
    <div class="am-form-group am-form-file" id="btnwrap">
      <label type="button" class="btn btn-default">
        <i class="glyphicon glyphicon-open-file"></i> 请选择需要上传的文件
        <input type="file" id="qrcode_url" class="hide" />
      </label>（文件必须是jpg、png）
    </div>
    <div class="imgcode">
    		<img v-bind:src="imgurl" alt="" style="width: 200px; margin-top: 20px;"/>
    </div>
    <div class="form-horizontal" style="margin-top:10px">
	  <div class="form-group">
	    <label for="inputEmail3" class="col-sm-1 control-label">名字</label>
	    <div class="col-sm-6">
	      <input type="text" class="form-control" placeholder="名字" v-model="name">
	    </div>
	  </div>
	  <div class="form-group">
	    <div class="col-sm-offset-1 col-sm-10">
	      <button type="button" class="btn btn-default" @click="uploadcode">上传</button>
	    </div>
	  </div>
  </div>
    
  </div>
</template>

<script>
import {api} from '../assets/js/common';
export default {
  data () {
    return {
      uptoken: '',
      imgurl: "",
      name:""
    }
  },
  methods:{
  	upload:function(a){
  		var self = this;
  		var uploader = Qiniu.uploader({
		  runtimes: 'html5,flash,html4', //上传模式,依次退化
		  browse_button: 'qrcode_url', //上传选择的点选按钮，**必需**
		  uptoken: this.uptoken,
		  //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
		  // uptoken : '<Your upload token>',
		  //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
		  // unique_names: true,
		  // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
		  save_key: true,
		  // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
		  domain: 'http://oe3slowqt.bkt.clouddn.com/',
		  //bucket 域名，下载资源时用到，**必需**
		  container: 'btnwrap', //上传区域DOM ID，默认是browser_button的父元素，
		  max_file_size: '5mb', //最大文件体积限制
		  flash_swf_url: 'qiniu/Moxie.swf', //引入flash,相对路径
		  max_retries: 3, //上传失败最大重试次数
		  dragdrop: true, //开启可拖曳上传
		  drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
		  chunk_size: '4mb', //分块上传时，每片的体积
		  auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
		  filters: {
		    mime_types: [
		        {title : "Image files", extensions : "jpg,png"} // 限定flv后缀上传格式上传
		    ]
		  },
		  multi_selection: false,
		  init: {
		    'FileUploaded': function(up, file, info) {
		      var domain = up.getOption('domain');
		      var res = JSON.parse(info);
		      var urlImg = 'http://oe3slowqt.bkt.clouddn.com/' + res.key;
		     	console.log(urlImg);
				self.imgurl = urlImg;
		    },
		    'Error': function(up, err, errTip) {
	               //上传出错时，处理相关的事情
	               alert("上传出错，请刷新重新上传")
	        }
		  }
		});
  	},
  	getuptoken:function(){
  		var self = this;
  		this.$http.get(api+'/index.php?r=search/token').then((response) => {
  			console.log(response.body);
  			var data = JSON.parse(response.body);
  			if(data.state == 1000){
  				self.uptoken = data.data;
  				self.upload();
  			}
  			else if(data.state == 1001){
  				alert(data.message);
  			}
  		}, (response) => {
		    // error callback
		  });
  	},
  	uploadcode:function(){
  		var name = this.name;
  		var url = this.imgurl;
  		if(!url){
  			alert("请上传文件");
  			return;
  		}
  		this.$http.post(api+':8818/liebian/add_qrcode_url',{url:url,name:name}).then((response) => {
  			console.log(response.body);
  			if(response.body.code == 0){
  				alert("上传成功")
  			}
  			
  		}, (response) => {
		    // error callback
		  });
  	}
  },
  created(){
  	this.getuptoken();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
