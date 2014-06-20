var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


exports.experience = function(req, res) {
    var q = req.query;

    r = q.r;
    console.log(r)
    //count?
    client.search({
        "index": "elasticsearch_index_topdoctors_default_node_index",
        "from": 0,
        "size": 300,
        body: {


            "query": {
                "filtered": {
                    "query": {
                        "match": {
                            "field_sub_experience:parent": {
                                "query": r // remember that, this will always return one result. Update here according to your needs. For example, use tag instead of _id like tag=responsive in order to get results that matches tag field with responsive
                            }
                        }
                    }

                }
            }
        }

    }).then(function(body) {
        var hits = body.hits.hits;
        console.log(body.hits.hits)
        console.log(body)
        res.send(body)
    }, function(error) {
        console.trace(error.message);

    });
};

exports.subExperience = function(req, res) {
    var q = req.query;
    par = q.par;
    sub = q.sub;
    console.log(par ,sub)
    client.search({
        "index": "elasticsearch_index_topdoctors_default_node_index",
        "from": 0,
        "size": 300,
        body: {
            "query": {
                "filtered": {
                    "query": {
                        "match": {
                            "field_sub_experience:parent": {
                                "query": par
                            }
                        }
                    },
                    "filter": {
                        "and": [{
                            "term": {
                                "field_sub_experience": sub
                            }
                        }]
                    }

                }
            }
        }
    }).then(function(body) {
        var hits = body.hits.hits;
        res.send(body)
    }, function(error) {
        console.trace(error.message);

    });
};
