let express = require('express');//Import the express dependency
let dbconfig = require('./dbconfig');
const { Pool, Client } = require('pg');

let db_modules = require('./dbModules');
let db_exercises = require('./dbExercises');
let db_questions = require('./dbQuestions');
let db_asserts = require('./dbAsserts');
let db_code = require('./dbCode');
let db_UserProgress = require('./dbUserProgress')
let db_testUserGroupData = require('./testUserGroup');
let db_TestSingleUser = require('./testUser');
let db_UserData = require('./dbUser');
let db_UserGroup = require('./dbUserGroup');
let code_dir = 'C:/Downloads/';
let dbUserHistory = require('./dbUserHistory');
let testuserhistory = require('./testuserhistory');
let dbUserLogin = require('./dbUserLogin');
let testUserLogin = require('./testuserlogin');
let db_ExercisesSummary = require('./dbExerciseSummary');
let db_UserProgressHelper = require('./dbUserProgresshelper');
let db_filterExercise = require('./dbExerciseStatus');
let db_userresponse = require('./dbUserResponse');
let bulkUserCreate = require('./bulkUserCreate')
let bulkUserDelete = require('./bulkUserDelete')
let sendMail = require('./sendMailTemplate')
let db_category = require('./dbCategory')
let db_CreateApiKey = require('./dbCreateApiKey')
let db_UserModules = require('./dbUserModules')
// db_compile = require('E:/onlinecompiler/Pravinyam/OnlineCompiler/compiler-server/dbCompiler')
// db_compile=require('./dbCompiler')

const app = express();         //Instantiate an express app, the main work horse of this server
//const port = 5000;             //Save the port number where your server will be listening

//Idiomatic expression in express to route and respond to a client request
const pool = new Pool(dbconfig);
let router = express.Router();
let bodyParser = require('body-parser');
let cors = require('cors');
let http = require('http');
let url = require('url');
const { response } = require('express');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

router.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    // if(request.query.clientpublic!=undefined & request.query.clientsecret!=undefined)
    // {
    //     console.log("public",request.query.clientpublic);
    //     console.log("secret",typeof(request.query.clientsecret))
    //     console.log("origin", request.headers.origin)

    //     db_ValidateApiKey.ValidateUser(request.query.clientpublic,request.query.clientsecret).then(res=>{
    // console.log(res)
    //         if(res==1)
    //         {

    console.log("exec: middleware");
    // response.send("not allowed")
    next();
    //     }
    //     else{
    //         response.send("not allowed");
    //     }
    // })
    // }
    // else{
    //     response.json("not allowed")
    // }
});
//getModules

router.route('/createapikey').get((request, response) => {
    if (request.query.origin != undefined) {
        db_CreateApiKey.createApiKey(request.query.origin).then(res => {
            console.log(res)
            response.json(res)
        })
    }
    else {

        db_CreateApiKey.createApiKey(request.headers.origin).then(res => {
            console.log(res)
            response.json(res)
        })
    }
})

router.route('/getallapikey').get((request, response) => {
    db_CreateApiKey.GetAllApi().then(res => {
        console.log(res)
        response.json(res)
    })
})

router.route('/modules').get((request, response) => {
    console.log(request.query);
    db_modules.getModules(request.query.moduleid, request.query.module).then(result => {
        // console.log(result);
        response.json(result);
    })
});

router.route('/exercises').get((request, response) => {
    console.log(request.query);
    db_exercises.getExercises(request.query.module, request.query.language, request.query.level).then(result => {
        response.json(result);
    });
});


router.route('/getcategory').get((request, response) => {
    console.log(request.query);
    db_category.getCategory().then(result => {
        response.json(result);
    });
});



router.route('/getcategorydetails').get((request, response) => {
    console.log(request.query);
    db_category.getcategorydetails(request.query.userid, request.query.category, request.query.subcategory, request.query.track, request.query.module).then(result => {
        response.json(result);
    });
});


router.route('/userresponse').post((request, response) => {
    console.log(request.query);
    db_userresponse.userResponse(request.body.exid, request.body.model, request.body.correct_value, request.body.questions, request.body.level, request.query.userid).then(result => {
        response.json(result);
    })
});

router.route('/markcomplete').post((request, response) => {
    console.log(request.query);
    db_userresponse.markComplete(request.body.exid, request.body.level, request.query.userid).then(result => {
        response.json(result);
    })
});


router.route('/userprogress/tracksSubscribed').get((request, response) => {
    console.log(request.query);
    db_UserProgress.getTracksSubscribed(request.query.userId).then(result => {
        response.json(result);
    })
});

router.route('/userprogress/dateEnrolled').get((request, response) => {
    console.log(request.query);
    db_UserProgress.getDateEnrolled(request.query.tracks, request.query.userId).then(result => {
        response.json(result);
    })
});


