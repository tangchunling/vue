export const api = "http://tym.taoyumin.cn";
export const islogin = function (callback) {
	var is = false;
	var xhr = function () {
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else {
			return new ActiveObject('Micrsorf.XMLHttp');
		}
	}();

	xhr.onreadystatechange = function () {
		if(xhr.readyState != 4){
			return false;
		}
		if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			var data = JSON.parse(xhr.responseText);
			if (data.state == 1000) {
				is = true;
				callback(is);
			}
		} else {
			console.log('error:' + xhr.status);
		}		
		// if (xhr.readyState == 4) {
		// 	if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
		// 		var data = JSON.parse(xhr.responseText);
		// 		if (data.state == 1000) {
		// 			is = true;
		// 		}
		// 	} else {
		// 		console.log('error:' + xhr.status);
		// 	}
		// }
	}
	//xhr.open('get', 'http://tym.taoyumin.cn/index.php?r=user/checklogin', false);
	xhr.open('get', 'http://tym.taoyumin.cn/index.php?r=user/checklogin', true);
	xhr.withCredentials = true;
	xhr.send(null);
	//return is;
}