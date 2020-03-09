const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const nodeMailer = require('nodemailer')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const groupsRouter = require('./routes/groups');
const usersRouter = require('./routes/users');

app.use(passport.initialize());
require("./config/passport")(passport);

app.use('/groups', groupsRouter);
app.use('/users', usersRouter);

app.post('/send-email', function(req,res){
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'aya.tsubakino@gmail.com',
      pass: 'e2g1LXvu'
    }
  });
  let mailOptions = {
    from: '"Study Buddies" <invitation@studybuddies.com>',
    to: req.body.emails,
    subject: "Invitation to the study group",
    html: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.end(); 
});

const path = require("path")
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
