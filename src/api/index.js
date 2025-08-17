import http from "http";
import express from "express";
import mysql from "mysql2/promise";

var app = express();

const connection = await mysql.createConnection({
  user: "jobsearch1",
  password: "Cat09021988",
  host: "localhost",
  database: "job_search"
});

app.get("/api/calls", async function apiGetCalls(req, res) {
  try {
    const [results] = await connection.query("SELECT * FROM calls");
    console.log("calls query result", results);

    res.send(results);
  } catch (error) {
    console.log("calls query error", error)
    res.status(500).send(error);
  }
});

http.createServer(app).listen(3000);
