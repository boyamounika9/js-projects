
export function namesinup(students){
    return students.map((student)=>{
        return student.name.toLocaleUpperCase();
    })

}



export function heighscorestu(students){
       return students.reduce(function(highest, student) {

        if (student.marks > highest.marks) {

            return student;

        } else {

            return highest;

        }

    });

}

export function lowscorestu(students){
       return students.reduce(function(lowest, student) {

        if (student.marks < lowest.marks) {

            return student;

        } else {

            return lowest;

        }

    });

}
