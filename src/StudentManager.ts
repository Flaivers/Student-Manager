import { Student } from "./Student";
import { IServer } from "./interface";
import { ClientStorage } from "./interface";
export class StudentManager {
  constructor(
    typeStorage: IServer
    //typeStorage: ClientStorage
  ) {
    this._storage = typeStorage;
  }
  private _students = [new Student(0, "Bob", "Ann", "2000-02-01", 1)];
  get students(): Student[] {
    return this._students;
  }
  private _storage: IServer | null = null;
  //private _storage: ClientStorage | null = null;

  private get storage() {
    if (this._storage === null) {
      throw new Error("storage not found");
    }
    return this._storage;
  }

  async setup() {
    this._students = await this.storage.getStudents();
  }

  createStudent(
    name: string,
    surname: string,
    birthday: string,
    group: number
  ): void {
    const id = this.createId();
    const student = new Student(id, name, surname, birthday, group);
    let response = this.storage.createStudent(student);
    let resBoolean = Boolean(response);
    if (resBoolean == true) {
      this.students.push(student);
    }
    //this.storage.saveStudents(this.students);
  }

  deleteStudent(studentId: number): boolean {
    const student: Student | undefined = this.students.find(
      (o) => o.id === studentId
    );
    if (student !== undefined) {
      const studentIndex = this.students.findIndex((o) => o.id === studentId);
      let response = this.storage.deleteStudent(student);
      let resBoolean = Boolean(response);
      if (resBoolean === true) {
        this.students.splice(studentIndex, 1);
      }
      //this.storage.saveStudents(this.students);
      return true;
    } else {
      return false;
    }
  }

  updateStudent(
    inputId: number,
    whatToChange: string,
    newValue: string | number
  ): boolean {
    const student: Student | undefined = this.students.find(
      (o) => o.id === inputId
    );
    if (student !== undefined) {
      let response = this.storage.updateStudent(
        student,
        whatToChange,
        newValue
      );
      let resBoolean = Boolean(response);
      if (resBoolean == true) {
        switch (whatToChange) {
          case "name":
          case "surname":
          case "birthday":
          case "group":
            (student[whatToChange] as any) = newValue;
            break;
        }
      }
      //this.storage.saveStudents(this.students);
      return true;
    } else {
      return false;
    }
  }

  private createId(): number {
    let id = 10;
    for (let i = 1; i < this.students.length + 2; i++) {
      let user = this.students.find((user) => user.id == i);
      if (user == undefined) {
        id = i;
      }
    }
    return id;
  }
}
