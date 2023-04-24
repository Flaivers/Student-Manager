import { Student } from "./Student";
import { StudentManager } from "./StudentManager";
import { ToastManager } from "./ToastManager";
import { getElementById } from "./utils";
import { StudentsLocalStorage } from "./StudentsLocalStorage";
import { StudentsSessionStorage } from "./StudentsSessionStorage";
import { ServerManager } from "./ServerManager";
export class BrowserPlatform {
  private manager: StudentManager = new StudentManager(new ServerManager());
  constructor() {
    this.setup();
    this.createSelectOption();
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

    const showData = getElementById("updateData");
    showData.addEventListener("click", this.onChange.bind(this));
  }

  async setup() {
    await this.manager.setup();
    this.createTable();
  }

  createStudent(): void {
    const name = getElementById<HTMLInputElement>("Name").value;
    const surname = getElementById<HTMLInputElement>("Surname").value;
    const birthday = getElementById<HTMLInputElement>("Birthday").value;
    const group = getElementById<HTMLInputElement>("Group").value;
    let numGroup = Number(group);
    // if (birthday == null) {
    //   birthday = new Date("2000-02-01");
    //}
    //let date = birthday.toLocaleDateString("en-GB");
    this.manager.createStudent(name, surname, birthday, numGroup);
    ToastManager.instance.showSuccessMessage("Students create", {
      delay: 3000,
      isButtonVisible: true,
    });
  }

  deleteStudent(): void {
    const studentId = getElementById<HTMLInputElement>("deleteId").value;
    let id = Number(studentId);
    let result = this.manager.deleteStudent(id);
    if (result === true) {
      ToastManager.instance.showSuccessMessage("Student is deleted", {
        delay: 3000,
        isButtonVisible: true,
      });
    } else {
      ToastManager.instance.showErrorMessage("Student is not deleted", {
        delay: 3000,
        isButtonVisible: true,
      });
    }
  }

  updateStudent(): void {
    const inputId = getElementById<HTMLInputElement>("updateId").value;
    const whatToChange = getElementById<HTMLInputElement>("updateData").value;
    const newValue = getElementById<HTMLInputElement>("enterChanges").value;
    let id = Number(inputId);
    let result = this.manager.updateStudent(id, whatToChange, newValue);
    if (result === true) {
      ToastManager.instance.showSuccessMessage("Student update", {
        delay: 3000,
        isButtonVisible: true,
      });
    } else {
      ToastManager.instance.showErrorMessage("Student is not update", {
        delay: 3000,
        isButtonVisible: true,
      });
    }
  }

