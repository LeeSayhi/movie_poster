		// 3、通用函数，用来获取元素
		function g(selector) {
			var method = selector.substr(0,1) == '.' ? 'getElementsByClassName' : 'getElementById';
			return document[method](selector.substr(1));
		}

		// 随机生成值 range为一个数组 random(range[min,max])
		function random(range) {
			
			var max = Math.max(range[0], range[1]);
			var min = Math.min(range[0], range[1]);
			var diff = max - min;
	
			var number = Math.ceil((Math.random()*diff + min));
			return number; 
		}

		// 4、输出所有电影海报
		var data = data;
		function addPhoto() {
			// 获取全部字符串，
			var template = g('#wrap').innerHTML;
			var html = [];
			// 遍历data数组，替换相应的字符串为应该显示的内容
			for (var i = 0; i < data.length; i++) {
				var _html = template
								.replace('{{index}}', i)
								.replace('{{img}}', data[i].img)
								.replace('{{caption}}', data[i].caption)
								.replace('{{desc}}', data[i].desc);
				// 将替换过的字符串添加到 html 数组中
				html.push( _html );
			}	
			g('#wrap').innerHTML = html.join('');

			rsort(random([0,data.length]));
		}
		addPhoto();

		// 5、排序海报
		function rsort(n) {
			var photo_center = g('#photo-' + n);
			photo_center.className += ' photo-center';
		}


		// 1、翻面控制
		function turn (elem) {
			var cls = elem.className;
			if (/photo-front/.test(cls)) {
				cls = cls.replace(/photo-front/,'photo-back');
			}
			else{
				cls = cls.replace(/photo-back/,'photo-front');
			}
			return elem.className = cls;
		}