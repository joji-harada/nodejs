let Computer = require('./models/computer');

Computer.countDocuments((err, result) => {
    console.log(result);
})

Computer.find({}, (err, result) => {
    //output error if one occurs
    if (err) {
        console.log(err);
    } else {
        //otherwise output the array of documents
        console.log(result);
    }
})