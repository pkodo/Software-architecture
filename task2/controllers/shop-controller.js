const dbName = require('./../index');

const locations = "locations";
let lon, lat, name, category, payload, id;

const setData = (req) => {
     lon = parseFloat(req.body["lon"]);
     lat = parseFloat(req.body["lat"]);
     name = req.body["name"];
     category = req.body["shop"];
     payload = {"lon":lon, "lat":lat,"name":name,"shop":category};
};

exports.createShop = (req, res) => {
    setData(req);
    dbName.db.collection(locations).insertOne(payload, (err, response) => {
        if (err) throw err;
        if (response.insertedCount) res.send("Added");
        else res.status(500).send("Collection error.");
    });
};

exports.editShop = (req, res) => {
    setData(req);
    id = req.body["id"];
    dbName.db.collection(locations).updateOne({"id": id}, { $set: payload }, (err, response) => {
        if (err) throw err;
        if(response.modifiedCount) res.send("Updated");
        else res.status(500).send("Not found.");
    });
};

exports.deleteShop = (req, res) => {
    setData(req);
    dbName.db.collection(locations).deleteOne(payload, (err, response) => {
        if (err) throw err;
        if(response.deletedCount) 
        {
            const documents = dbName.db.collection(locations).countDocuments();
            documents.then(numberDoc => {
                if(!numberDoc)
                {
                    dbName.db.dropCollection(locations, (err) => { if (err) throw err });
                }
            })
            res.send("Deleted");
        }
        else res.status(500).send("Not found.");
    });
};