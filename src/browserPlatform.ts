import { StudentManager } from "./studentManager";
import { getElementById } from "./utils";
export class BrowserPlatform {
  constructor(public manager: any = new StudentManager()) {
    this.createTable();

    const createB = getElementById("createButton");
    createB.addEventListener("click", this.handleCreateStudentClick.bind(this));

    const deleteB = getElementById("deleteButton");
    deleteB.addEventListener("click", this.handleDeleteStudentClick.bind(this));

    const updateB = getElementById("updateButton");
    updateB.addEventListener("click", this.handleUpdateStudentClick.bind(this));

    const showStudentC = getElementById("showStudentCreate");
    showStudentC.addEventListener("click", this.showStudentCreate.bind(this));

    const showStudentD = getElementById("showStudentDelete");
    showStudentD.addEventListener("click", this.showStudentDelete.bind(this));

    const showStudentU = getElementById("showStudentUpdate");
    showStudentU.addEventListener("click", this.showStudentUpdate.bind(this));
  }

  createStudent() {
    const name = getElementById("Name").value;
    const surname = getElementById("Surname").value;
    const birthday = getElementById("Birthday").value;
    const group = getElementById("Group").value;
    this.manager.createStudent(name, surname, birthday, group);
    alert("Students create");
  }

  deleteStudent() {
    const foundStudentSurname = getElementById("deleteSurname").value;
    let result = this.manager.deleteStudent(foundStudentSurname);
    if (result === true) {
      alert("Student is deleted");
    } else {
      alert("Student is not deleted");
    }
  }

  updateStudent() {
    const inputSurname = getElementById("updateSurname").value;
    const changeSelection = getElementById("updateData").value;
    const whatToChange = getElementById("enterChanges").value;
    let result = this.manager.updateStudent(
      inputSurname,
      changeSelection,
      whatToChange
    );
    if (result === true) {
      alert("Student update");
    } else {
      alert("Student is not update");
    }
  }

  private createTable() {
    let tbody = document.querySelector("tbody");
    tbody!.innerHTML = "";
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
      tbody!.appendChild(tr);
    }
  }

  private handleCreateStudentClick(): void {
    this.createStudent();
    this.hideStudentCreate();
    this.createTable();
  }

  private handleDeleteStudentClick(): void {
    this.deleteStudent();
    this.hideStudentDelete();
    this.createTable();
  }

  private handleUpdateStudentClick(): void {
    this.updateStudent();
    this.hideStudentUpdate();
    this.createTable();
  }

  private showStudentCreate() {
    let elements = document.getElementsByClassName(
      "inputLine"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "flex";
  }

  private hideStudentCreate() {
    let elements = document.getElementsByClassName(
      "inputLine"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "none";
  }

  private showStudentDelete() {
    let elements = document.getElementsByClassName(
      "delete"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "flex";
  }

  private hideStudentDelete() {
    let elements = document.getElementsByClassName(
      "delete"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "none";
  }

  private showStudentUpdate() {
    let elements = document.getElementsByClassName(
      "update"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "flex";
  }

  private hideStudentUpdate() {
    let elements = document.getElementsByClassName(
      "update"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "none";
  }
}
