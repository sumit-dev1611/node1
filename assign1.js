    var mongoose = require('mongoose');
    var async = require('async');
    var conn = mongoose.createConnection('mongodb://admin:123@ds151232.mlab.com:51232/sumit');
    var post_schema1 = mongoose.Schema({}, {
        strict: false,
        collection: 'Users'
    });
    var post_schema2 = mongoose.Schema({}, {
        strict: false,
        collection: 'UsersProfile'
    });
    var uid;
    var post1 = conn.model('post1', post_schema1);
    var post2 = conn.model('post2', post_schema2);
    for (var i = 1; i <= 5; i++) {
        uid = 0;
        (function(i) {
            post1.find({
                firstname: /ab/i
            }, function(err, result) {
                if (err) {
                    console.log(err);
                    process.exit();
                }
                if (result.length == 0) {
                    var new_post1 = new post1({
                        firstname: 'AB',
                        lastname: 'D ' + i,
                        email: 'abd@sa',
                        password: 'proteas'
                    });
                    new_post1.save(function(err, data) {
                        //save done
                        if (err) {
                            console.log(err);
                            process.exit();
                        }
                        console.log('Post1 Saved')
                        uid = data._id;
                    });
                } else {
                    var new_post1 = new post1({
                        firsdtname: 'ms',
                        lastname: 'D ' + i,
                        email: 'msd@ind',
                        password: 'mahi'
                    });

                    new_post1.save(function(err, data) {
                        //save done
                        if (err) {
                            console.log(err);
                            process.exit();
                        }
                        console.log('Post1 Saved');
                        uid = data._id;
                    });

                }
            });
        })(i);

        (function(i) {
            post2.find({
                title: /UsersProfile/i
            }, function(err, result) {
                if (err) {
                    console.log(err);
                    process.exit();
                }
                if (!result || result.length == 0) {
                    var new_post2 = new post2({
                        user_id: uid,
                        dob: '12/12/12',
                        Mobile_no: 173247578
                    });
                    new_post2.save(function(err) {
                        //save done
                        if (err) {
                            console.log(err);
                            process.exit();
                        }
                        console.log('Post2 Saved')
                    });
                } else {
                    var new_post2 = new post2({
                        user_id: uid,
                        dob: '7/7/9' + i,
                        Mobile_no: 874654780 + i
                    });

                    new_post2.save(function(err) {
                        //save done
                        if (err) {
                            console.log(err);
                            process.exit();
                        }
                        console.log('Post2 Saved')
                    });
                }

            });
        })(i);
    }
