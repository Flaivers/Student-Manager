import { Student } from "./student";
import { BaseBrowserStorage } from "./browserStorage";
export class StudentsSessionStorage extends BaseBrowserStorage {
  getStudents(): Promise<Student[]> {
    return Promise.resolve(super.getStudents());
  }

  saveStudents(students: Student[]): void {
    super.saveStudents(students);
  }

  getStorage() {
    return sessionStorage;
  }
}