  private createTable(): void {
    let tbody = document.querySelector("tbody");
    tbody!.innerHTML = "";
    for (let i = 0; i < this.manager.students.length; i++) {
      let tr = document.createElement("tr");
      let currentStudent = this.manager.students[i];
      tr.innerHTML =
        "<td>" +
        currentStudent.id +
        "</td>" +
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

  private createSelectOption(): void {
    const student = [new Student(0, "Bob", "Anderson", "2000-02-01", 1)];
    const elements = document.getElementById("updateData") as HTMLSelectElement;
    for (let key in student[0]) {
      if (key == "id") continue;
      let newOption = new Option(key);
      elements.options.add(newOption);
    }
  }

  private onChange(): void {
    let elements = document.getElementById("updateData") as HTMLSelectElement;
    if (elements == null) {
      throw new Error("id not found");
    }
    let text = elements.options[elements.selectedIndex].text;
    if (text == "birthday") {
      getElementById<HTMLInputElement>("enterChanges").type = "date";
      getElementById<HTMLElement>("enterChanges").classList.add("input-date");
    } else {
      getElementById<HTMLInputElement>("enterChanges").type = "text";
    }
  }

  private checkInput(value: string): boolean {
    const str = getElementById<HTMLInputElement>(value).value;
    const regexp = /^[A-zА-я]+$/gi;
    const result = regexp.test(str);
    return result;
  }

  private checkInputNumber(value: string): boolean {
    const str = getElementById<HTMLInputElement>(value).value;
    const regexp = /[0-9]/gi;
    const result = regexp.test(str);
    return result;
  }

  private checkInputDate(value: string): boolean {
    const str = getElementById<HTMLInputElement>(value).value;
    const regexp = /^(?:\d{4})-(?:\d{2})-(?:\d{2})$/;
    const result = regexp.test(str);
    return result;
  }

  private checkInputCreate(): boolean {
    const nameB = this.checkInput("Name");
    const surnameB = this.checkInput("Surname");
    const birthdayB = this.checkInputDate("Birthday");
    const groupB = this.checkInputNumber("Group");
    if (
      nameB == false ||
      surnameB == false ||
      birthdayB == false ||
      groupB == false
    ) {
      if (nameB == false) {
        ToastManager.instance.showWarningMessage("Name is incorrect", {
          delay: 3000,
          isButtonVisible: true,
        });
      }
      if (surnameB == false) {
        ToastManager.instance.showWarningMessage("Surname is incorrect", {
          delay: 3000,
          isButtonVisible: true,
        });
      }
      if (birthdayB == false) {
        ToastManager.instance.showWarningMessage("Birthday is incorrect", {
          delay: 3000,
          isButtonVisible: true,
        });
      }
      if (groupB == false) {
        ToastManager.instance.showWarningMessage("Group is incorrect", {
          delay: 3000,
          isButtonVisible: true,
        });
      }
    } else {
      return true;
    }
    return false;
  }

  private checkInputDelete(): boolean {
    const deleteB = this.checkInputNumber("deleteId");
    if (deleteB == false) {
      ToastManager.instance.showWarningMessage("id is incorrect", {
        delay: 3000,
        isButtonVisible: true,
      });
    } else {
      return true;
    }
    return false;
  }

  private checkInputUpdate(): boolean {
    const updateB = this.checkInputNumber("updateId");
    const valueB = this.checkSelect();
    if (updateB == false || valueB == false) {
      if (updateB == false) {
        ToastManager.instance.showWarningMessage("id is incorrect", {
          delay: 3000,
          isButtonVisible: true,
        });
      }
      if (valueB == false) {
        ToastManager.instance.showWarningMessage("Value is incorrect", {
          delay: 3000,
          isButtonVisible: true,
        });
      }
    } else {
      return true;
    }
    return false;
  }

  private checkSelect(): boolean {
    let elements = document.getElementById("updateData") as HTMLSelectElement;
    if (elements == null) {
      throw new Error("id not found");
    }
    let text = elements.options[elements.selectedIndex].text;
    if (text == "group") {
      const valueNum = this.checkInputNumber("enterChanges");
      return valueNum;
    }
    if (text == "birthday") {
      const valueDate = this.checkInputDate("enterChanges");
      return valueDate;
    } else {
      const valueStr = this.checkInput("enterChanges");
      return valueStr;
    }
  }

  private handleCreateStudentClick(): void {
    if (this.checkInputCreate() == true) {
      this.createStudent();
      this.hideStudentCreate();
      this.createTable();
    }
  }

  private handleDeleteStudentClick(): void {
    if (this.checkInputDelete() == true) {
      this.deleteStudent();
      this.hideStudentDelete();
      this.createTable();
    }
  }

  private handleUpdateStudentClick(): void {
    if (this.checkInputUpdate() == true) {
      this.updateStudent();
      this.hideStudentUpdate();
      this.createTable();
    }
  }

  private showStudentCreate(): void {
    this.hideStudentDelete();
    this.hideStudentUpdate();
    let elements = document.getElementsByClassName(
      "inputLine"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "flex";
  }

  private hideStudentCreate(): void {
    let elements = document.getElementsByClassName(
      "inputLine"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "none";
  }

  private showStudentDelete(): void {
    this.hideStudentCreate();
    this.hideStudentUpdate();
    let elements = document.getElementsByClassName(
      "delete"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "flex";
  }

  private hideStudentDelete(): void {
    let elements = document.getElementsByClassName(
      "delete"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "none";
  }

  private showStudentUpdate(): void {
    this.hideStudentCreate();
    this.hideStudentDelete();
    let elements = document.getElementsByClassName(
      "update"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "flex";
  }

  private hideStudentUpdate(): void {
    let elements = document.getElementsByClassName(
      "update"
    ) as HTMLCollectionOf<HTMLElement>;
    elements[0].style.display = "none";
  }
}
