const mark = document.getElementById('mark')
const btn = document.getElementById('submit-mark')
const grade = document.getElementById('grade')

function generateGrade(studentMark) {
    let studentGrade = ''
    if (isNaN(studentMark) || studentMark < 0 || studentMark > 100) {
        //Check of erroneous entries
        studentGrade = 'Please enter a mark between 0 and 100'
    } else if (studentMark > 79) {
        studentGrade = 'A'
    } else if (studentMark >= 60 && studentMark <= 79) {
        studentGrade = 'B'
    } else if (studentMark >= 49 && studentMark <= 59) {
        studentGrade = 'C'
    } else if (studentMark >= 40 && studentMark <= 48) {
        studentGrade = 'D'
    } else {
        studentGrade = 'E'
    }

    grade.textContent = studentGrade
}

btn.addEventListener('click', () => {
    let studentMark = parseInt(mark.value)
    generateGrade(studentMark)
    mark.value = ''
})
