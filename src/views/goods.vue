<template>
  <div>
    <div class="form-inline">
	    	
	  <div class="form-group">     
		   <input class="span2 form-control" type="search" v-model="goods.goodsname" placeholder="商品名称" style="width:400px" v-on:keyup.enter="getgoods">	      
	  </div>
	  
	  <button type="button" class="btn btn-default" @click='getgoods'>查询</button>
	 <!-- <button type="button" class="btn btn-default" id="pickfiles">上传</button>-->
	  <!--<input type="file" id="pickfiles" class="hide" name="pickfiles"/>-->
	</div>
	<div class="goodstag">
    		<label for="">主题：</label>
    		<span v-for="item in tagnames" @click="selected(item.tagname,item.name)" v-bind:class="{active: activeName == item.tagname}">{{item.tagname}}</span>
    	</div>
    	<div class="goodsort">
		<form class="form-inline">
			
			<ul>
				<label for="">筛选：</label><li v-for="item in sortarray" @click="sortselected(item.name,item.type)" v-bind:class="{active: sortName == item.name}">{{item.name}}</li>
			</ul>
		</form>
	</div>
	<div class="goodscontent">
		<template v-if="goodsdata.length">
			<table class="table table-bordered">
			   <thead>
				   	<tr>
				   		<th width="80">淘宝店名</th><th width="200">商品名称</th><th>商品图片</th><th>商品原价格</th><th>促销价</th><th>商品销量</th>
				   		<th>用户返回佣金</th><th>佣金比例</th><th>淘口令</th><th width="80">短地址</th><th width="80">二维码</th><th width="80">优惠券名称</th><th>优惠券口令</th><th>优惠券开始时间</th><th>优惠券结束时间</th>
			   		</tr>
			   </thead>
			   <!--<tbody>-->
			   	<tbody v-for="item in goodsdata">
				   	<tr>
				   		<td><a v-bind:href="item.auctionUrl" target="_blank">{{item.shopTitle}}</a></td><td><a v-html='item.title' v-bind:href="item.shortLinkUrl" target="_blank"></a></td><td><img v-bind:src="item.pictUrl" alt="" /></td>
				   		<td>{{item.reservePrice}}</td><td>{{item.zkPrice}}</td><td>{{item.biz30day}}</td><td>{{item.tkCommFee}}</td><td>{{(item.tkCommFee/item.zkPrice).toFixed(2)}}</td><td>{{item.taoToken}}</td>
				   		<td><p><a v-bind:href="item.shortLinkUrl" target="_blank">{{item.shortLinkUrl}}</a></p></td><td><img v-bind:src="item.qrCodeUrl"></td><td><p><a v-bind:href="item.couponLink" target="_blank">{{item.couponInfo}}</a></p></td><td>{{item.couponLinkTaoToken}}</td>
				   		<td>{{item.couponEffectiveStartTime}}</td><td>{{item.couponEffectiveEndTime}}</td>
				   	</tr>
				   	<tr>
				   		<td class="moban" style="width:100%;color:#E23030" colspan="14">
				   			<p>商品：<span v-html="item.title"></span></p>
				   			<p>原价：{{item.reservePrice}}元,优惠券{{item.couponInfo}}</p>
				   			<p>促销价: {{item.zkPrice}}元</p>
				   			<p>领券后只需：</p>
				   			<p>下单地址: 复制这条信息，打开→手机淘宝→即可看到商品<span v-if="item.couponLinkTaoToken">{{item.couponLinkTaoToken}}</span> <span v-else>{{item.taoToken}}</span> </p>
				   			<p>---------------------------</p>
				   			<p>1、不会购买的问群主</p>
				   			<p>2、想买其他的问群主</p>
				   			<p>3、邀请15人进群可私聊群主获取精美礼品一份</p>
				   		</td>
				   	</tr>
				   	<tr>
				   		<td class="moban" style="width:100%" colspan="14">
				   			<button type="button" class="btn btn-success" @click="getyouhui(item.sellerId,item.auctionId)">点击搜索商品的隐藏店铺券</button>
				   		</td>
				   	</tr>
				   	<template v-if="item.sellerId == sellerId" >
				   		<template v-if="youhuidata.length">
				   			<tr v-for="list in youhuidata">
					   			<td class="moban" style="width:100%;color:#5454E6" colspan="14">
					   				<p><a v-bind:href="item.url">优惠券名称:{{list.ticketName}}</a></p>
					   				<p>总数:{{list.rest}}</p>
					   				<p>剩余:{{list.count}}</p>
					   				<p>说明:{{list.titckExplain}}</p>
					   				<p>有效期说明:{{list.titckDate}}</p>
					   				<p>淘口令:{{list.taoToken}}</p>
					   				<p>地址:{{list.url}}</p>
					   			</td>
						   	</tr>
				   		</template>
				   		<template v-else>
					   		<tr>
					   			<td class="moban" style="width:100%;color:#5454E6" colspan="14">
					   				暂无隐藏店铺优惠券
					   			</td>
					   		</tr>
				   		</template>
				   	</template>
			   	</tbody>
			   <!--</tbody>-->
			</table>
			<div @click = 'getmoregoods' class="more">点击加载更多</div>
		</template>
		<h1 style="text-align: center;margin-top:100px;" v-else>暂无结果</h1>
	</div>
	<loading v-bind:class="{loadingshow:isShow}"></loading>
  </div>
