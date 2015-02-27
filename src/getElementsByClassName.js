// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
    var result = [];

	function checkDOM(elem) {
		var children = elem.children;

		for (var i = 0; i < children.length; i++) {

			if (children[i].classList.contains(className)) {
				result.push(children[i]);
			}
			if (children[i].hasChildNodes) {
				checkDOM(children[i]);
			}
		}

	}
	checkDOM(document);

	return result;

};
