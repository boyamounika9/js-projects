const students = [
    {
        id: 101,
        name: "Meena",
        age: 20,
        department: "CSE",
        marks: 91
    },
    {
        id: 102,
        name: "Vikram",
        age: 21,
        department: "ECE",
        marks: 76
    },
    {
        id: 103,
        name: "Divya",
        age: 22,
        department: "IT",
        marks: 87
    },
    {
        id: 104,
        name: "Rohit",
        age: 20,
        department: "CSE",
        marks: 68
    },
    {
        id: 105,
        name: "Anjali",
        age: 21,
        department: "EEE",
        marks: 95
    }
];

export{students}

export function getallstudents(){
    return students
}



export function studentbyid(id){
    return students.find((student)=>{

        return student.id===id

    })
}


export function studentAbove80(){
    return students.filter((student)=>{

        return student.marks>80

    })
}



export function avgmarks(){
    let total= students.reduce((sum,student)=>{

        return sum + student.marks;

    },0);

    return total/students.length;
}


