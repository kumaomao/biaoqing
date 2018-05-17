layui.use('flow', function(){

});

var vue = new Vue({
	el:'#app',
	data:{
		toUrl:'./image.html?id=',
	},
	created(){
		this.getNature();
	},
	methods:{
		getNature:function(){
			var that = this,
				imgArr=[];
			this.background = 'url('+this.imgUrl+')';
			for(var i=0;i<34;i++){
				imgArr[i]=[i+1,'./images/'+(i+1)+'.jpg'];
			}
			this.imgArr=imgArr;
			console.log(imgArr);
			
		},
	}
	
});

$(function() {
    var $container = $('#masonry');
    $container.imagesLoaded(function() {
        $container.masonry({
                itemSelector: '.box',
                gutter: 5,
                isAnimated: true,
            });
     });
});