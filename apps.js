function reverseStr(date){
    var datesplit = date.split('');
    var daterev = datesplit.reverse();
    var dateJoin = daterev.join('');
    return dateJoin;
}
function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToString(date){
    var dateStr = { day: '', month: '', year: ''}

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getDateInAllFormat(date){
    var dateStr = convertDateToString(date);

    var ddmmyyyy  = dateStr.day +dateStr.month+dateStr.year;
    var mmddyyyy = dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd = dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy = dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy =dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2)+dateStr.month+dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date){
    var listOfPalindromes = getDateInAllFormat(date);
    var flag = false;
    for(let i = 0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }

    return flag;

}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}
function getNextDate(date){
    var day = date.day+1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        } 
        else {
            if(day > 28){
                day = 1;
                month++;
            }
        }
    } 
    else {
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day : day,
        month : month,
        year : year
    }


}

// function previousDate(date){
//     var day = date.day;
//     var month = date.month;
//     var year = date.year;
//     var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//     if(month === 3){
//         if(isLeapYear(year)){
//             if(day === 1){
//                 day = 29;
//                 month--;
//             }
//         } 
//         else {
//             if(day === 1){
//                 day = 28;
//                 month--;
//             }
//         }
//     } 
//     else {
//         if(day === 1){
            
//             day = daysInMonth[(month-2];
//             month--;
//         }
//     }

//     if(month === 0){
//         month = 12;
//         year--;
//     }

//     return {
//         day : day,
//         month : month,
//         year : year
//     }


// }

function getNextPalindromeDate(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var isPalindrome = checkPalindromeForAllFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [count, nextDate];
}

var birthdayInput = document.querySelector(".Input-birthday");
var btnSubmit = document.querySelector(".btn-submit");
var output = document.querySelector(".output");

function clickHandler(){
    var bdayStr = birthdayInput.value;
    if(bdayStr != ''){
        var dateList = bdayStr.split('-');
        var date = {
            day: Number(dateList[2]),
            month: Number(dateList[1]),
            year: Number(dateList[0])
        }
        var isPalindrome = checkPalindromeForAllFormats(date);

        if(isPalindrome){
            output.innerText = "Your Birthday is Palindrome"
        } else {
            var [count, nextDate] = getNextPalindromeDate(date);
            output.innerText = "Next Palindrome is " +nextDate.day + "-" + nextDate.month + "-" +nextDate.year + ", " + "you missed it by " +count + " days!";
        }
    }
}
btnSubmit.addEventListener("click", clickHandler);
