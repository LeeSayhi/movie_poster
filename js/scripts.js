		// 获取所需元素
		function g(selector) {
			var method = selector.substr(0,1) == '.' ? 'getElementsByClassName' : 'getElementById';
			return document[method](selector.substr(1));
		}

		// 随机生成值  random(range[min,max])
		function random(range) {
			
			var max = Math.max(range[0], range[1]);
			var min = Math.min(range[0], range[1]);
			var diff = max - min;
	
			var number = Math.ceil((Math.random()*diff + min));
			return number; 
		}

		// 2、输出所有电影海报
		var data = data;
		function addPhoto() {
			var template = g('#wrap').innerHTML;
			var html = [];  
			var nav = [];  // 按钮
			// 遍历data数组，替换相应的字符串为应该显示的内容
			for (var i = 0; i < data.length; i++) {
				var _html = template
								.replace('{{index}}', i)
								.replace('{{img}}', data[i].img)
								.replace('{{caption}}', data[i].caption)
								.replace('{{desc}}', data[i].desc);
				// 将替换过的字符串添加到 html 数组中
				html.push( _html );
				nav.push('<span class="s" id="nav_'+i+'" onclick="turn(g(\'#photo-'+i+'\'))">&nbsp；</span>');
			}	
			html.push('<div class="nav">'+nav.join("")+'</div>');
			g('#wrap').innerHTML = html.join('');

			rsort(random([0,data.length]));
		}
		addPhoto();

		// 4、计算左右分区的范围
		function range() {
			var range = { 
				left: { x:[], y:[] } , 
				right: { x:[] , y:[] } 
			}
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

			range.left.x=[0-photo.w/4,wrap.w/2-photo.w/2-photo.w];
			range.left.y=[0-photo.h/4,wrap.h-photo.h/4];

			range.right.x=[wrap.w/2+photo.w*1.5,wrap.w-photo.w/4];
			range.right.y=range.left.y;

			return range;
		}

		// 3、排序海报
		function rsort(n) {
			var _photo = g('.photo');
			var photos = [];   // 所有海报
			var navs = g('.s'); // 所有控制按钮

			for (var i = 0; i < _photo.length; i++) {
				_photo[i].className = _photo[i].className.replace(/\s*photo-center\s*/, '')
														 .replace(/\s*photo-front\s*/, '')
														 .replace(/\s*photo-back\s*/, '');
				_photo[i].className += ' photo-front';

				_photo[i].style.left = '';
				_photo[i].style.top = '';
				_photo[i].style['-webkit-transform'] = _photo[i].style['transform'] = 'rotate(360deg) scale(1.3)';

				photos.push(_photo[i]);  
			}
			var photo_center = g('#photo-' + n);
			photo_center.className += ' photo-center ';
			photo_center = photos.splice(n,1)[0];
			
			// 海报分区 左右两部分
			var photo_left = photos.splice(0, Math.ceil(photos.length/2));
			var photo_right = photos;
			var ranges = range();

			for(i in photo_left) {
				var photo = photo_left[i];
				photo.style.left = random(ranges.left.x)+'px';
				photo.style.top = random(ranges.left.y)+'px';

				photo.style['-webkit-transform'] = photo.style['transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
			}
			for(i in photo_right) {
				var photo = photo_right[i];
				photo.style.left = random(ranges.right.x)+'px';
				photo.style.top = random(ranges.right.y)+'px';

				photo.style['-webkit-transform'] = photo.style['transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
			}

			// 控制按钮
			for (var i = 0; i < navs.length; i++) {
				navs[i].className = navs[i].className.replace(/\s*s_current\s*/, '');
				navs[i].className = navs[i].className.replace(/\s*s_back\s*/, '');

			}
			g('#nav_'+n).className += ' s_current ';   
		}


		// 1、翻转控制
		function turn (elem) {
			var cls = elem.className;
			var n = elem.id.split('-')[1];

			if (!/photo-center/.test(cls)) {
				return rsort(n);
			}

			if (/photo-front/.test(cls)) {
				cls = cls.replace(/photo-front/,'photo-back');
				g('#nav_'+n).className += 's_back';
			}
			else{
				cls = cls.replace(/photo-back/,'photo-front');
				g('#nav_'+n).className = g('#nav_'+n).className.replace(/\s*s_back\s*/, ' ');
			}
			return elem.className = cls;
		}
