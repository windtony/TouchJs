(function() {
	touch.on(document, "DOMContentLoaded", function() {
		var state = "";
		var playArea = document.querySelector("#playarea");
		var action = {
			rotate: function() {
				var angle = 0;
				touch.on('#target', 'touchstart', function(ev) {
					ev.startRotate();
					ev.preventDefault();
				});
				touch.on('#target', 'rotate', function(ev) {
					var totalAngle = angle + ev.rotation;
					if (ev.fingerStatus === 'end') {
						angle = angle + ev.rotation;
					}
					this.style.webkitTransform = 'rotate(' + totalAngle + 'deg)';
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

		//i初始化
		(function() {
			entry("rotate");
		})();
	});
})();