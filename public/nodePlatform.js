import {StudentManager} from "./studentManager.js";
import readlineSync from 'readline-sync';

class NodePlatform {
    constructor() {
      this.manager = new StudentManager();     
  }

  createStudent(){
    const name = readlineSync.question('Name: ', "");
    const surname = readlineSync.question('Surname: ', "");
    const birthday = readlineSync.question('Birthday: ', "");
    const group = readlineSync.question('Group: ', "");
    this.manager.createStudent(name, surname, birthday, group);
    console.log("Students create");
  }

  showStudents(){
    this.manager.students.forEach(element => console.log(JSON.stringify(element)));
  }

  deleteStudent(){
    const foundStudentSurname = readlineSync.question('Enter the surname:\n', "");
    const result = this.manager.deleteStudent(foundStudentSurname);
    if (result === true){
      console.log("Student is deleted");
    } else {
      console.log("Student is not deleted");
    }
  }

  updateStudent() {
    const foundStudent = readlineSync.question('Enter the surname:\n', "");
    const changeSelection = readlineSync.question('What do you want to change (' +  "name, surname, birthday, group" + '):\n', "");
    const whatToChange = readlineSync.question('Enter changes:\n', ""); 
    let result = this.manager.updateStudent(foundStudent, changeSelection, whatToChange);
    if (result === true) {
      console.log("Student update");
    } else {
      console.log("Student is not update");
    }
  }

  printMainMenu(){
    const menu = readlineSync.question(
      "1. Create student, 2. Show all students, 3. Delete student, 4. Update student, Enter: (1/2/3/4) "
    );
    switch (menu) {
      case "1":
        this.createStudent();
        this.printMainMenu();
        break;
      case "2":
        this.showStudents();
        this.printMainMenu();
        break;
      case "3":
        this.deleteStudent();
        this.printMainMenu();
        break;
      case "4":
        this.updateStudent();
        this.printMainMenu();
        break;
      default:
        process.exit(0);
    }
  }
}

const platform2 = new NodePlatform();
platform2.printMainMenu();