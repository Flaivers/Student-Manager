import { Student } from "./student";
export interface IStorage {
  getStudents(): Promise<Student[]>;
  saveStudents(students: Student[]): void;
}
