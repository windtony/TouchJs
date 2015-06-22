(function() {
	touch.on(document, "DOMContentLoaded", function() {
		var state = "";
		var playArea = document.querySelector("#playarea");

		var action = {
			tap: function() {
				touch.on('#target', 'hold tap doubletap', function(ev) {
					//这里写的点击事件：hold:按住不放;tap:单击;doubletap:双击
					var _this = this;
					this.classList.add("bounce");
					touch.on(this, "webkitAnimationEnd", function() {
						_this.classList.remove("bounce");
					});

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
			entry("tap");
		})();
	});

})();