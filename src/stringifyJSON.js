// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

	function stringIT (arg){
		return ''+arg;
	}

	var result = "";

	if (typeof obj != 'object' || obj === null){
		if (typeof obj == 'string'){ obj = '"'+obj+'"'}
		result += stringIT(obj);
	} else if (Array.isArray(obj)){
		if (obj.length < 1){
				obj = '[]';
				result += stringIT(obj);
		} else {
			result += '[';	
			for (var i=0; i<obj.length; i++){
				var test = obj[i];
				if (typeof test === 'number'){
					result += String(test);
				}
				if (typeof test === 'string'){
					result += '"'+test+'"';
				}
				if (Array.isArray(test)){
					result += stringifyJSON(test);
				}
				if (typeof test === 'object' && !(Array.isArray(test))){
					for (var prop in test){
						result += '{"'+prop+'":"'+test[prop]+'"}';
					}
				}
				if (i != obj.length-1){
					result += ',';
				}
			}
			result += ']';
		}
	} else if (typeof obj === 'object'){
		//keeping track of how many properties are in the object
		var arrayOfProps = [];
		for (var prop in obj){
			arrayOfProps.push(prop);
		}
		if (Object.keys(obj).length === 0){
			result += '{}';
		} else {
			result+= '{';
			for (var prop in obj){
				var test = obj[prop];

				if (typeof test === 'string'){
					result += '"'+prop+'":"'+test+'"'
				}
				if (typeof test === 'boolean' || test === null){
					if (prop != arrayOfProps[arrayOfProps.length-1]) {
						result += '"'+prop+'":'+test+','
					} else {
						result += '"'+prop+'":'+test
					}
				} 

				//This next section can be reworked to combine both since code is repeating itself. Will come back to it.
				if (typeof test === 'object' && !(Array.isArray(test)) && test != null){
					if (prop != arrayOfProps[arrayOfProps.length-1]) {
						result += '"'+prop+'":'+stringifyJSON(test)+',';
					} else {
						result += '"'+prop+'":'+stringifyJSON(test);
					}
				}
				if ((Array.isArray(test)) || (Array.isArray(obj))) {
					if (prop != arrayOfProps[arrayOfProps.length-1]) {
						result += '"'+prop+'":'+stringifyJSON(test)+',';
					} else {
						result += '"'+prop+'":'+stringifyJSON(test);
					}
				}
			}
			result+= '}';
		}
	}
	return result;
};
