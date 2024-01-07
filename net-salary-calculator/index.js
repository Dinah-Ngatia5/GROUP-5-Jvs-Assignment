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
    if (taxablePay > 24000) {
        incomeTax += 2400
        tempTaxablePay -= 24000
    } else {
        incomeTax += Math.round(tempTaxablePay * 0.1)
        return incomeTax
    }

    //Get 25% for taxable income up to 32333 & store it
    incomeTax += Math.round(tempTaxablePay * 0.25)

    if (tempTaxablePay <= 32333) {
        return incomeTax
    } else {
        tempTaxablePay -= 32333
    }

    //Get 30% for taxable income up to 500000 & store it
    incomeTax += Math.round(tempTaxablePay * 0.3)

    if (tempTaxablePay <= 500000) {
        return incomeTax
    } else {
        tempTaxablePay -= 500000
    }

    //Get 32.5% for taxable income up to 800000 & store it
    incomeTax += Math.round(taxablePay * 0.325)

    if (tempTaxablePay <= 800000) {
        return incomeTax
    } else {
        tempTaxablePay -= 800000
    }

    //Get 35% for taxable income above 800000 & store it
    incomeTax += Math.round(taxablePay * 0.35)
    return incomeTax
}

//Calculate NHIF rate for gross pay
function getNhifDeduction(grossSalary) {
    let nhifRate

    if (grossSalary <= 5999) {
        nhifRate = 150
    } else if (grossSalary >= 6000 && grossSalary <= 7999) {
        nhifRate = 300
    } else if (grossSalary >= 8000 && grossSalary <= 11999) {
        nhifRate = 400
    } else if (grossSalary >= 12000 && grossSalary <= 14999) {
        nhifRate = 500
    } else if (grossSalary >= 15000 && grossSalary <= 19999) {
        nhifRate = 600
    } else if (grossSalary >= 20000 && grossSalary <= 24999) {
        nhifRate = 750
    } else if (grossSalary >= 25000 && grossSalary <= 29999) {
        nhifRate = 850
    } else if (grossSalary >= 30000 && grossSalary <= 34999) {
        nhifRate = 900
    } else if (grossSalary >= 35000 && grossSalary <= 39999) {
        nhifRate = 950
    } else if (grossSalary >= 40000 && grossSalary <= 44999) {
        nhifRate = 1000
    } else if (grossSalary >= 45000 && grossSalary <= 49999) {
        nhifRate = 1100
    } else if (grossSalary >= 50000 && grossSalary <= 59999) {
        nhifRate = 1200
    } else if (grossSalary >= 60000 && grossSalary <= 69999) {
        nhifRate = 1300
    } else if (grossSalary >= 70000 && grossSalary <= 79999) {
        nhifRate = 1400
    } else if (grossSalary >= 80000 && grossSalary <= 89999) {
        nhifRate = 1500
    } else if (grossSalary >= 90000 && grossSalary <= 99999) {
        nhifRate = 1600
    } else {
        nhifRate = 1700
    }

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
