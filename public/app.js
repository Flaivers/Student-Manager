const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const fileName = "public/dataBase.json";

function loadStudents() {
  const load = fs.readFileSync(fileName);
  const students = JSON.parse(load);
  return students;
}

function saveStudents(students) {
  const json = JSON.stringify(students);
  fs.writeFileSync(fileName, json);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/students", function (req, res) {
  let students = loadStudents();
  res.json(students);
});

app.post("/students/create", function (req, res) {
  let students = loadStudents();
  if (!req.body) return res.sendStatus(400);
  const studentArray = req.body;
  if (studentArray !== undefined) {
    students.push(studentArray);
    res.json(true);
    saveStudents(students);
  } else {
    res.json(false);
  }
});

app.delete("/students/delete", function (req, res) {
  let students = loadStudents();
  if (!req.body) return res.sendStatus(400);
  const studentArray = req.body;
  const indexStudent = students.findIndex((user) => user.id == studentArray.id);
  if (indexStudent !== undefined) {
    students.splice(indexStudent, 1);
    res.json(true);
    saveStudents(students);
  } else {
    res.json(false);
  }
});

app.put("/students/change", function (req, res) {
  let students = loadStudents();
  if (!req.body) return res.sendStatus(400);
  const studentArray = req.body;
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
    saveStudents(students);
  } else {
    res.json(false);
  }
});

app.listen(3000, () => console.log("Server started..."));
