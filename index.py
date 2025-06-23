from flask import Flask, render_template, request, jsonify
from utils import createKeys, encrypt, decrypt

app = Flask(__name__)


@app.route('/')
def goToHomepage():
    return render_template('home.html', page="home")


@app.route('/RSA-Keys')
def goToRSAkeys():
    return render_template('rsa-keys.html', page="RSA-Keys")


@app.route('/generateKeys', methods=['POST'])
def generateKeys():
    datas = request.get_json()  # Transform json content into a python dictionary
    primeA = int(datas['a'])
    primeB = int(datas['b'])
    return jsonify(createKeys(primeA, primeB))


@app.route('/encrypt-message')
def goToEncryptMessage():
    return render_template('encrypt-message.html', page="encrypt")


@app.route('/encryptText', methods=['POST'])
def encryptMessage():
    datas = request.get_json()
    text = str(datas['text'])
    compN = int(datas['n'])
    compE = int(datas['e'])
    return jsonify(encrypt(text, compN, compE))


@app.route('/decrypt-message')
def goToDecryptMessage():
    return render_template('decrypt-message.html', page="decrypt")


@app.route('/decryptText', methods=['POST'])
def decryptText():
    datas = request.get_json()
    numList = datas['encrypted']
    compN = int(datas['n'])
    compD = int(datas['d'])
    return jsonify(decrypt(numList, compN, compD))


def create_app():
    return app


if __name__ == '__main__':
    app.run()
