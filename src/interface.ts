import { Student } from "./Student";
export interface ClientStorage {
  getStudents(): Promise<Student[]>;
  saveStudents(students: Student[]): void;
}

export interface MessageOptions {
  delay: number;
  isButtonVisible: boolean;
}

export interface IServer {
  createStudent(student: Student): Promise<boolean>;
  deleteStudent(student: Student): Promise<boolean>;
  updateStudent(
    student: Student,
    whatToChange: string,
    newValue: string | number
  ): Promise<boolean>;
  getStudents(): Promise<Student[]>;
  //removeStudents(): Promise<Student[]>;
}

export interface UpdateStudentDTO {
  student: Student;
  property: string;
  valueProperty: unknown;
}
