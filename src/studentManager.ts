import { Student } from "./student";
import { IStorage } from "./interface";
import { StudentsLocalStorage } from "./localStorage";
import { StudentsSessionStorage } from "./sessionStorage";
export class StudentManager {
  constructor(typeStorage: IStorage) {
    this._storage = typeStorage;
  }
  private _students = [new Student("Bob", "Ann", 2000, 1)];
  get students(): Student[] {
    return this._students;
  }

  private _storage: IStorage = new StudentsLocalStorage(); //localStorage 
  //private _storage: IStorage = new StudentsSessionStorage(); //sessionStorage

  async setup(){
    this._students = await this._storage.getStudents();
  }

  createStudent(
    name: string,
    surname: string,
    birthday: number,
    group: number
  ): void {
    const student = new Student(name, surname, birthday, group);
    this.students.push(student);
    this._storage.saveStudents(this.students);
  }

  deleteStudent(studentSurname: string): boolean {
    const student: Student | undefined = this.students.find(
      (o) => o.surname === studentSurname
    );
    if (student !== undefined) {
      const studentIndex = this.students.findIndex(
        (o) => o.surname === studentSurname
      );
      this.students.splice(studentIndex, 1);
      this._storage.saveStudents(this.students);
      return true;
    } else {
      return false;
    }
  }

  updateStudent(
    inputSurname: string,
    changeSelection: string,
    whatToChange: string | number
  ): boolean {
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
      this._storage.saveStudents(this.students);
      return true;
    } else {
      return false;
    }
  }
}
