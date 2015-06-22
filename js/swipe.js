(function(){
	touch.on(document, "DOMContentLoaded", function(){
		var state = "";
		var playArea = document.querySelector("#playarea");

		var action = {
			swipe : function(){
				var w = 168;
				var tw = playArea.offsetWidth;
				
				var lf = document.getElementById("target").offsetLeft;
				var rt = tw - w - lf;
				
				//log("向左, 向右swipe滑动");
				touch.on('#target', 'touchstart', function(ev){
					ev.preventDefault();
				});

				var target = document.getElementById("target");
				target.style.webkitTransition = 'all ease 0.2s';
				
				//log("向右滑动.");
			    touch.on(target, 'swiperight', function(ev){
					this.style.webkitTransform = "translate3d(" + rt + "px,0,0)";
			    });
				//log("向左滑动.");
			    touch.on(target, 'swipeleft', function(ev){
					this.style.webkitTransform = "translate3d(-" + this.offsetLeft + "px,0,0)";
					
			    });
			}
		}
		
		function entry(act){
			if(state === act){ return; }
			state = act;
			playArea.innerHTML = "";
			var target = document.createElement("img");
			target.id = "target";
			target.draggable = false;
			target.src = "img/cloud.png";
			playArea.appendChild(target);
			action[act]();
			runhijs();
			setTimeout(function(){
				target.classList.add("show");
			}, 10);
		}

		//init
		(function(){
			entry("swipe");
			})();
	});

})();