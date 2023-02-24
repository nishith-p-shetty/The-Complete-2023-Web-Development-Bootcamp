const bodyParser = require('body-parser');
const request = require('request');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const express = require('express');
const app = express();
const port = 3000;
mailchimp.setConfig({
    apiKey: '1c29c24ef66c09a637706a0e3f827407',
    server: 'us21',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
    const listId = "0204084a29";
    const subscribingUser = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
    };
    
    try{
        run()
        res.sendFile(__dirname + '/success.html');
    }
    catch(err){
        console.log(err);
        res.sendFile(__dirname + '/failure.html');
    }
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});