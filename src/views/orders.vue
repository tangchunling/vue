<template>
  <div>
  	<form class="form-inline" role="form">
	  <div class="form-group">
	  	<datepicker v-model="order.orderStartTime"></datepicker>  
	  </div>
	  <div class="form-group">
	  	<datepicker v-model="order.orderEndTime"></datepicker>  
	  </div>
	  <div class="form-group">
	  	<select class="form-control" v-model="order.goodsState">
	  		  <option value="1">已结算</option>
			  <option value="2">待结算</option>
			  <option value="3">失败</option>
			  <option value="4">订单结算</option>
		</select>
	    
	  </div>
	  <button type="button" class="btn btn-default" @click='getorder'>查询</button>
	  <button type="button" class="btn btn-default" @click='upload'>下载</button>
	</form>
	<div class="ordercontent">
		<template v-if="orderdata.length">
			<table class="table table-bordered">
			   <thead>
				   	<tr>
				   		<th>编号</th><th>订单编号</th><th>下单时间</th><th width="300">商品信息</th><th>商品单价</th><th>订单状态</th><th>订单类型</th>
				   		<th>付款金额</th><th>结算金额</th><th>佣金金额</th><th>运营组</th>
				   	</tr>	
			   </thead>
			   <tbody>
			   		<template v-for="item in orderdata">
			   			<tr>
			   				<td>{{item.id}}</td><td>{{item.orderId}}</td><td>{{formate(item.createTime)}}</td><td>{{item.goodsInf}}</td><td>{{item.goodsPrice}}</td>
			   				<td v-if="item.goodsState == 1">订单成功</td><td v-if="item.goodsState == 2">待结算</td><td v-if="item.goodsState == 3">订单失败</td><td v-if="item.goodsState == 4">订单结算</td>
			   				<td>{{item.goodsType}}</td><td>{{item.payMoney}}</td><td>{{item.settlementMoney}}</td>
			   				<td>{{item.tkMoney}}</td><td>{{item.adName}}</td>
			   			</tr>
			   		</template>
			   </tbody>
			</table>
			<div class="more" @click="getmore">
				点击加载更多
			</div>
		</template>
		<h1 style="text-align: center;margin-top:100px;" v-else>暂无结果</h1>
	</div>
	<loading v-bind:class="{loadingshow:isShow}"></loading>
  </div>
</template>

<script>
import {api} from '../assets/js/common';
import loading from '../components/loading';
import datepicker from '../components/datepicker'
export default {
	components:{
		loading,datepicker
	},
  data () {
    return {
      orderdata: [],
      order:{orderStartTime:"开始日期",orderEndTime:"结束日期"},
      page:1,
      totalpage:'',
      isShow:true
    }
  },
  methods:{
  	upload:function(){
  		var _data = {
  			orderStartTime:new Date(this.order.orderStartTime).getTime(),
  			orderEndTime:new Date(this.order.orderEndTime).getTime()
  		}
  		window.location.href = "http://tym.taoyumin.cn/index.php?r=data/exceldown&orderStartTime="+_data.orderStartTime+"&orderEndTime="+_data.orderEndTime;
  	},
  	formate:function(t){
  		var d = new Date(t*1000);
  		var year = d.getFullYear();
  		var day = d.getDate();
  		var month = d.getMonth()+1;
  		var hour = d.getHours();
  		var minute = d.getMinutes();
  		var f = year + "-" +this.init(month) + "-" + this.init(day) + " " + this.init(hour) + ":" + this.init(minute);
  		return f;
  	},
  	init: function(d){
  		return d>9?d:"0"+d;
  	},
  	getorder:function(){
  		this.page = 1;
  		var _data = {
  			orderStartTime:new Date(this.order.orderStartTime).getTime(),
  			orderEndTime:new Date(this.order.orderEndTime).getTime(),
  			goodsState:this.order.goodsState,
  			page : this.page
  		}
  		this.getrequest(_data);
  	},
  	getrequest:function(_data){
  		var self = this;
  		self.isShow = false;
  		this.$http.post(api+'/index.php?r=data/excelget',_data).then((response) => {
  			self.isShow = true;
		    console.log(response.body);
		    var data = JSON.parse(response.body);
		    if(self.page == 1){
		    		self.orderdata = data.data.data;
		    		self.totalpage = data.data.totalpage;
		    }
		    else{
		    		for(var item in data.data.data){
		    			self.orderdata.push(data.data.data[item]);
		    		}
		    }
	
	  }, (response) => {
	  	self.isShow = true;
	    // error callback
	  });
	},
	getmore:function(){
		if(this.page == this.totalpage){
			alert("没有更多了")
			return;
			
		}
		this.page ++;
		var _data = {
  			orderStartTime:new Date(this.order.orderStartTime).getTime(),
  			orderEndTime:new Date(this.order.orderEndTime).getTime(),
  			goodsState:this.order.goodsState,
  			page : this.page
  		}
  		this.getrequest(_data);
	}
  	
  },
  created(){
       this.getorder();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ordercontent{margin-top: 20px;}
.loadingshow{display: none;}
</style>
