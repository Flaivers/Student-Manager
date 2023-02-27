import { Student } from "./student";
import { IStorage } from "./interface";
export class StudentManager {
  constructor(typeStorage: IStorage) {
    this._storage = typeStorage;
  }
  private _students = [new Student("Bob", "Ann", 2000, 1)];
  get students(): Student[] {
    return this._students;
  }
  
  private _storage: IStorage | null = null;
  private storage(): IStorage {
    if (this._storage == null) {
      throw new Error("storage not found");
    }
    return this._storage;
  }

  async setup() {
    this._students = await this.storage().getStudents();
  }

  createStudent(
    name: string,
    surname: string,
    birthday: number,
    group: number
  ): void {
    const student = new Student(name, surname, birthday, group);
    this.students.push(student);
    this.storage().saveStudents(this.students);
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
      this.storage().saveStudents(this.students);
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
      this.storage().saveStudents(this.students);
      return true;
    } else {
      return false;
    }
  }
}
