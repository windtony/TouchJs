(function() {
	touch.on(document, "DOMContentLoaded", function() {
		var state = "";
		var playArea = document.querySelector("#playarea");

		var action = {
			scale: function() {
				//log("双指放大与缩小目标.");

				var target = document.getElementById("target");
				target.style.webkitTransition = 'all ease 0.05s';

				touch.on('#target', 'touchstart', function(ev) {
					ev.preventDefault();
				});

				var initialScale = 1;
				var currentScale;

				touch.on('#target', 'pinchend', function(ev) {

					currentScale = ev.scale - 1;
					currentScale = initialScale + currentScale;
					currentScale = currentScale > 2 ? 2 : currentScale;
					currentScale = currentScale < 1 ? 1 : currentScale;
					this.style.webkitTransform = 'scale(' + currentScale + ')';
					//log("当前缩放比例为:" + currentScale + ".");
				});

				touch.on('#target', 'pinchend', function(ev) {
					initialScale = currentScale;
				});
			}
		}

		function entry(act) {
			if (state === act) {
				return;
			}
			state = act;
			playArea.innerHTML = "";
			var target = document.createElement("img");
			target.id = "target";
			target.draggable = false;
			target.src = "img/cloud.png";
			playArea.appendChild(target);
			action[act]();
			runhijs();
			setTimeout(function() {
				target.classList.add("show");
			}, 10);
		}

		//init
		(function() {
			entry("scale");
		})();
	});

})();