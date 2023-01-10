class StudentManager {
  constructor() {
  }

  students = [new Student("Bob", "Anin", 2000, 1)];

  createStudent(name, surname, birthday, group) {
    const student = new Student(name, surname, birthday, group);
    this.students.push(student);
  }

  deleteStudent(foundStudentSurname ) {
    const student = this.students.find((o) => o.surname === foundStudentSurname);
    if (student !== undefined) {
      this.students.splice(student, 1);
      return true;
    } else {
      return false;
    }
  }

  updateStudent(foundStudent, changeSelection, whatToChange) {
    const student = this.students.find((o) => o.surname === foundStudent);
    if (foundStudent == true) {
      switch (changeSelection) {
        case "name":
        case "surname":
        case "birthday":
        case "group":
          student[changeSelection] = whatToChange;
        break; 
      }
      return true;
    }else {
      return false;
    }
  }
}