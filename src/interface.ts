import { Student } from "./Student";
export interface IStorage {
  getStudents(): Promise<Student[]>;
  saveStudents(students: Student[]): void;
}

export interface MessageOptions {
  delay: number;
  isButtonVisible: boolean;
}
