var request = require('request')

exports.pay = function(amount, id, callback) {

	var data = {
		"order" : {
			"id" : id,
			"amount" : amount,
			"currency" : "SEK",
		},
		"url" : {
			"accept" : "https://example.org/accept",
			"cancel" : "https://example.org/cancel"
		}
	}

	var options = {
		url : 'https://api.v1.checkout.bambora.com/sessions',
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : 'Basic ' + process.env.BAMBORA_TOKEN,
		},
		json : true,
		body : data,
	}

	request(options, function(error, response, data) {
		if (error) {
			console.log(error);
		} else {
			console.log(response.body);
			callback(response)
		}
	});

}