const dbName = require('./../index');
const users = "users";
const temporary_users = "temporary_users";

//http://localhost:3000/verify?email=wantedemail&token=token
exports.verify = (req, res) => {
    dbName.db.collection(temporary_users).find({ email: req.query.email }, { token: req.query.token } ).
    toArray(function(err, result) {
        if (err) throw err;
        if(result.length <= 0) res.status(500).send("Wrong credentials");
        result = result[0];
        let payload = result;
        dbName.db.collection(temporary_users).deleteOne(payload, (err, response) => {
            if (err) throw err;
            if(response.deletedCount)
            {
                const documents = dbName.db.collection(temporary_users).countDocuments();
                documents.then(numberDoc => {
                    if(!numberDoc)
                    {
                        dbName.db.dropCollection(temporary_users, (err) => { if (err) throw err });
                    }
                })
            }
            else res.status(500).send("Not found.");
        });
        delete result["token"];
        payload = result;
        dbName.db.collection(users).insertOne(payload, (err, response) => {
            if (err) throw err;
            if (response.insertedCount) res.status(200).send("Registered");
            else res.status(500).send("Collection error.");
        });
    });
};