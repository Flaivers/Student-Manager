import { Student } from "./student";
export class StudentManager {
  constructor() {}

  students = [new Student("Bob", "Ann", 2000, 1)];

  createStudent(
    name: string,
    surname: string,
    birthday: number,
    group: number
  ): void {
    const student = new Student(name, surname, birthday, group);
    this.students.push(student);
  }

  deleteStudent(studentSurname: string) {
    const student: Student | undefined = this.students.find(
      (o) => o.surname === studentSurname
    );
    if (student !== undefined) {
      const studentIndex = this.students.findIndex(
        (o) => o.surname === studentSurname
      );
      this.students.splice(studentIndex, 1);
      return true;
    } else {
      return false;
    }
  }

  updateStudent(
    inputSurname: string,
    changeSelection: keyof Student,
    whatToChange: string | number
  ) {
    const student: Student | undefined = this.students.find(
      (o) => o.surname === inputSurname
    );
    if (student !== undefined) {
      switch (changeSelection) {
        case "name":
        case "surname":
        case "birthday":
        case "group":
          (student[changeSelection] as any) = whatToChange;
          break;
      }
      return true;
    } else {
      return false;
    }
  }
}