router.route('/tracksummary').get((request, response) => {
    db_ExercisesSummary.track_summary().then(result => {
        response.json(result)
    })


})

router.route('/usertrackprogress').get((request, response) => {
    db_UserProgressHelper.user_track_progress(request.query.userid).then(result => {
        console.log(result)
        response.json(result)
    })

})

router.route('/conceptslearned').get((request, response) => {
    db_UserProgress.getConceptsLearned(request.query.userid).then(result => {
        console.log("result cl", result);
        response.json(result)
    })
})


router.route('/usermoduleprogress').get((request, response) => {
    db_UserProgressHelper.user_module_progress(request.query.userid).then(result => {
        console.log(result)
        response.json(result)
    })

})


router.route('/modulesummary').get((request, response) => {
    db_ExercisesSummary.module_summary().then(result => {
        response.json(result)
    })


})


router.route('/getrandomexcercises').get((request, response) => {
    if (request.query.module != undefined & request.query.track != undefined) {

        db_exercises.getRandomExercises(request.query.userid, request.query.module, request.query.track, request.query.total).then(res => {
            console.log(res)
            response.json(res)
        })
    }
    else {
        response.json({
            msessage: 'please provide valid information',
            status: 204
        })
    }
})
router.route('/createchallenge').get((request, response) => {
    if (request.query.module != undefined & request.query.modulename != undefined) {

        db_UserModules.CreateChallange(request.query.userid, request.query.module, request.query.track, request.query.modulename, request.query.total,request.query.duration).then(res => {
            console.log(res)
            response.json(res)
        })
    }
    else {
        response.json({
            msessage: 'please provide valid information',
            status: 204
        })
    }
})
router.route('/getchallenges').get((request, response) => {


    db_UserModules.getUserChallanges(request.query.userid, request.query.module, request.query.modulename).then(res => {
        console.log(res)
        response.json(res)
    })


})
router.route('/showchallenges').get((request, response) => {
    db_UserModules.showChallenge(request.query.modulename).then(res => {
        console.log(res)
        response.json(res)
    })
})



router.route('/checkeligibility').get((request, response) => {
    if (request.query.userid != undefined & request.query.module != undefined) {

        db_exercises.CheckEligibility(request.query.userid, request.query.module).then(res => {
            console.log(res)
            response.json(res)
        })
    }
    else {
        response.json({ message: 'please provide valid data', status: 203 })
    }
})


router.route('/setuserstatus').get((request, response) => {
    db_UserData.activateUser(request.query.userid, request.query.status).then(result => {
        console.log(result)
        response.json(result)
    })
})

router.route('/userprogress/exerciseCompleted').get((request, response) => {
    console.log(request.query);
    db_UserProgress.getExercisesCompleted(request.query.tracks, request.query.userId).then(result => {
        response.json(result);
    })
});

router.route('/userprogress/moduleProgress').get((request, response) => {
    console.log(request.query);
    db_UserProgress.getModuleWiseProgerss(request.query.tracks, request.query.userId).then(result => {
        response.json(result);
    })
});


router.route('/singleuser/newuser').post((request, response) => {
    console.log("query", request.query);
    db_UserData.createNewUser(request.body.userid, request.body.password, request.body.role, request.body.usergroup)
        .then(result => {
            response.status(result.status).json(result)
        })
});

router.route('/singleuser/deleteuser').delete((request, response) => {
    console.log("query", request.query);
    db_UserData.deleteUser(request.query.userid)
        .then(result => {
            response.json(result)
        })
});

router.route('/userlist').get((request, response) => {
    console.log("query", request.query);
    db_UserData.userList()
        .then(result => {
            response.json(result)
        })
});

router.route('/resetpassword').get((request, response) => {
    console.log("query", request.query);
    db_UserData.resetPassword(request.query.userid, request.query.currentPassword, request.query.password)
        .then(result => {
            response.json(result)
        })
});

router.route('/bulkUserCreate').get((request, response) => {
    console.log("userGroup " + request.query.user_group)
    bulkUserCreate.createBulkUser(request.query.user_group, JSON.parse(request.query.data)).then(result => {

        console.log("result " + result)
        // response.json(result);
        response.json(result);
    });
});

router.route('/sendmail').get((request, response) => {
    sendMail.sendMail(JSON.parse(request.query.filePath), request.query.type).then(result => {
        console.log(result);
        response.json(result);
    });
});
router.route('/bulkUserDelete').get((request, response) => {
    bulkUserDelete.deleteBulkUser(JSON.parse(request.query.data)).then(result => {
        console.log("result" + result);
        response.json(result);
    });
});

