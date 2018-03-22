'use strict';

var api = require('../api.js');
var swish = require('../swish.js');
var bambora = require('../bambora.js')

exports.getShows = function(req, res) {

	api.get("/desk/shows", {}, function(response, error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});

};

exports.getShow = function(req, res) {
	api.get("/desk/shows/" + req.params.id, {}, function(response, error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.getPerformances = function(req, res) {
	api.get("/desk/shows/" + req.params.id + "/performances", {}, function(
		response, error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.getCategories = function(req, res) {
	api.get("/desk/shows/" + req.params.id + "/categories", {}, function(
		response, error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.getRates = function(req, res) {
	api.get("/desk/shows/" + req.params.id + "/rates", {}, function(response,
		error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.createOrder = function(req, res) {
	api.get("/desk/orders/create", {}, function(response, error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.getOrder = function(req, res) {
	api.get("/desk/orders/" + req.params.id, {}, function(response, error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.getTicket = function(req, res) {
	api.get("/desk/orders/" + req.params.id + "/tickets", {}, function(
		response, error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});
}

exports.postTicket = function(req, res) {
	api.post("/desk/orders/" + req.params.id + "/tickets" + , req.body, function(
		response, error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});

}

exports.removeTicket = function(req, res) {
	api.delete("/desk/orders/" + req.id + "/tickets/" + req.ticket, {}, function(response, error) {
		if (error) {
			res.send(error)
		} else {
			res.send(response);
		}
	});

}

exports.payOrderWithSwish = function(req, res) {

	if (req.body.amount && req.body.payerAlias) {
		swish.pay(req.body.amount, req.params.id, req.body.payerAlias,
			function(data) {

				swish.getPaymentInfo(data.headers.location, function(d) {
					res.send(d.body);
				})
			});
	} else {
		res.status(400).send("400 Bad request");
	}

}

exports.payOrderWithBambora = function(req, res) {

	if (req.body.amount) {
		bambora.pay(req.body.amount, req.params.id, function(response) {
			res.send(response.body);
		});
	} else {
		res.status(400).send("400 Bad request");
	}

}
