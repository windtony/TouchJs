(function() {
	touch.on(document, "DOMContentLoaded", function() {
		var state = "";
		var playArea = document.querySelector("#playarea");

		var action = {
			touch: function() {
				//log("识别原生事件");
				touch.on('#target', 'touchstart', function(ev) {
					ev.preventDefault();
				});
				touch.on('#target', 'touchstart touchmove touchend', function(ev) {
					var _this = this;
					if (!this.classList.contains("bounce")) {
						if (ev.type === "mousedown" || ev.type === "touchstart") {
							this.classList.add("bounce");
							touch.on(this, "webkitAnimationEnd", function() {
								_this.classList.remove("bounce");
							});
						}
					}
					//log("当前为原生事件: " + ev.type);
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
			entry("touch");
		})();
	});

})();