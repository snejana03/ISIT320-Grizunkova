var fs = require('fs');

exports.parse = function(filename, fileType) {

	var splitChar = "\t";

	switch (fileType) {
		case 'csv':
			splitChar = ",";
		break;

		case 'tsv':
			splitChar = "\t";
			break;
	}

	var csv = fs.readFileSync(filename).toString().split("\n");
	
	var json = [];

	var tokens = csv[0].split(splitChar);
	console.log(tokens);
	for(var i=1;i < csv.length;i++) {
		var content = csv[i].split(splitChar);
		// console.log('length: ' + content);
		var tmp = {};
		for(var j=0; j < tokens.length; j++) {
			try {
				tmp[tokens[j]] = content[j];
			} catch(err) {
				tmp[tokens[j]] = "";
			}
		}
		json.push(tmp);
	}

	console.log("Parsed Items: "+json.length);
	// this.json = json;
	return json;
};

exports.writeJson = function(fileName, json) {
	fs.writeFile(fileName, JSON.stringify(json, null, 4), function(err) {
		if(err)
			console.log(err);
		else
			console.log(fileName + " saved.");
	});
};

exports.writeHtml = function(fileName, json){
	console.log(json);
	var html ="";
	for(var i=0; i<json.length; i++){
		html +='<p>'+json[i].Name+'<p>\n';
	}
	fs.writeFile(fileName, html, function(err) {
		if(err)
			console.log(err);
		else
			console.log(fileName + " saved.");
	});
};