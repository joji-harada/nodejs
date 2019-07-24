const credentials = require('../lib/credentials');
const mongoose = require('mongoose');

// remote db connection settings. For security, connectionString should be in a separate file not commited to git
//const connectionString = "mongodb+srv

mongoose.connect(credentials.connectionString, { dbName: 'sccprojects', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define computer model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
    title: { type: String, required: true },
    type: String,
    price: String,
}); 

module.exports = mongoose.model('Computer', mySchema);