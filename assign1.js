    var mongoose = require('mongoose');
    var async = require('async');
    var md5 = require('md5');
    var conn = mongoose.createConnection('mongodb://admin:123@ds151232.mlab.com:51232/sumit');
    var user_schema = mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        password: String
    }, {
        strict: true,
        collection: 'Users'
    });
    var userprofile_schema = mongoose.Schema({
        User_id: String,
        dob: String,
        Mobile_no: Number
    }, {
        strict: true,
        collection: 'UsersProfile'
    });
    var user = conn.model('user', user_schema);

    var userprofile = conn.model('userprofile', userprofile_schema);
    var userdetail = [
        { firstname: 'John', lastname: 'cena', email: 'john8798@gmail.com', password: 'hfgh999', dob: '06/12/1992', Mobile_no: 365154366 },
        { firstname: 'Peter', lastname: 'parker', email: 'peter@hotmail.com', password: 'hgfhg59f', dob: '05/11/2002', Mobile_no: 254654369 },
        { firstname: 'Amy', lastname: 'walters', email: 'peter@hotmail.com', password: 'hjgdfgdf', dob: '09/09/2016', Mobile_no: 454515436 },
        { firstname: 'Hannah', lastname: 'montanah', email: 'hannah74@gmail.com', password: 'fdgfdg', dob: '07/06/1998', Mobile_no: 996515436 },
        { firstname: 'Michael', lastname: 'jackson', email: 'jack378@hotmail.com', password: 'gdfgdfg', dob: '12/03/1995', Mobile_no: 885154363 },
    ];


    async.forEachOf(userdetail, function(data, key, callback) {
            var new_data = new user({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: md5(data.password)
            });
            new_data.save(function(err, data1) {
                if (err) {
                    console.log(err);
                } else if (data1) {
                    var new_data1 = new userprofile({
                        User_id: data1._id,
                        dob: data.dob,
                        Mobile_no: data.Mobile_no
                    });

                    new_data1.save(function(err, data) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                callback();
            });
        },
        function(err) {
            if (err) {
                console.log(err);
                process.exit();
            }
        });
