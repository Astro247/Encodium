from math import gcd


def createKeys(primeA, primeB):
    product = primeA * primeB
    coprimes = (primeA - 1) * (primeB - 1)
    publicPart = 2
    while publicPart < coprimes:
        if gcd(publicPart, coprimes) == 1:
            # If a number higher than 1 and lower than 'coprimes' is found, break the cycle.
            break
        publicPart += 1
    # 'pow(publicPart, -1, coprimes)' = '(publicPart ** -1) % coprimes'
    privatePart = pow(publicPart, -1, coprimes)
    keys = {
        "publicKey": f"({product}, {publicPart})",
        "privateKey": f"({product}, {privatePart})"
    }
    return keys


def encrypt(text, n, e):
    return {"encMessage": [pow(ord(char), e, n) for char in text]}


def decrypt(numList, n, d):
    numbers = [int(num) for num in numList]
    letters = [chr(pow(num, d, n)) for num in numbers]
    text = ''.join(letters)
    return {"decMessage": text}
