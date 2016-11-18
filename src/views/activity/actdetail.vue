<template>
  <div>
    <div class="form">
	  <div class="form-group">
	    <label for="exampleInputEmail1">标题</label>
	    <select class="form-control" v-model = "act.activityId">
	  		  <option v-for="item in title" v-bind:value = "item.ID">{{item.Title}}</option>
		</select>
	  </div>
	  <div class="form-group">
	    <label for="exampleInputPassword1">分类</label>
	    <input type="text" class="form-control" placeholder="分类" v-model="categorydata" required>
	    <input type="text" class="form-control" placeholder="权重" v-model="navigationWeight" style="margin:10px 0">
	    <div class="form-group">
		  	<div class="input-append date" id="datetimepicker" data-date-format="yyyy-mm-dd hh:ii" v-focus>
			    <input class="span2 form-control" size="16" type="text"  placeholder="分类活动开始时间" v-model="navigationStartTime">
			    <span class="add-on"><i class="icon-calendar"></i></span>
			</div> 
		  </div>
	    <button type="button" class="btn btn-primary" @click="submitcategory()">确定</button>
	    <div v-if="act.navigation.length" class="category">
	    		<ul>
	    			<li v-for="item in act.navigation"><span>{{item.navigationName}}</span><label @click="closecategory(item)">×</label></li>
	    		</ul>
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="exampleInputPassword1">banner链接</label>
	    <input type="text" class="form-control" placeholder="banner链接" v-model="bannerLinkUrl" required>
	  </div>
	  <div class="am-form-group am-form-file" id="btnwrap">
      <label type="button" class="btn btn-default">
        <i class="glyphicon glyphicon-open-file"></i> 请选择需要上传的图片
        <input type="file" id="qrcode_url" class="hide" />
      </label>（文件必须是jpg、png）
      <div><img v-bind:src="imgurl" alt="" width="200"/></div>
    </div>
	  <button type="submit" class="btn btn-primary" @click="submitbanner()">确定</button>
	  <div>
	  		<table class="table" v-if="act.banner.length">
			  <tbody>
			  	<tr v-for="item in act.banner">
			  		<td>{{item.bannerLinkUrl}}</td><td><img v-bind:src="item.bannerImgUrl" alt="" width="100"/></td><td><button class="btn btn-default" @click="closebanner(item)">删除</button></td>
			  	</tr>
			  </tbody>
			</table>
	  </div>
	  <div>
	  		<button class="btn btn-success" @click="submitinfo()">确认并提交</button>
	  </div>
	</div>
  </div>
</template>

<script>
import {actapi,api} from '../../assets/js/common';
export default {
  data () {
    return {
      title: [],
      categorydata:"",
      bannerLinkUrl:"",
      act:{
      	activityId:"",
      	navigation:[],
      	banner:[]
      },
      imgurl:"",
      navigationStartTime:"",
      navigationWeight:""
    }
  },
  methods:{
  	closecategory:function(val){
  		this.act.navigation.splice(this.act.navigation.indexOf(val),1)
  	},
  	closebanner:function(val){
  		this.act.banner.splice(this.act.banner.indexOf(val),1)
  	},
  	submitcategory:function(){
		this.navigationStartTime = $("#datetimepicker input").val();
  		if(this.categorydata){
  			var data = {
  				navigationName:this.categorydata,
  				navigationWeight:this.navigationWeight || 0,
  				navigationStartTime:this.navigationStartTime?(new Date(this.navigationStartTime).getTime()) : 0
  			}
  			this.act.navigation.push(data)
  		}
  	},
  	submitbanner:function(){
  		var data = {
  			bannerImgUrl:this.imgurl,
  			bannerLinkUrl:this.bannerLinkUrl
  		};
  		this.act.banner.push(data)
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
  	submitinfo:function(){
  		
  		if(this.act.activityId){
  			console.log(this.act)
  			var self = this;
	  		this.$http.post(actapi+'/act/add_activity_header',this.act).then((response) => {
	  			console.log(response.body);
	  			var data = response.body;
	  			if(data.code == 0){
	  				self.$router.push('/actgoods');
	  			}
	  		}, (response) => {
			    // error callback
			  });
  		}
  		else{
  			alert("请填写完整信息")
  		}
  	},
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
  	}
  },
	directives: {
	  focus: {
	    inserted:function(el){
	    		$("#datetimepicker").datetimepicker();
	    }
	  }
	},
  created(){
  	this.gettitle();
  	this.getuptoken();
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
.category ul li{display: inline-block;padding:10px;}
.category ul li label{display: inline-block;border:1px solid #eee;padding:2px;margin-left: 4px;border-radius: 100%;}
</style>
