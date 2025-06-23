function isNprime(num) {
    if (num <= 0) { return false }
    const limit = Math.sqrt(num);
    for (let i = 2; i <= limit; i++) if (num % i === 0) { return false }
    return true
}

document.getElementById('EncMessage').onclick = function () {
    const normalText = document.getElementById('textInput').value
    const compN = document.getElementById('n').value
    const compE = document.getElementById('e').value
    if (compN === "" || compE === "") return window.alert('\'n\' or \'e\' input is empty')
    if (isNaN(Number(compN)) || isNaN(Number(compE))) return window.alert('The public key components must be numbers')
    if (isNprime(Number(compN))) return window.alert('\'n\' must NOT be a prime number')
    if (normalText === "") return window.alert('There\'s no text to encrypt')
    fetch('/encryptText', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: normalText, n: Number(compN), e: Number(compE) })
    })
        .then(response => {
            if (!response.ok) throw new Error('Response was not ok.');
            return response.json()
        })
        .then(data => {
            document.getElementById('textOutput').value = data.encMessage
        })
        .catch(error => {
            console.error("Fetch error:", error);
            window.alert("500 Internal Server Error.");
        });
}