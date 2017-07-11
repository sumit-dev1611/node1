    var MongoClient = require('mongodb').MongoClient;
    var avg = 0;
    MongoClient.connect('mongodb://admin:123@ds151232.mlab.com:51232/sumit', function(err, db, callback) {
        if (err) {
            console.log(err);
        }

        var today = new Date();
        var sum = 0,
            count = 0;
        db.collection('UsersProfile').find().each(function(err, data) {
            if (err) {
                console.log(err);
            }
            if (data) {
                var birthDate = new Date(data.dob);
                console.log(birthDate);
                var age = today.getFullYear() - birthDate.getFullYear();
                console.log("Age is " + age + " years");
                sum = sum + age;
                count++;
                if (age >= 25) {
                    console.log("More than 25 years")
                    db.collection('UsersProfile').remove({ "_id": data._id }, function(err, result) {
                        if (result === 1) { console.log('error: ' + err) } else { console.log('Data Deleted') };
                    });
                }
                avg = sum / count;
            } else {
                console.log("Average age of users is" + avg);
            }
        });
        if (callback)
            callback();
    });
