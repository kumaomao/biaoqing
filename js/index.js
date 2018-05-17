	$(document).ready( function() {

			

            $('.demo').each( function() {

                //

                // Dear reader, it's actually very easy to initialize MiniColors. For example:

                //

                //  $(selector).minicolors();

                //

                // The way I've done it below is just for the demo, so don't get confused 

                // by it. Also, data- attributes aren't supported at this time. Again, 

                // they're only used for the purposes of this demo.

                //

				$(this).minicolors({

					control: $(this).attr('data-control') || 'hue',

					defaultValue: $(this).attr('data-defaultValue') || '',

					inline: $(this).attr('data-inline') === 'true',

					letterCase: $(this).attr('data-letterCase') || 'lowercase',

					opacity: $(this).attr('data-opacity'),

					position: $(this).attr('data-position') || 'bottom left',

					change: function(hex, opacity) {

						var log;

						try {

							log = hex ? hex : 'transparent';

							if( opacity ) log += ', ' + opacity;

							console.log(log);

						} catch(e) {}

					},

					theme: 'default'

				});

                

            });

			

		});


var vue = new Vue({
	el: '#app',
	data: {
		msgImg: '',
		msg:'',
		Url:'http://localhost/admin/public',
		imgUrl:'./images/1.jpg',
		isTrue:false,
		imgWidth:'',
		imgHeight:'',
		startX:'',
		startY:'',
		msgWidth:'',
		msgHeight:'',
		_el:'',
		size:10,
		nature:'',
		face:0,
		preline:'pre-line',
		color:'',
		background:'',
		imgArr:[],
	},
	created(){
		this.getNature();
	},
	methods:{
		getNature:function(){
			var that = this,
				imgArr=[];
			this.background = 'url('+this.imgUrl+')';
			for(var i=0;i<33;i++){
				imgArr[i]=i+1;
			}
			this.imgArr=imgArr;
			console.log(imgArr);
			//$.post('http://localhost/admin/public/index.php/index/setImage/setNature',{},function(res){
				//if(res.code=200){
					//that.nature=res.data;
				//}
				
			//});
		},
		changeMsg:function(){
			
				
				
		},
		getDom:function(e,isMobile){
			this._el = this.$refs['myMsg'];
			var img_url = this.$refs['myImg'].src;
			var img = new Image();
			// 改变图片的src
			img.src = img_url;
			this.imgWidth=img.width;
			this.imgHeight=img.height;
			e = isMobile?e.changedTouches[0]:e;
			this.startX = e.clientX - this._el.offsetLeft;
			this.startY = e.clientY - this._el.offsetTop;  
		},
		moveDom:function(e,isMobile){
			var el = this._el;
			e = isMobile?e.changedTouches[0]:e;
			el.style.left = e.clientX - this.startX + "px";  
			el.style.top = e.clientY - this.startY + "px";  
			this.msgHeight=el.offsetWidth;
			this.msgWidth=el.offsetHeight;
			width= this.imgWidth-this.msgHeight;
			height = this.imgHeight-this.msgWidth;
			/*对于大的DIV四个边界的判断*/  
			if (e.clientX - this.startX <= 0) {  
				el.style.left = 0 + "px";  
			}  
			if (e.clientY - this.startY <= 0) {  
				el.style.top = 0 + "px";  
			}  
			if (e.clientX - this.startX >= width) {  
				el.style.left = width + "px";  
			}  
			if (e.clientY - this.startY>= height) {  
				el.style.top = height + "px";  
			}  
		},
		//pc触发
		down:function(e){
			this.getDom(e,false);
			var that =this;
			document.onmousemove = function (e){
				that.moveDom(e,false);
             };
            /*鼠标的抬起事件,终止拖动*/  
			document.onmouseup = function() {  
				document.onmousemove = null;  
				document.onmouseup = null;  
			};  
			
		},
		//手机触发
		m_down:function(e){
			this.getDom(e,true);
			var el = this._el;
			var that =this;
			el.addEventListener('touchmove',function(e){
				that.moveDom(e,true);
			});
			 /*手指抬起事件,终止拖动*/  
			  el.addEventListener("touchend",function() {
				document.removeEventListener("touchmove",function defaultEvent(e) {
					e.preventDefault()
				},false);
			  },false); 
			
		},
		makeImg:function(){
			html2canvas(document.querySelector("#big")).then(canvas=>{
				canvas.id = "mycanvas";
                //生成base64图片数据  
				
				var image = new Image();
				image.src = canvas.toDataURL("image/png");
				document.body.appendChild(image);
				
		});
		
	}
		

	},
});
layui.use(['form','element'], function(){
  var form = layui.form,
	  element = layui.element,
	  $ = layui.jquery; 
	form.on('select(flip)',function(data){
		
		
		
	});
	
	form.on('select(face)',function(data){
		vue.imgUrl='./images/'+data.value+'.jpg';
		
		
	});
  form.render();
});   


