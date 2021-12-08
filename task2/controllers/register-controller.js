const dbName = require('./../index');
const bcrypt = require('bcrypt');
const temporary_users = "temporary_users";
const nodemailer = require("nodemailer");

let email, password, username, payload, link;

function validString(string){
    return !(!string || /^\s*$/.test(string) || 0 === string.length);
}

const setData = (req) => {
    email = req.body["email"];
    username = req.body["username"];
    password = req.body["password"];
};

// async..await is not allowed in global scope, must use a wrapper
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
        html: "<b>Visit this link to complete registration</b> <a>"+link+"</a>" // html body
    });
}

//json example
/*{
    "email":"wanted email",
    "username":" a username",
    "password":"password"
}*/
exports.registerUser = (req, res) => {
    setData(req);
    dbName.db.listCollections({name: temporary_users}).next(function(err, collections) {
        if (err) throw err;
        if(collections === 'null')
        {
            dbName.db.createCollection(temporary_users).catch( err => {if (err) throw err});
        }

        bcrypt.hash(password, 10, function(err, hash) {
            // Store hash in database
            let token = Math.random().toString(36).slice(-8);
            payload = {"email":email, "username":username, "password":hash, "token":token };
            dbName.db.collection(temporary_users).insertOne(payload, (err, response) => {
                if (err) throw err;
                if (response.insertedCount)
                {
                    link = "http://localhost:3000/verify?"+"email="+email+"&token="+token;
                    main().catch(console.error);
                    res.status(200).send("Registered Successfully");
                }
                else res.status(500).send("Collection error.");
            });
        });

    });
};

