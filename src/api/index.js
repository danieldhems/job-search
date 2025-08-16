var path = require("path");
var express = require("express");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bcrypt = require("bcrypt");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var puzzleApi = require("./api/puzzle.cjs");
const MongoDBStore = require("connect-mongodb-session")(session);
const { connUrl } = require("./database.cjs");
const dbClient = require('./database.cjs').default;

var app = express();

require("dotenv").config();

app.use(
  bodyParser.urlencoded({
    uploadDir: path.join(__dirname, "uploads"),
    keepExtensions: true,
    extended: true,
    limit: "50mb",
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(methodOverride("_method"))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoDBStore({
    uri: connUrl,
    databaseName: "puzzly",
    collection: "sessions",
  }),
  cookie: {},
}));

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = dbClient.db("puzzly");
    const collection = db.collection("users");

    const user = await collection.findOne({ _id: id });

    if (user) {
      return done(null, user);
    }

    return done(null, false)
  } catch (err) {
    return done(err);
  }
});

app.use(passport.session());

passport.use(new LocalStrategy(async function verify(username, password, next) {
  try {
    const conn = await dbClient.connect();
    const db = conn.db("puzzly");
    const collection = db.collection("users");

    const user = await collection.findOne({ username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return next(null, user);
      }
    }

    return next(null, false);
  } catch (err) {
    return next(err);
  }
}));

// Configure API endpoints
app.use("/api/puzzle", puzzleApi.router);

app.post('/login',
  function (req, res, next) {
    passport.authenticate('local', {
      successRedirect: "/",
      failureRedirect: "/login",
      failureMessage: true
    })(req, res, next)
  });

app.delete("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/login");
  });
});

function checkAuthorised(req, res, next) {
  if (req.user) {
    next(null, req.user);
  } else {
    res.redirect("/login");
  }
}

module.exports = app;