// router.route('/singleuser/testadduser').post((request, response) => {
//     console.log("query", request.query);
//     db_TestSingleUser.testAddUser()
//         .then(result => {
//             response.json(result)
//         })
// });



// router.route('/singleuser/testdeleteuser').delete((request, response) => {
//     console.log("query", request.query);
//     db_TestSingleUser.testDeleteUser()
//         .then(result => {
//             response.json(result)
//         })
// });

router.route('/usergroup/addusergroup').post((request, response) => {
    console.log(request.body);
    db_UserGroup.newUserGroup(request.body.user_group, request.body.type)
        .then(result => {
            console.log(result);
            response.status(result.status).json(result)
        })
});

router.route('/usergroup/deleteusergroup').delete((request, response) => {
    console.log(request.query);
    db_UserGroup.deleteUserGroup(request.query.user_group)
        .then(result => {
            console.log(result);
            response.json(result)
        })
});

// router.route('/usergroup/testaddusergroup').post((request, response) => {
//     console.log(request.query);
//     db_testUserGroupData.testAddUserGroup()
//         .then(result => {
//             console.log(result);
//             response.json(result)
//         })
// });

// router.route('/usergroup/testdeleteusergroup').delete((request, response) => {
//     console.log(request.query);
//     db_testUserGroupData.testDeleteUserGroup()
//         .then(result => {
//             console.log(result);
//             response.json(result)
//         })
// });


router.route('/getusergroups').get((request, response) => {
    db_UserGroup.getUserGroup().then(result => {
        console.log(result)
        response.json(result)
    })

})

router.route('/questions').get((request, response) => {
    console.log(request.query);
    db_questions.getQuestions(request.query.exercise, request.query.answers).then(result => {
        response.json(result);
    })
});

router.route('/asserts').get((request, response) => {
    console.log(request.query);
    db_asserts.getAssertionCode(request.query.exercise).then(result => {
        response.json(result);
    })
});

// router.route('/postLogin').get((request, response) => {
//     console.log(request.query);
//     dbUserHistory.postLogin(request.query.username, request.query.timestamp).then(result => {
//         response.json(result);
//     })
// });

// router.route('/postLogout').get((request, response) => {
//     console.log(request.query);
//     dbUserHistory.postLogout(request.query.username, request.query.timestamp).then(result => {
//         response.json(result);
//     })
// });

// router.route('/testuserhistory').get((request, response) => {
//     console.log(request.query);
//     testuserhistory.testuserhistory().then(result => {
//         response.json(result);
//     })
// });

router.route('/userLogin').get((request, response) => {
    console.log(request.query);
    // console.log(Buffer.from(request.query.password, 'base64').toString('ascii'))
    dbUserLogin.userLogin(request.query.username, request.query.password).then(result => {

        response.json(result);
    })
});

router.route('/userLogout').get((request, response) => {
    console.log(request.query);
    dbUserLogin.userLogout(request.query.username).then(result => {
        response.json(result);
    })
});

// router.route('/testUserLogin').get((request, response) => {
//     console.log(request.query);
//     testUserLogin.testUserLogin().then(result => {
//         response.json(result);
//     })
// });

router.route('/code').get((request, response) => {
    console.log(request.query);
    db_code.getCode(request.query.exercise).then(result => {
        //     console.log('Result for code is: \n' + result);
        //    console.log('Result for code after processing is: \n' + result.replace(/(?:\r\n|\r|\n)/g, '<br>'));

        response.json(result);
        //     response.json(result.replace(/\r\n/g, ''));
        //     response.send(result.replace(/\r\n/g, ''));
        //    response.send(result.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        //   response.send(new Buffer(result));
        //    response.sendFile(result, {root: code_dir});      //server responds by sending the index.html file to the client's browser
    })
});




router.route('/userlocklevel').get((request, response) => {
    console.log(request.query);
    db_filterExercise.getUserProgressLevel(request.query.userid).then(result => {
        response.json(result);
    })
});

router.route('/userlockcount').get((request, response) => {
    console.log(request.query);
    db_UserProgressHelper.user_lock_count(request.query.userid, request.query.track, request.query.module).then(result => {
        response.json(result);
    })
});

router.route('/filterexercises').get((request, response) => {
    console.log(request.query);
    db_filterExercise.exercisesWithFilter(request.query.userid, request.query.module, request.query.status, request.query.locklevel).then(result => {
        response.json(result);
    })
});

router.route('/adduserdetails').get((req,res)=>{
    console.log(req.query);
    db_UserData.AdduserDetails(req.query.data).then(result=>{
        res.json(result)
     })
})

app.get('/*', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', { root: __dirname });      //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});
//const code = download.downloadFile();
//console.log('Code is :\n' + code);
const port = process.env.PORT || 8090;
app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});
