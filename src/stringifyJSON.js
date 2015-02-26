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
				if (i != obj.length-1){
					result += ',';
				}
			}
			result += ']';
		}	
		
	} else if (typeof obj === 'object' && !(Array.isArray(obj))){
			
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

				}

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
