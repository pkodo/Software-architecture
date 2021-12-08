const dbName = require('./../index');

const favourite = "favourite";
let poi, name, category, width, height, payload;

const setData = (req) => {
    poi = req.body["poi"];
    name = req.body["name"];
    category = req.body["shop"];
    width = req.body["width"];
    height = req.body["height"];
    payload = {"name":name, "shop":category,"poi":poi,"width":width,"height":height};
};

exports.createFavourite = (req, res) => {
    setData(req);
    dbName.db.listCollections({name: favourite}).next(function(err, collections){
        if (err) throw err;
        if(collections === 'null')
        {
            dbName.db.createCollection(favourite).catch( err => {if (err) throw err});
        } 
        dbName.db.collection(favourite).insertOne(payload, (err, response) => {
            if(err) throw err ;
            if (response.insertedCount) res.send("Added");
            else res.status(500).send("Collection error.");
        });
    });
};

exports.editFavourite = (req, res) => {
    setData(req);
    dbName.db.collection(favourite).updateOne( {"name": name}, { $set: payload }, (err, response) => {
        if (err) throw err;
        if(response.modifiedCount) res.send("Updated");
        else res.status(500).send("Not found.");
    });
};

exports.deleteFavourite = (req, res) => {
    setData(req);
    dbName.db.collection(favourite).deleteOne(payload, (err, response) => {
        if (err) throw err;
        if(response.deletedCount) 
        {
            const documents = dbName.db.collection(favourite).countDocuments();
            documents.then(numberDoc => {
                if(!numberDoc)
                {
                    dbName.db.dropCollection(favourite, (err) => { if (err) throw err });
                }
            })
            res.send("Deleted");
        }
        else res.status(500).send("Not found.");
    });  
};