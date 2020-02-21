"use strict";

var externalLink = {

	defaultWidth: 640,
	defaultHeight: 380,

	init: function () {

		var links = document.querySelectorAll('a.js-external-link'), click = function (e) {
			e.preventDefault();
			var dualL = window.screenLeft != undefined ? window.screenLeft : window.screenX;
			var dualT = window.screenTop != undefined ? window.screenTop : window.screenY;
			var winW = window.innerWidth
				? window.innerWidth : document.documentElement.clientWidth
				? document.documentElement.clientWidth : screen.width;
			var winH = window.innerHeight
				? window.innerHeight : document.documentElement.clientHeight
				? document.documentElement.clientHeight : screen.height;
			var w = externalLink.defaultWidth;
			var h = externalLink.defaultHeight;
			var l = Math.round(((winW / 2) - (w / 2)) + dualL);
			var t = Math.round(((winH / 2) - (h / 2)) + dualT);
			var options = 'width=' + w + ',height=' + h + ',left=' + l + ',top=' + t + ',toolbar=no,scrollbar=yes';
			window.open(this.href, 'Popup', options);
		}, i;

		for (i = 0; i < links.length; i++) {
			links[i].onclick = click;
		}

	}

};

window.addEventListener('load', function(e) {
	externalLink.init();
});