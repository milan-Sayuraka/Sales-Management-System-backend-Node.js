const config = require('./config.js');
const express = require('express');
const cloudinary = require("cloudinary");
const bodyParser = require('body-parser');
const cors = require("cors");
const helper = require('./app/helper/statusUpdater');
var fileupload = require('express-fileupload');


// create express app
const app = express();
// var cloudinary = require('cloudinary').v2;

const http = require('http').createServer(app);
const io = require('socket.io')(http);



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

var corsOptions = {
  origin:['http://localhost:4200','http://localhost:8081','http://897c10ebd230.ngrok.io'],
  credentials:true
};

app.use(fileupload({useTempFiles: true}));

app.use(cors(corsOptions));

app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', "http://localhost:4200");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const db = require("./app/models");
const Role = db.role;

mongoose.Promise = global.Promise;



// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
    initial();
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

require('./app/routes/appointment.schedule.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/attendance.routes')(app);
require('./app/routes/supplier.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/collectionTracking.routes')(app);
require('./app/routes/supplierPurchaseOrder.routes')(app);
require('./app/routes/customerPurchaseOrder.routes')(app);
require('./app/routes/billing.routes')(app);
require('./app/routes/customers.routes')(app);
require('./app/routes/imageUpload.routes')(app);

console.log(`NODE_ENV=${config.NODE_ENV}`);
app.get('/', (req, res) => {
  res.send(process.env.SOCKET_IO_KEY);
});

io.on('connection', (socket) => {
  socket.on(process.env.SOCKET_IO_KEY, (msg) => {
    console.log('message: ' + msg);
    id = msg
  });
  helper.userStatus(socket.handshake.query.uId,1)
  console.log('a user connected'  );
  socket.on('disconnect', () => {
    console.log('user disconnected' );
    helper.userStatus(socket.handshake.query.uId,0)
  });

});


http.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});