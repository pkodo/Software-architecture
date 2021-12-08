const dbName = require('./../index');

const point_of_interest = "point_of_interest";
let lon, lat, name, payload;

const setData = (req) => {
    lon = parseFloat(req.body["lon"]);
    lat = parseFloat(req.body["lat"]);
    name = req.body["name"];
    payload = {"lon":lon, "lat":lat,"name":name};
};

exports.createPoi = (req, res) => {
    setData(req);
    dbName.db.listCollections({name: point_of_interest}).next(function(err, collections) {
        if (err) throw err;
        if(collections === 'null')
        {
            dbName.db.createCollection(point_of_interest).catch( err => {if (err) throw err});
        } 
        dbName.db.collection(point_of_interest).insertOne(payload, (err, response) => {
            if (err) throw err;
            if (response.insertedCount) res.send("Added");
            else res.status(500).send("Collection error.");
        });
    });
};

exports.editPoi = (req, res) => {
    setData(req);
    dbName.db.collection(point_of_interest).updateOne( {"name": name}, { $set: payload }, (err, response) => {
        if (err) throw err;
        if(response.modifiedCount) res.send("Updated");
        else res.status(500).send("Not found.");
    });
};

exports.deletePoi = (req, res) => {
    setData(req);
    dbName.db.collection(point_of_interest).deleteOne(payload, (err, response) => {
        if (err) throw err;
        if(response.deletedCount) 
        {
            const documents = dbName.db.collection(point_of_interest).countDocuments();
            documents.then(numberDoc => {
                if(!numberDoc)
                {
                    dbName.db.dropCollection(point_of_interest, (err) => { if (err) throw err });
                }
            })
            res.send("Deleted");
        }
        else res.status(500).send("Not found.");
    });
};
