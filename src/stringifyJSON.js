// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  	
	var g = typeof (obj);

	function stringIT (arg){
		return ''+arg;
	}

	var result = "";

	if (g != 'object' || obj === null){
		if (g == 'string'){ obj = '"'+obj+'"'}
		result += stringIT(obj);
	} else if (Array.isArray(obj)){
		if (obj.length < 1){
				obj = '['+obj+']';
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
				if (i != obj.length-1){
					result += ',';
				}

			}
			result += ']';
		}	
		
	} else if (typeof obj === 'object' && !(Array.isArray(obj))){
			if (Object.keys(obj).length === 0){
				result += '{}';
			} else {
				result+= '{';


			
				result+= '}';
			}
				

				// if (typeof test === 'object' && !(Array.isArray(test))){
				// 	if (Object.keys(test).length === 0){
				// 		obj = '{'+obj+'}';
				// 	}
				// 	result += stringifyJSON(obj[i]);
				// }


	}
				
	return result;
			
	
	

	//stringifyJSON()

};
