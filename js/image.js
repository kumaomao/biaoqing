	$(document).ready( function() {

			

            $('.demo').each( function() {

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

							vue.color=log;

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
		imgUrl:'',
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
		color:'#000000',
		background:'',
		imgArr:[],
		isFlipx:false,
		width:'',
		height:'',
		x:'',
		y:'',
		isShow:false,
		y_left:'',
		
	},
	created(){
		this.getUrlName('id');
		
		
	},
	methods:{
		getUrlName:function(name){
			var name=getQueryString(name);
				this.imgUrl = './images/'+name+'.jpg';
				
		},
		changeMsg:function(){
			this._el = this.$refs['myMsg'];
			var img = this.$refs['myImg'];	
			this.imgWidth=img.offsetWidth;
			this.imgHeight=img.offsetHeight;
			this.msgHeight=this._el.offsetWidth;
			this.msgWidth=this._el.offsetHeight;
			width= this.imgWidth-this.msgHeight;
			height = this.imgHeight-this.msgWidth;
			this.width=width;
			this.height=height;
			
			this.isShow=true;
		},
		getDom:function(e,isMobile){
			this.changeMsg();
			e = isMobile?e.changedTouches[0]:e;
			this.startX = e.clientX - this._el.offsetLeft;
			this.startY = e.clientY - this._el.offsetTop;  
		},
		moveDom:function(e,isMobile){
			var el = this._el;
			e = isMobile?e.changedTouches[0]:e;
			el.style.left = e.clientX - this.startX + "px";  
			el.style.top = e.clientY - this.startY + "px";  
			this.x=e.clientX - this.startX;
			this.y=e.clientY - this.startY;
			/*对于大的DIV四个边界的判断*/  
			if (e.clientX - this.startX <= 0) {  
				el.style.left = 0 + "px";  
				this.x=0;
			
			}  
			if (e.clientY - this.startY <= 0) {  
				el.style.top = 0 + "px";  
				this.y=0;
			}  
			if (e.clientX - this.startX >= width) {  
				el.style.left = width + "px";  
				this.x=width;
			}  
			if (e.clientY - this.startY>= height) {  
				el.style.top = height + "px";  
				this.y=height;
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
				$("#img").append(image);
				$("#img img").addClass('layui-col-xs4 layui-col-md4');
				
				
			});
		},
		
		
		//设置x
		changeX:function(){
			var x = this.x,
				el = this._el;
			
			
			el.style.left = x+'px';
		},
		changeY:function(){
			var y = this.y,
				el = this._el;
			
			el.style.top = y+'px';
		}
		

	},
});
layui.use(['form','element'], function(){
  var form = layui.form,
	  element = layui.element,
	  $ = layui.jquery; 
	  //左右翻转
	form.on('select(flip)',function(data){
		if(data.value==0){
			vue.isFlipx=false;
			return;
		}
		vue.isFlipx=true;
		return;
		
		
	});
	
	form.on('select(face)',function(data){
		vue.imgUrl='./images/'+data.value+'.jpg';
	});
  form.render();
});   
function getQueryString(name) { 
  let reg = `(^|&)${name}=([^&]*)(&|$)`
  let r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); return null; 
}





