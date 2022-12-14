/*jshint esversion: 6 */

let students =[];

  function Student(name, surname, birthday, group) {
    this.name = name;
    this.surname = surname;
    this.birthday = birthday;
    this.group = group;
  }

  
  function createStudent(){
    const name = document.getElementById("Name").value;
    const surname = document.getElementById("Surname").value;
    const birthday = document.getElementById("Birthday").value;
    const group = document.getElementById("Group").value;
    const student = new Student(name, surname, birthday, group);
    students.push(student);
    alert("Students create");
  }


  function deleteStudent(){
    const foundStudent = document.getElementById("DeleteSurname").value;
    const student = students.find(o => o.surname == foundStudent);
    if (student !== undefined){
    students.splice(student, 1);
    alert( "Student delete" );
    } else {
      alert( "There is no such value" );
    }
  }


  function updateStudent(){
    const foundStudent = document.getElementById("UpdateSurname").value;
    const student = students.find(o => o.surname == foundStudent);
    if (foundStudent == true) {
      //const keys = Object.keys(student);
      //const keysString = keys.toString();
      const changeSelection = document.getElementById("UpdateData").value;
      switch (changeSelection) {
        case "name":
        case "surname":
        case "birthday":
        case "group":
          const whatToChange = document.getElementById("EnterChanges").value; 
          student[changeSelection] = whatToChange;
          alert( "Student update" );
          break;
      
        default:
          alert( "There is no such value" );
      }
    } else {
      alert( "There is no such value" );
    }
  }


  function showStudentCreate(){
   let elements = document.getElementsByClassName("inputLine");
   elements[0].style.display = "flex";
  }

  function hideStudentCreate(){
    let elements = document.getElementsByClassName("inputLine");
    elements[0].style.display = "none";
   }

  function showStudentDelete(){
    let elements = document.getElementsByClassName("delete");
    elements[0].style.display = "flex";
  }

  function hideStudentDelete(){
    let elements = document.getElementsByClassName("delete");
    elements[0].style.display = "none";
  }

  function showStudentUpdate(){
    let elements = document.getElementsByClassName("update");
    elements[0].style.display = "flex";
  }

  function hideStudentUpdate(){
    let elements = document.getElementsByClassName("update");
    elements[0].style.display = "none";
  }


  function createTable(){
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = "";
    for(let i = 0; i < students.length; i++)
    {
	    let tr = document.createElement('tr');
	    tr.innerHTML =
		    '<td>' + students[i].name + '</td>' +
		    '<td>' + students[i].surname + '</td>' +
        '<td>' + students[i].birthday + '</td>' +
		    '<td>' + students[i].group + '</td>';
	    tbody.appendChild(tr);
    }
  }