const form = document.getElementById('user-info')
const basicSalaryInput = document.getElementById('basic-salary')
const benefits = document.getElementById('benefits')

//Deduct NSSF function?
function deductNssf(basicPay) {
    let beforeNssf = basicPay

    if (beforeNssf >= 3000 && beforeNssf < 4500) {
        return (beforeNssf -= 180)
    } else if (beforeNssf >= 4500 && beforeNssf < 6000) {
        return (beforeNssf -= 270)
    } else if (beforeNssf >= 6000 && beforeNssf < 10000) {
        return (beforeNssf -= 360)
    } else if (beforeNssf >= 10000 && beforeNssf < 14000) {
        return (beforeNssf -= 600)
    } else if (beforeNssf >= 14000 && beforeNssf < 18000) {
        return (beforeNssf -= 840)
    } else {
        return (beforeNssf -= 1080)
    }
}

//Calculate income tax after NSSF deduction function
function getIncomeTax(taxablePay) {
    let incomeTax = 0
    let tempTaxablePay = taxablePay

    //Get 10% for taxable income up to 24000 & store it
    if (tempTaxablePay > 24000) {
        incomeTax += 2400
        tempTaxablePay -= 24000
    } else {
        incomeTax += Math.round(tempTaxablePay * 0.1)
        return incomeTax
    }

    //Get 25% for taxable income up to 32333 & store it
    if (tempTaxablePay > 32333) {
        incomeTax += 2083
        tempTaxablePay -= 8333
    } else {
        incomeTax += Math.round(tempTaxablePay * 0.25)
        return incomeTax
    }

    //Get 30% for taxable income up to 500000 & store it
    if (tempTaxablePay > 500000) {
        incomeTax += 140300
        tempTaxablePay -= 467667
    } else {
        incomeTax += Math.round(tempTaxablePay * 0.3)
        return incomeTax
    }

    //Get 32.5% for taxable income up to the next 300000 & store it
    if (tempTaxablePay > 300000) {
        incomeTax += 97500
        tempTaxablePay -= 300000
    } else {
        incomeTax += Math.round(tempTaxablePay * 0.325)
        return incomeTax
    }

    //Get 35% for taxable income above 800000 & store it
    incomeTax += Math.round(tempTaxablePay * 0.35)
    return incomeTax
}

//Calculate NHIF rate for gross pay
//This function checks if a number is within a given range
function salaryInRange(grossSalary, min, max) {
    if (grossSalary >= min && grossSalary <= max) {
        return true
    } else {
        return false
    }
}

const getNhifDeduction = (grossSalary) => {
    let nhifRate

    //If the gross salary is greater than 99999, the NHIF rate is a standard 1700
    //so the function can end here
    if (grossSalary > 99999) {
        return (nhifRate = 1700)
    }

    //Put the definite NHIF rates in an object with the various ranges as keys
    //Manipulate the object to find the correct salary range and NHIF rate
    const nhifRanges = {
        '0 - 5999': 150,
        '6000 - 7999': 300,
        '8000 - 11999': 400,
        '12000 - 14999': 500,
        '15000 - 19999': 600,
        '20000 - 24999': 750,
        '25000 - 29999': 850,
        '30000 - 34999': 900,
        '35000 - 39999': 950,
        '40000 - 44999': 1000,
        '45000 - 49999': 1100,
        '50000 - 59999': 1200,
        '60000 - 69999': 1300,
        '70000 - 79999': 1400,
        '80000 - 89999': 1500,
        '90000 - 99999': 1600,
    }

    //The for...in loop iterates over object keys which are strings by default
    for (const key in nhifRanges) {
        const limits = key.split(' ')
        const min = parseInt(limits[0])
        const max = parseInt(limits[2])

        //Check which range the gross salary falls in amongst the object keys
        const salaryRangeCheck = salaryInRange(grossSalary, min, max)

        //If the function call above returns true, access the value of that key
        //Bracket notation works to access the value of non-standard keys in objects
        if (salaryRangeCheck) {
            nhifRate = nhifRanges[key]
        }
    }

    // console.log(`NHIF Rate: ${nhifRate}`)
    return nhifRate
}

//Calculate PAYE for taxable pay above 25590/=
function getPaye(incomeTax, nhifRate) {
    let paye = 0
    let personalRelief = 2400
    let insuranceRelief = nhifRate * 0.15
    //An income of 25590 has an income tax of 2528/=
    //An income lower than that does not pay PAYE
    //Thus this condition
    if (incomeTax >= 2528) {
        paye = incomeTax - (personalRelief + insuranceRelief)
        return paye
    } else {
        return paye
    }
}

//Calculate the housing levy
function getHousingLevy(salary) {
    const housingLevy = salary * 0.015
    return housingLevy.toFixed(2)
}

function calculateNetSalary(salary) {
    //NHIF is deducted on all salary amounts so it's better to use the
    //whole salary amount first to get the rate.
    const nhifRate = getNhifDeduction(salary)
    const housingLevy = getHousingLevy(salary)
    //Gross salary = salary since the total of both inputs is being passed to
    //this function from the event listener on submit.

    if (salary >= 3000) {
        const taxablePay = deductNssf(salary)
        const incomeTax = getIncomeTax(taxablePay)
        const paye = getPaye(incomeTax, nhifRate)
        const payAfterTax = taxablePay - paye
        const netPay = payAfterTax - nhifRate - housingLevy
        console.log(
            `Salary: ${salary}.\nTaxable income: ${taxablePay}.\nIncome tax: ${incomeTax}.\nNHIF rate: ${nhifRate}.\nPAYE: ${paye}.\nPay after tax: ${payAfterTax}.\nHousing levy: ${housingLevy}.\nNet pay: ${netPay}`
        )
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const grossSalaryInput =
        parseInt(basicSalaryInput.value) + parseInt(benefits.value)
    calculateNetSalary(grossSalaryInput)
})
