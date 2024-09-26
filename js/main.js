//function for delete button
function del() {
    //The user input is called the element
    var display = document.getElementById("display")

    //the length of the display
    var length = display.innerHTML.length

    //slice the last character of display
    //then assign to display
    display.innerHTML = display.innerHTML.slice(0, -1)

    calculate(display.innerHTML.trim(),0)
}

function calculateTwo(first, second, op) {
    first = parseFloat(first)
    second = parseFloat(second)

    switch (op) {
        case 'X':
            // code
            return first * second
            break;
        case "÷":
            return first / second
            break;
        case "+":
            return first + second
            break
        case "-":
            return first - second
            return

            default:
                // code
                return "Invalid"
            }

    }

    //function for calculating.
    /*
This function is gonna look through the
string for 'X'. if there is, loop backward
and store it in firstNum until we hit a char
that is not a number.Take note of the index
that we last get and store it in start. Then
loop forward, and store each in secondNum
until we hit a char that is not a number.
Take note of the last index and store it in
last.

multiply the firstNum and secondNum and
store in result.

split the original string into two.
The first part should consist of the
original until the start index. The second
should start from the last index.
then add the firstPart, result and
secondPart to create a new string.

Then a final loop to check for 'X'.
If there is, then call the function again
recursively sending the new string to its
parameter.
*/

    function calculate(display, stage) {
        console.log(`The stage is : ${stage}`)
        var firstNum = ""
        var secondNum = ""
        var start = null
        var end = null
        var operator = [["X",
            "÷"],
            ["+",
                "-"]]

        var op = ''

        //loop through string
        for (var i = 0; i <= display.length - 1; i++) {

            //if display has negative
            if (display[0] === "-") {
                if (i === 0) {
                    console.log("Negative")
                    continue
                }
            }

            //if X
            if (display.charAt(i) === operator[stage][0] || display.charAt(i) === operator[stage][1]) {

                op = display.charAt(i)

                //testing
                console.log("Starting backward loop")

                //loop backward
                for (var j = i-1; j >= 0; j--) {

                    //if we encounter number
                    //add it to the firstNum
                    //otherwise break
                    if (display.charAt(j).match(/[0-9.]/)) {

                        firstNum += display.charAt(j)
                    } else {
                        start = j
                        break
                    }

                }

                //testing
                console.log("ending backward loop")
                console.log("starting forward loop")
                console.log("The i: " + display.charAt(i))
                console.log("The i + 1: " + display.charAt(i + 1))

                //loop forward from the 'X'
                for (var j = i + 1; j <= display.length - 1; j++) {
                    //if we encounter number
                    //add it to the secondNum
                    //otherwise break
                    if (display.charAt(j).match(/[0-9.]/)) {
                        secondNum += display.charAt(j)
                    } else {
                        end = j
                        break
                    }

                    end = j
                }
                //break the loop
                break
            }
        }

        //if there is a firstNum continue
        //otherwise change operation
        if (firstNum === "" || secondNum === "") {
            console.log("There was no op")

            console.log(`The full string: ${display}`)


            if (stage <= 2) {
                stage++
                return calculate(display, stage)
            } else {
                return display
            }
        }
        
        if(display.charAt(0) === "-"){
            firstNum += "-"
        }

        //split in to array, then reverse,
        //finally, join together again.
        firstNum = firstNum.split("").reverse().join("")

        console.log(`The full string: ${display}`)


        console.log("FirstNum == " + firstNum)
        console.log("secondNum == " + secondNum)

        //todo: figure out how to split the
        //string into parts depending on the
        //string itself
        var firstPart = ""
        var secondPart = ""
        var result = 0
        var finalString = ""

        //loop through string
        for (var i = 0; i <= display.length-1; i++) {
            
            if(display.charAt(0) === '-'){
                if(i === 0){
                    continue
                }
            }

            //If the first ever encountered
            //not number element is the op.
            //then calculate based on the
            //op and set as firstPart

            if (!display.charAt(i).match(/[0-9.]/)) {
                console.log(`Inside the if the first is the product at index ${i}`)

                if (display.charAt(i) === op) {

                    firstPart = calculateTwo(firstNum, secondNum, op)
                    break
                } else {
                    break
                }

            }
        }

        //if the first part is empty. Which
        //means that the first operator that
        //appears in the string was not X
        //Then let everything from 0 of the
        //string to the start variable be the
        //first part.
        if (firstPart === "") {
            for (var i = 0; i <= start; i++) {
                firstPart += display.charAt(i)
            }

            result = calculateTwo(firstNum, secondNum, op)

            //testing
            console.log("result: " + result)

        }

        //if end === display.length, then
        //the result should be at the end
        //otherwise construct secondPart
        //beginning at end + 1 index.
        if (end === display.length - 1) {
            finalString = firstPart + result
        } else {
            //testing
            console.log("else: ")
            console.log(`end + 1 = ${end + 1} == display.length - 1 = ${display.length - 1}`)


            for (var i = end; i <= display.length - 1; i++) {

                if (display)

                    secondPart += display.charAt(i)
            }

            finalString = firstPart + result + secondPart
        }

        //testing
        console.log("Start: " + start)
        console.log("End: " + end)

        console.log("First part: " + firstPart)
        console.log("Second part: " + secondPart)

        console.log("Final string: " + finalString)

        //loop again to check if there is still
        //the same operation.
        for (var i = 0; i <= finalString.length - 1; i++) {
            if (!(finalString.charAt(i).match(/[0-9.]/))) {
                if (finalString.charAt(i) === operator[stage][0] || finalString.charAt(i) === operator[stage][1]) {

                    console.log(`Inside the loop that check again for the same op`)

                    return calculate(finalString, stage)
                } else {

                    console.log(`Inside else: Current op: ${op}`)


                    return calculate(finalString, stage++)
                }
            }
        }

        return finalString
    }

    function btnClicked(a) {
        var display = document.getElementById('display')

        if (a === "+" || a === "-" || a === "X" || a === "÷") {
            if (display.innerHTML.trim() !== "") {
                var last = display.innerHTML.charAt(display.innerHTML.length - 1)

                if (last === "+" || last === "-" || last === "÷" || last === "X") {} else {
                    display.innerHTML += a
                }
            }
        } else {
            display.innerHTML += a
        }

        document.getElementById("result").innerHTML = calculate(display.innerHTML.trim(), 0)


    }