(function() {
	touch.on(document, "DOMContentLoaded", function() {
		var state = "";
		var playArea = document.querySelector("#playarea");

		var action = {
			drag: function() {
				//log("抓取并移动目标");

				touch.on('#target', 'touchstart', function(ev) {
					ev.preventDefault();
				});

				var target = document.getElementById("target");
				var dx, dy;

				touch.on('#target', 'drag', function(ev) {

					dx = dx || 0;
					dy = dy || 0;

					var offx = dx + ev.x + "px";
					var offy = dy + ev.y + "px";
					this.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)";

				});

				touch.on('#target', 'dragend', function(ev) {
					dx += ev.x;
					dy += ev.y;
					//log("当前x值为:" + dx + ", 当前y值为:" + dy +".");
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
			entry("drag");
		})();
	});

})();