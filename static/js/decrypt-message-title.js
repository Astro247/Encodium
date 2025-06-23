const finalWord = "Decrypt Message"
let initialWord = "•".repeat(finalWord.length) /* InitialWord is a string with the char "•" repeated 'finalWord.length' times (which is 8) */
let counter = 0
let Name = document.getElementById('titleName')
Name.textContent = initialWord

let interval = setInterval(() => {
    let arr = initialWord.split("") /* An array is temporarely created to modify the single char of the hidden string for each iteration */
    arr[counter] = finalWord[counter]
    initialWord = arr.join("") /* The array is converted back into a string */

    Name.textContent = initialWord
    counter++

    if (counter == finalWord.length) {
        clearInterval(interval)
    }
}, 150)