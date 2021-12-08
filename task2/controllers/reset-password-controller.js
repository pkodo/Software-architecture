const dbName = require('./../index');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const reset_users = "reset_users";
const users = "users";

let login_credential, link, email;

const setData = (req) => {
    login_credential = req["body"]["email"];
};

async function main() {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure:true,
        auth: {
            user: 'reset.no.reply.guide@gmail.com',
            pass: 'ZX/!.5Ef\']2\'4J9r'
        }
    });

    let info = await transporter.sendMail({
        from: "reset.no.reply.guide@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Registration ✔", // Subject line
        text: "reset", // plain text body
        html: "<b>Visit this link to reset password</b> <a>"+link+"</a>" // html body
    });
}

//json example
/*{
    "email":"wanted email",
    "username":" a username",
    "password":"password"
}*/
exports.sendLink = (req, res) => {
    setData(req);

    dbName.db.collection(users).find({ $or: [ { username: login_credential }, { email: login_credential } ] }).
    toArray(function(err, result) {
        if(result.length <= 0)  res.status(200).send("reset done.");
        dbName.db.listCollections({name: reset_users}).next(function(err, collections) {
            if (err) throw err;
            if(collections === 'null')
            {
                dbName.db.createCollection(reset_users).catch( err => {if (err) throw err});
                dbName.db.reset_users.createIndex( { expireAfterSeconds: 86400 } )
            }

            let token = Math.random().toString(36).slice(-8);
            let payload = {"email":login_credential, "token":token };
            dbName.db.collection(reset_users).insertOne(payload, (err, response) => {
                if (err) throw err;
                if (response.insertedCount)
                {
                    email = result[0]["email"]
                    link = "http://localhost:3000/verify?"+"email="+email+"&token="+token;
                    main().catch(console.error);
                    res.status(200).send("reset done.");
                }
                else res.status(500).send("Collection error.");
            });

        });
    });
};

// http://localhost:3000/reset-password/verify?email=yourEmail&token=token
exports.verifyResetPassword = (req, res) => {
    dbName.db.collection(reset_users).find({ email: req.query.email }, { token: req.query.token } ).
    toArray(function(err, result) {
        if (err) throw err;
        if(result.length <= 0) res.status(500).send("Wrong credentials");
        result = result[0];
        let payload = result
        dbName.db.collection(reset_users).deleteOne(payload, (err, response) => {
            if (err) throw err;
            if(response.deletedCount)
            {
                const documents = dbName.db.collection(reset_users).countDocuments();
                documents.then(numberDoc => {
                    if(!numberDoc)
                    {
                        dbName.db.dropCollection(reset_users, (err) => { if (err) throw err });
                    }
                    else
                    {
                        res.status(200).send("Valid");
                    }
                })
            }
            else res.status(500).send("Not found.");
        });
    });
};

exports.resetPassword = (req, res) => {
    let password = req.body["password"];
    let email = req.body["username"];
    bcrypt.hash(password, 10, function(err, hash) {
        let payload = {"password":hash};
        dbName.db.collection(users).updateOne({"email": email}, { $set: payload }, (err, response) => {
            if (err) throw err;
            if(response.modifiedCount) res.status(200).send("Updated");
            else res.status(500).send("Not found.");
        });
    });
};