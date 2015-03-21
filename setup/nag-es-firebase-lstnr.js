var Firebase = require('firebase');
var Client = require('node-rest-client').Client;
var client = new Client();

// Use env variables
var firebaseUrl = "https://yourapp.firebaseio.com";
var firebaseToken = "yourtoken";
var esPath = "https://your-elasticpath-path"; //bonsai.io has a free option
function authHandler(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    }
    else {
        console.log("Authenticated successfully with payload:", authData);
    }
}
try {
    var ref = new Firebase(firebaseUrl);
    ref.authWithCustomToken(firebaseToken, authHandler);
    ref.child("contacts").on("child_added", function(snapshot) {
        var contact = snapshot.val();
        var suggest = {
            input: [contact.name],
            output: [contact.name],
            payload: {
                img_url: contact.img_url,
                contactId: snapshot.key()
            }
        };
        contact.suggest = suggest;
        var args = {
            data: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.post(esPath + "/contacts_write/active/" + snapshot.key(), args, function(data, response) {
            console.log(data);
        });
        console.log("contact added: (" + snapshot.key() + ") " + JSON.stringify(contact));
    });
    ref.child("contacts").on("child_changed", function(snapshot) {
        var contact = snapshot.val();
        var suggest = {
            input: [contact.name],
            output: [contact.name],
            payload: {
                img_url: contact.img_url,
                contactId: snapshot.key()
            }
        };
        contact.suggest = suggest;
        var args = {
            data: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.put(esPath + "/contacts_write/active/" + snapshot.key(), args, function(data, response) {
            console.log(data);
        });
        console.log("contact changed: (" + snapshot.key() + ") " + JSON.stringify(contact));
    });
    ref.child("contacts").on("child_removed", function(snapshot) {
                var contact = snapshot.val();
        client.delete(esPath + "/contacts_write/active/" + snapshot.key(), function(data, response) {
            console.log(data);
        });
        console.log("contact removed: (" + snapshot.key() + ") " + JSON.stringify(contact));
    });
    ref.child("organizations/profiles").on("child_added", function(snapshot) {
        var profile = snapshot.val();
        var suggest = {
            input: [profile.orgName],
            output: [profile.orgName],
            payload: {
                orgId: profile.org
            }
        };
        profile.suggest = suggest;
        var args = {
            data: JSON.stringify(profile),
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.post(esPath + "/orgs_write/profiles/" + snapshot.key(), args, function(data, response) {
            console.log(data);
        });
        console.log("org profile added: (" + snapshot.key() + ") " + JSON.stringify(profile));
    });
    ref.child("organizations/profiles").on("child_changed", function(snapshot) {
        var profile = snapshot.val();
        var suggest = {
            input: [profile.orgName],
            output: [profile.orgName],
            payload: {
                orgId: profile.org
            }
        };
        profile.suggest = suggest;
        var args = {
            data: JSON.stringify(profile),
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.put(esPath + "/orgs_write/profiles/" + snapshot.key(), args, function(data, response) {
            console.log(data);
        });
        console.log("org profile changed: (" + snapshot.key() + ") " + JSON.stringify(profile));
    });
    ref.child("organizations/profiles").on("child_removed", function(snapshot) {
        var profile = snapshot.val();
        client.delete(esPath + "/orgs_write/profiles/" + snapshot.key(), function(data, response) {
            console.log(data);
        });
        console.log("org profile removed: (" + snapshot.key() + ") " + JSON.stringify(profile));
    });
}
catch (e) {
    console.log(e);
}
