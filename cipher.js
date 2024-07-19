const alphabet = 'abcdefghijklmnopqrstuvwxyz';
function validateKey(key) {
    // Ensure the key contains 26 unique alphabet characters
    if (key.length !== 26) return false;
    let uniqueChars = new Set(key);
    return uniqueChars.size === 26 && [...uniqueChars].every(char => alphabet.includes(char));
}
        
function encrypt() {
    const key = document.getElementById('key').value.toLowerCase();
    if (!validateKey(key)) {
        alert('Key must contain 26 unique alphabet characters.');
        return;
    }
    const inputText = document.getElementById('inputText').value.toLowerCase();
    let outputText = '';

    for (let char of inputText) {
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            outputText += key[index];
        } else {
            outputText += char; // Non-alphabet characters are added as is
        }
    }

    document.getElementById('outputText').value = outputText;
}

function decrypt() {
    const key = document.getElementById('key').value.toLowerCase();
    if (!validateKey(key)) {
        alert('Key must contain 26 unique alphabet characters.');
        return;
    }
    const inputText = document.getElementById('inputText').value.toLowerCase();
    let outputText = '';

    for (let char of inputText) {
        if (key.includes(char)) {
            const index = key.indexOf(char);
            outputText += alphabet[index];
        } else {
            outputText += char; // Non-alphabet characters are added as is
        }
    }

    document.getElementById('outputText').value = outputText;
}
        


document.addEventListener('DOMContentLoaded', (event) => {
    const savedTopic = localStorage.getItem('selectedTopic');
    if (savedTopic) {
        document.getElementById('dropdownMenuButton1').innerText = savedTopic;
    }
});
function processTransposition() {
    const key = document.getElementById('transKey').value.toLowerCase();
    const message = document.getElementById('transMessage').value;
    const mode = document.getElementById('transMode').value;

    if (!key || !/^[a-z]+$/.test(key)) {
        alert('Please enter a valid key (a word with alphabet characters only).');
        return;
    }

    let result;
    if (mode === 'encrypt') {
        result = columnarTranspositionEncrypt(key, message);
    } else {
        result = columnarTranspositionDecrypt(key, message);
    }

    document.getElementById('transResult').value = result;
}
function getColumnOrder(key) {
    const order = Array.from(key)
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(item => item.index);

    return order;
}
function columnarTranspositionEncrypt(key, message) {
    const order = getColumnOrder(key);
    const numCols = key.length;
    const numRows = Math.ceil(message.length / numCols);
    const paddedMessage = message.padEnd(numRows * numCols, ' ');
    let ciphertext = '';

    for (let col of order) {
        for (let row = 0; row < numRows; row++) {
            ciphertext += paddedMessage[row * numCols + col];
        }
    }

    return ciphertext;
}

function columnarTranspositionDecrypt(key, ciphertext) {
    const order = getColumnOrder(key);
    const numCols = key.length;
    const numRows = Math.ceil(ciphertext.length / numCols);
    let plaintext = Array(ciphertext.length).fill(' ');

    let col = 0, row = 0;
    for (let index = 0; index < ciphertext.length; index++) {
        const colIndex = order[col];
        plaintext[row * numCols + colIndex] = ciphertext[index];
        row++;
        if (row === numRows || (row === numRows - 1 && col >= numCols - (numRows * numCols - ciphertext.length))) {
            row = 0;
            col++;
        }
    }

    return plaintext.join('');
}



