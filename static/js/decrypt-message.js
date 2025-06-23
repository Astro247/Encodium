function isNprime(num) {
    if (num <= 0) { return false }
    const limit = Math.sqrt(num)
    for (let i = 2; i <= limit; i++) if (num % i === 0) { return false }
    return true
}

document.getElementById('DecMessage').onclick = function () {
    const encryptedText = document.getElementById('encryptMessage').value
    const compN = document.getElementById('n').value
    const compD = document.getElementById('d').value
    if (compN === "" || compD === "") return window.alert('\'n\' or \'d\' input is empty')
    if (isNaN(Number(compN)) || isNaN(Number(compD))) return window.alert('The private key components must be numbers')
    if (Number(compD) <= 1) return window.alert('\'d\' value not accepted')
    if (isNprime(Number(compN))) return window.alert('\'n\' must NOT be a prime number')
    if (encryptedText === "") return window.alert('There\'s no text to decrypt')
    const numArr = encryptedText.split(',').map(arr => arr.trim())
    console.log(numArr)
    fetch('/decryptText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encrypted: numArr, n: Number(compN), d: Number(compD) })
    })
        .then(response => {
            if (!response.ok) throw new Error('Response was not ok.')
            return response.json()
        })
        .then(data => {
            document.getElementById('textOutput').value = data.decMessage
        })
        .catch(error => {
            console.error("Fetch error:", error)
            window.alert("500 Internal Server Error.")
        });
}