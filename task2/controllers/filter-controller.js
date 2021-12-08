const dbName = require('./../index');

const locations = "locations";
const point_of_interest = "point_of_interest";

function validString(string){
    return !(!string || /^\s*$/.test(string) || 0 === string.length);
}

exports.getAllShops = (req, res) => {
    const poi = req.body["poi"];
    const name = req.body["name"];
    const category = req.body["shop"];
    const width = req.body["width"];
    const height = req.body["height"];
    const size = [width,height];
    let query = {};

    if(validString(name))       query["name"] = name;
    if(validString(category))   query["shop"] = category;
    if(validString(poi))
    {
        dbName.db.collection(point_of_interest).find({name:poi}).toArray(function(err, result) {
            if (err) throw err;
            result = result[0];

            let bounds = {};
            for(let i = 0; i< 2; ++i)
            {
                let lat_change = size[i]/(111111*2);
                let lon_change = Math.abs(Math.cos(result["lat"]*(Math.PI/180)));
                if(i === 0)
                {
                    bounds["lat_min"] = parseFloat((result["lat"] - lat_change).toFixed(7));
                    bounds["lat_max"] = parseFloat((result["lat"] + lat_change).toFixed(7));
                }
                else
                {
                    bounds["lon_min"] = parseFloat((result["lon"] - lon_change).toFixed(7));
                    bounds["lon_max"] = parseFloat((result["lon"] + lon_change).toFixed(7));
                }
            }
            query["lat"] = {$gt:bounds["lat_min"],$lt:bounds["lat_max"]};
            query["lon"] = {$gt:bounds["lon_min"],$lt:bounds["lon_max"]};

            dbName.db.collection(locations).find(query).toArray(function(err, result) {
                res.send(result);
            });
        });
    }
    else
    {
        dbName.db.collection(locations).find(query).toArray(function(err, result) {
            res.send(result);
        });
    };
};