const inputs = document.querySelectorAll("input"); 
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const button = document.querySelector("button");

const yearResult = document.getElementById("year-result");
const monthResult = document.getElementById("month-result");
const dayResult = document.getElementById("day-result");

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

// empty input field handling
function emptyValidate(input) {
    const errorMsg = input.nextElementSibling;

    if (input.value === "") {
        errorMsg.innerText = "This Field is required";
        return false;
    } 
    return true;
}

// day-month clash handling
function dayValidation(m, d, y) {
    const daysInMonth = [31,
        28 + (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0) ? 1 : 0),
        31, 30, 31, 30,31,31,30, 31, 30, 31];

    if (d < 1 || d > daysInMonth[m - 1]) {
        return false;
    }
    return true;
}

// date range handling
function rangeValidate(input) {
    const errorMsg = input.nextElementSibling;

    if (input === day) {
        if (day.value < 1 || day.value > 31) {
            errorMsg.innerText = "Must be a valid day";
            return false;
        } else if (!dayValidation(month.value, day.value, year.value)) {
            errorMsg.innerText = "Must be a valid date";
            return false;
        } else if (year.value == currentYear && month.value == currentMonth && day.value > currentDay) {
            errorMsg.innerText = "Must be in the past";
            return false;
        } 
    } else if (input === month) { 
        if (month.value < 1 || month.value > 12) {
            errorMsg.innerText = "Must be a valid month";
            return false;
        } else if (year.value == currentYear && month.value > currentMonth) {
            errorMsg.innerText = "Must be in the past";
            return false;
        }
    } else if (input === year) {
        if (year.value > currentYear) {
            errorMsg.innerText = "Must be in the past";
            return false;
        } else if (year.value < 1000) {
            errorMsg.innerText = "Not too distant past";
            return false;
        }
    }
    return true;
}

// calculate age and display the result
function calculateAge() {
    const currentDate = new Date();
    const userDate = new Date(year.value, month.value - 1, day.value);

    const difference = currentDate - userDate;
    const ageDate = new Date(difference);
    
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    yearResult.innerText = years;
    monthResult.innerText = months;
    dayResult.innerText = days;
}
// button handling
button.addEventListener("click", function() {
    let valid = true;
    inputs.forEach(function(input) {
        const label = input.previousElementSibling;
        const errorMsg = input.nextElementSibling;
        if (!emptyValidate(input) || !rangeValidate(input)) {
            valid = false;
            label.style.color = "red";
            input.style.borderColor = "red";
        } else {
            errorMsg.innerText = "";
            label.style.color = "";
            input.style.borderColor = "";
        }
    })
    if (valid) {
        calculateAge();
    }
})