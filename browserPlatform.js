class BrowserPlatform {
    constructor() {
      this.manager = new StudentManager();
      this.createTable();
  
      const createB = document.getElementById("createButton");
      createB.addEventListener("click", this.handleCreateStudentClick.bind(this));
    
      const deleteB = document.getElementById("deleteButton");
      deleteB.addEventListener("click", this.handleDeleteStudentClick.bind(this));
  
      const updateB = document.getElementById("updateButton");
      updateB.addEventListener("click", this.handleUpdateStudentClick.bind(this));
  
      const showStudentC = document.getElementById("showStudentCreate");
      showStudentC.addEventListener("click", this.showStudentCreate.bind(this));
  
      const showStudentD = document.getElementById("showStudentDelete");
      showStudentD.addEventListener("click", this.showStudentDelete.bind(this));
  
      const showStudentU = document.getElementById("showStudentUpdate");
      showStudentU.addEventListener("click", this.showStudentUpdate.bind(this));
    }
  
    createStudent() {
      const name = document.getElementById("Name").value;
      const surname = document.getElementById("Surname").value;
      const birthday = document.getElementById("Birthday").value;
      const group = document.getElementById("Group").value;
      this.manager.createStudent(name, surname, birthday, group);
      alert("Students create");
    }
  
    deleteStudent() {
      const foundStudentSurname = document.getElementById("deleteSurname").value;
      let result = this.manager.deleteStudent(foundStudentSurname);
      if (result === true) {
        alert("Student is deleted");
      } else {
        alert("Student is not deleted");
      }
    }
  
    updateStudent() {
      const foundStudent = document.getElementById("updateSurname").value;
      const changeSelection = document.getElementById("updateData").value;
      const whatToChange = document.getElementById("enterChanges").value;
      let result = this.manager.updateStudent(foundStudent, changeSelection, whatToChange);
      if (result === true) {
        alert("Student update");
      } else {
        alert("Student is not update");
      }
    }
  
    createTable() {
      let tbody = document.querySelector("tbody");
      tbody.innerHTML = "";
      for (let i = 0; i < this.manager.students.length; i++) {
        let tr = document.createElement("tr");
        let currentStudent = this.manager.students[i];
        tr.innerHTML =
          "<td>" +
          currentStudent.name +
          "</td>" +
          "<td>" +
          currentStudent.surname +
          "</td>" +
          "<td>" +
          currentStudent.birthday +
          "</td>" +
          "<td>" +
          currentStudent.group +
          "</td>";
        tbody.appendChild(tr);
      }
    }
  
    handleCreateStudentClick () { 
      this.createStudent();
      this.hideStudentCreate();
      this.createTable();
    }
  
    handleDeleteStudentClick () {
      this.deleteStudent();
      this.hideStudentDelete();
      this.createTable();
    }
  
    handleUpdateStudentClick () {
      this.updateStudent();
      this.hideStudentUpdate();
      this.createTable()
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
  }