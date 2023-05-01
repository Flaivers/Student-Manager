import { Student } from "./Student";
import { IServer, UpdateStudentDTO } from "./interface";
export class ServerManager implements IServer {
  convertJsonToStudents(json: any): Student[] {
    let students = json;
    let result = [];
    for (
      let elementNumber = 0;
      elementNumber < students.length;
      elementNumber++
    ) {
      const student1 = new Student(
        students[elementNumber].id,
        students[elementNumber].name,
        students[elementNumber].surname,
        students[elementNumber].birthday,
        students[elementNumber].group
      );
      result.push(student1);
    }
    return result;
  }

  async getStudents(): Promise<Student[]> {
    let response = await fetch("http://localhost:3000/students");
    if (response.ok) {
      let json = await response.json();
      let students = this.convertJsonToStudents(json);
      return Promise.resolve(students);
    } else {
      //alert("Error HTTP: " + response.status);
      return Promise.resolve([]);
    }
  }

  async createStudent(student: Student): Promise<boolean> {
    let response = await fetch("http://localhost:3000/students/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(student),
    });

    let result = await response.json();
    return Promise.resolve(result);
  }

  async deleteStudent(student: Student): Promise<boolean> {
    let response = await fetch("http://localhost:3000/students/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(student),
    });

    let result = await response.json();
    return Promise.resolve(result);
  }

  async updateStudent(
    student: Student,
    property: string,
    valueProperty: string | number
  ): Promise<boolean> {
    let body: UpdateStudentDTO = { student, property, valueProperty };
    let response = await fetch("http://localhost:3000/students/change", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });

    let result = await response.json();
    return Promise.resolve(result);
  }
}
