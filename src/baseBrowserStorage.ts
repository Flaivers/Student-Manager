import { Student } from "./student";
import { IStorage } from "./interface";
export abstract class BaseBrowserStorage implements IStorage {
  private _key: string = "test";

  getStudents(): Promise<Student[]> {
    let retrievedObject = this.getStorage().getItem(this._key);
    if (retrievedObject !== "" && retrievedObject !== null) {
      let students = JSON.parse(retrievedObject);
      let result = [];
      for (
        let elementNumber = 0;
        elementNumber < students.length;
        elementNumber++
      ) {
        const student1 = new Student(
          students[elementNumber].name,
          students[elementNumber].surname,
          students[elementNumber].birthday,
          students[elementNumber].group
        );
        result.push(student1);
      }
      return Promise.resolve(result);
    }
    return Promise.resolve([]);
  }

  saveStudents(students: Student[]): void {
    this.getStorage().setItem(this._key, JSON.stringify(students));
  }

  abstract getStorage(): Storage;
}
