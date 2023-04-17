const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const fileName = "public/dataBase.json";
let students = [];

function loadingStudents() {
  const load = fs.readFileSync(fileName);
  const loadStudents = JSON.parse(load);
  students = loadStudents;
}
loadingStudents();

function saveStudents() {
  const json = JSON.stringify(students);
  fs.writeFileSync(fileName, json);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/students", function (req, res) {
  loadingStudents();
  res.json(students);
});

app.post("/students/create", function (req, res) {
  loadingStudents();
  if (!req.body) return res.sendStatus(400);
  let studentArray = req.body;
  if (studentArray !== undefined) {
    students.push(studentArray);
    res.json(true);
    saveStudents();
  } else {
    res.json(false);
  }
});

app.delete("/students/delete", function (req, res) {
  loadingStudents();
  if (!req.body) return res.sendStatus(400);
  let studentArray = req.body;
  let id = students.findIndex((user) => user.id == studentArray.id);
  if (id !== undefined) {
    students.splice(id, 1);
    res.json(true);
    saveStudents();
  } else {
    res.json(false);
  }
});

app.put("/students/change", function (req, res) {
  loadingStudents();
  if (!req.body) return res.sendStatus(400);
  let studentArray = req.body;
  let student = students.find((user) => user.id == studentArray.student.id);
  if (student !== undefined) {
    switch (studentArray.property) {
      case "name":
      case "surname":
      case "birthday":
      case "group":
        (student[studentArray.property]) = studentArray.valueProperty;
        break;
    }
    res.json(true);
    saveStudents();
  } else {
    res.json(false);
  }
});

app.listen(3000, () => console.log("Server started..."));
