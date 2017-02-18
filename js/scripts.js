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

		// 6、计算左右分区的范围
		function range() {
			var range = { left:{ x:[], y:[] } , right:{ x:[] , y:[] } };

			var wrap = {
				w: g('#wrap').clientWidth,
				h: g('#wrap').clientHeight
			}
			var photo = {
				w: g('.photo')[0].clientWidth,
				h: g('.photo')[0].clientHeight
			}

			range.wrap = wrap;
			range.photo = photo;

			range.left.x = [ 0-photo.w, wrap.w/2-photo.w/2 ];
			range.left.y = [ 0-photo.h, wrap.h];

			range.right.x = [ wrap.w/2+photo.w/2, wrap.w+photo.w ];
			range.right.y = range.left.y;

			return range;
		}

		// 5、排序海报
		function rsort(n) {
			var _photo = g('.photo');
			var photos = [];   // 所有海报

			for (var i = 0; i < _photo.length; i++) {
				_photo[i].className = _photo[i].className.replace(/\s*photo-center\s*/, '')
				photos.push(_photo[i]);  
			}

			var photo_center = g('#photo-' + n);
			photo_center.className += ' photo-center';
			photo_center = photos.splice(n,1)[0];
			
			// 海报分区 左右两部分
			var photo_left = photos.splice(0, Math.ceil(photos.length/2));
			var photo_right = photos;
			var ranges = range();

			for(i in photo_left) {
				var photo = photo_left[i];
				photo.style.left = random(ranges.left.x)+'px';
				photo.style.top = random(ranges.left.y)+'px';

				photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg)';
			}
			for(i in photo_right) {
				var photo = photo_right[i];
				photo.style.left = random(ranges.right.x)+'px';
				photo.style.top = random(ranges.right.y)+'px';

				photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg)';
			}
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