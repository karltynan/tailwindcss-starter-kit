"use strict";

var wrapInner = function (parent, wrapper) {
	if (typeof wrapper === "string") {
		wrapper = document.createElement(wrapper);
	}
	var div = parent.appendChild(wrapper);
	while (parent.firstChild !== wrapper) {
		wrapper.appendChild(parent.firstChild);
	}
};

var wrapOuter = function (element, wrapper) {
	element.parentNode.insertBefore(wrapper, element);
	wrapper.appendChild(element);
};