</template>
<script>
import {api} from '../assets/js/common';
import loading from '../components/loading'

export default {
	components: {
    loading
 },
  data () {
    return {
      goods:{},
      goodsdata:[],
      page:1,
      tagnames:[
      {tagname:"全部",name:""},
      {
      	tagname:"高佣活动",name:"Gaoyon"},
      	{tagname:"女装尖货",name:"Nzjh"},
      	{tagname:"母婴热推",name:"Muying"},
      	{tagname:"超值9块9",name:"Channel9k9"},
      	{tagname:"20元封顶",name:"Channel20k"},
      	{tagname:"特价好货",name:"Tehui"}
      ],
      activeName:"",
      sortName:"",
      totalpage:'',
      theme:"",
      sortarray:[
      	{name:"价格从高到低",type:3},
      	{name:"价格从低到高",type:4},
      	{name:"销量",type:9},
      	{name:"收入比例",type:1},
      	{name:"月推广",type:5},
      	{name:"支出佣金",type:7},
      	{name:"活动开始时间从近到远",type:13},
      	{name:"活动剩余时间从长到短",type:11},
      	{name:"活动剩余时间从短到长",type:12}
      ],
      sortType:"",
      isShow:true,
      sellerId:"",
      youhuidata:[]
    }
  },
  methods:{
  	getRequest:function(_data){
  		this.isShow = false;
  		var self = this;
  		this.$http.post(api+'/index.php?r=search/search',_data).then((response) => {
  				var data = JSON.parse(response.body);
  				self.isShow = true;
				if(data.state == 1000){
					if(self.page == 1){
						self.goodsdata=data.data.data;
						self.totalpage = data.data.totalpage;
					}
					else{
						for(var item in data.data.data){
							self.goodsdata.push(data.data.data[item]);
						}
					}				
				}
				else if(data.state == 1001)
			    {
			    		self.goodsdata = [];
			    }
		
		  }, (response) => {
		  	self.isShow = true;
		    // error callback
		  });
  		
  	},
  	getgoods:function(){
  		var self = this;
  		this.page = 1;
  		this.sortName = "";
  		this.sortType = "";
  		var _data = {
  			q:this.goods.goodsname,
  			page:this.page,
  			theme: this.theme
  		};
  		this.getRequest(_data);
  	},
  	getmoregoods:function(){
  		if(this.page == this.totalpage){
  			alert("没有更多了");
  			return;
  		}
  		this.page++;
  		var self = this;
  		var _data = {
  			q:this.goods.goodsname,
  			page:this.page,
  			theme: this.theme,
  			sortType:this.sortType
  		};
  		this.getRequest(_data);
  	},
  	selected:function(tagname,name){
  		this.activeName=tagname;
  		this.theme = name;
		this.page = 1;
		var _data = {
			page:this.page,
			theme: this.theme,
			q:this.goods.goodsname
		}
		this.getRequest(_data)
  	},
  	sortselected:function(name,type){
  		this.sortName = name;
  		this.sortType = type;
  		this.page = 1;
  		var _data = {
  			q:this.goods.goodsname,
  			page:this.page,
  			theme: this.theme,
  			sortType:this.sortType
  		}
  		this.getRequest(_data)
  	},
  	getyouhui:function(sellerId,auctionId){
  		var self = this;
  		this.sellerId = sellerId;
  		this.$http.post(api+'/index.php?r=search/getticket',{sellerId:sellerId,auctionId:auctionId}).then((response) => {
  				var data = JSON.parse(response.body);
				if(data.state == 1000){
					self.youhuidata = data.data;
				}
				else{
					self.youhuidata = [];
				}
		  }, (response) => {
		    // error callback
		  });
  	}
  },
  created(){
  	this.getgoods();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th,td{max-width: 200px;white-space: normal;word-wrap: break-word;min-width: 80px;}
h1 {
  color: #42b983;
}
.moban{width:auto !important;}
.moban p{width:auto;}
.loadingshow{display: none;}
.active{color: #E80C39;border-color: #E80C39 !important;}
.goodscontent{margin-top:20px;}
.goodscontent table td img{width:120px;}
.goodstag{margin-top: 20px;}
.goodstag span{display: inline-block;padding:4px 6px;cursor:pointer;border-radius: 4px;border:1px solid #eee;font-size: 14px;margin:10px;}
.goodsort{margin-top: 10px;}
.goodsort ul li{display: inline-block;padding:4px 10px;font-size: 14px;cursor: pointer;margin-bottom: 10px;}
</style>
