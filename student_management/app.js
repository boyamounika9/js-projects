
import { students,studentAbove80,studentbyid,avgmarks, getallstudents} from "./student.js";


import { namesinup,heighscorestu,lowscorestu } from "./utils.js";

let averageMarks=document.getElementById('averageMarks');
let above80=document.getElementById('above80');
let highestStudent=document.getElementById('highestStudent');
let lowestStudent=document.getElementById('lowestStudent');
let searchInput=document.getElementById('searchInput');
let searchButton=document.getElementById('searchButton');
let searchResult=document.getElementById('searchResult');
const studentContainer =
    document.getElementById("studentContainer");



// Display all students
function displayStudents(studentList) {

    studentContainer.innerHTML = "";

    studentList.forEach(function(student) {

        const card = document.createElement("div");

        card.className = "student-card";

        card.innerHTML = `
            <h3>${student.name}</h3>

            <p><b>ID:</b> ${student.id}</p>

            <p><b>Age:</b> ${student.age}</p>

            <p><b>Department:</b> ${student.department}</p>

            <p><b>Marks:</b> ${student.marks}</p>
        `;

        studentContainer.appendChild(card);

    });

}

// Get all students
const allStudents = getallstudents();

displayStudents(allStudents);

// Average marks
averageMarks.textContent=avgmarks();


// Highest student
const highest =
    heighscorestu(students);

highestStudent.innerHTML = `
    ${highest.name} - ${highest.marks} marks
`;


// Lowest student
const lowest =
    lowscorestu(students);

lowestStudent.innerHTML = `
    ${lowest.name} - ${lowest.marks} marks
`;


// Students above 80
const studentsAbove80 =
    studentAbove80();

above80.textContent =
    studentsAbove80.length;



// Search student by ID
searchButton.addEventListener("click", function() {

    const id =
        Number(searchInput.value);

    const student =
        studentbyid(id);


    if (student) {

        searchResult.innerHTML = `
            <div class="result-card">

                <h3>${student.name}</h3>

                <p>ID: ${student.id}</p>

                <p>Age: ${student.age}</p>

                <p>Department: ${student.department}</p>

                <p>Marks: ${student.marks}</p>

            </div>
        `;

    } else {

        searchResult.innerHTML = `
            <p class="not-found">
                Student not found
            </p>
        `;

    }

});



// Display uppercase names in console
const uppercaseStudents =
    namesinup(students);

console.log("Uppercase Student Names:");
console.log(uppercaseStudents);