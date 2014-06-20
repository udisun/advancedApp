var config = require('../../config/config');
var request = require('request');

exports.forums = function(req, res) {
    console.log("forums")
    request(server + 'mean/json/view/mean_view_forums/0/4', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("not")
            res.send(body);
        }
    });
};