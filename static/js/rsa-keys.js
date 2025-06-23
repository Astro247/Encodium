function isPrime(num) {
    if (num <= 1) { return false }
    const limit = Math.sqrt(num);
    for (let i = 2; i <= limit; i++) if (num % i === 0) { return false }
    return true
}

document.getElementById("generateKeysButton").onclick = function () {
    const primeA = Number(document.getElementById("primeA").value)
    const primeB = Number(document.getElementById("primeB").value)
    const pubKey = document.getElementById("pubKey")
    const prvKey = document.getElementById("prvKey")

    if (isNaN(primeA) || isNaN(primeB)) { return window.alert("The entered values are not numbers.") }
    if (!(isPrime(primeA) && isPrime(primeB))) { return window.alert("The entered values are not prime numbers.") }

    fetch('/generateKeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: primeA, b: primeB })
    })
        .then(response => response.json())
        .then(data => {
            pubKey.value = data.publicKey
            prvKey.value = data.privateKey
        })
        .catch(error => {
            console.error("Fetch error:", error);
            window.alert("500 Internal Server Error.");
        });
}