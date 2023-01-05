class StudentManager {
  constructor() {
    this.createTable();

    const createB = document.getElementById("createButton");
    createB.addEventListener("click", this.createButton);
  
    const deleteB = document.getElementById("deleteButton");
    deleteB.addEventListener("click", this.deleteButton);

    const updateB = document.getElementById("updateButton");
    updateB.addEventListener("click", this.updateButton);

    const showStudentCreate = document.getElementById("showStudentCreate");
    //showStudentCreate.addEventListener("click", this.showStudentCreate());
    showStudentCreate.onclick = function () {
      this.showStudentCreate();
    }.bind(this);

    const showStudentDelete = document.getElementById("showStudentDelete");
    showStudentDelete.onclick = function () {
      this.showStudentDelete();
    }.bind(this);

    const showStudentUpdate = document.getElementById("showStudentUpdate");
    showStudentUpdate.onclick = function () {
      this.showStudentUpdate();
    }.bind(this);
  }

  students = [new Student("Bob", "Anin", 2000, 1)];

  createStudent() {
    const name = document.getElementById("Name").value;
    const surname = document.getElementById("Surname").value;
    const birthday = document.getElementById("Birthday").value;
    const group = document.getElementById("Group").value;
    const student = new Student(name, surname, birthday, group);
    this.students.push(student);
    alert("Students create");
  }

  deleteStudent() {
    const foundStudentSurname = document.getElementById("deleteSurname").value;
    const student = this.students.find((o) => o.surname === foundStudentSurname);
    if (student !== undefined) {
      this.students.splice(student, 1);
      alert("Student is deleted");
    } else {
      alert("There is no such value");
    }
  }

  updateStudent() {
    const foundStudent = document.getElementById("updateSurname").value;
    const student = this.students.find((o) => o.surname === foundStudent);
    if (foundStudent == true) {
      const changeSelection = document.getElementById("updateData").value;
      switch (changeSelection) {
        case "name":
        case "surname":
        case "birthday":
        case "group":
          const whatToChange = document.getElementById("enterChanges").value;
          student[changeSelection] = whatToChange;
          alert("Student update");
          break;

        default:
          alert("There is no such value");
      }
    } else {
      alert("There is no such value");
    }
  }

  createTable() {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < this.students.length; i++) {
      let tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        this.students[i].name +
        "</td>" +
        "<td>" +
        this.students[i].surname +
        "</td>" +
        "<td>" +
        this.students[i].birthday +
        "</td>" +
        "<td>" +
        this.students[i].group +
        "</td>";
      tbody.appendChild(tr);
    }
  }


  showStudentCreate(){
    let elements = document.getElementsByClassName("inputLine");
    elements[0].style.display = "flex";
  }
 
  hideStudentCreate(){
     let elements = document.getElementsByClassName("inputLine");
     elements[0].style.display = "none";
  }
 
  showStudentDelete(){
     let elements = document.getElementsByClassName("delete");
     elements[0].style.display = "flex";
  }
 
  hideStudentDelete(){
     let elements = document.getElementsByClassName("delete");
     elements[0].style.display = "none";
  }
 
  showStudentUpdate(){
     let elements = document.getElementsByClassName("update");
     elements[0].style.display = "flex";
  }
 
  hideStudentUpdate(){
     let elements = document.getElementsByClassName("update");
     elements[0].style.display = "none";
  }
  
  
  createButton () { 
    this.createStudent();
    this.hideStudentCreate();
    this.createTable();
  }

  deleteButton () {
    this.deleteStudent();
    this.hideStudentDelete();
    this.createTable();
  }

  updateButton () {
    this.updateStudent();
    this.hideStudentUpdate();
    this.createTable()
  }



}