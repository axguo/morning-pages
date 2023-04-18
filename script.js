let reveal = false;
let editor = document.getElementById('editor');

let placeholderTexts = [
    "What are my intentions today?...",
    "Moving towards love...",
    "A stream of consciousness awaits...",
    "Some things that need to be said...",
    "Honest feelings..."
];

function getRandomPlaceholder(arr) {
    let ind = Math.floor(Math.random() * arr.length);
    return arr[ind];
}

editor.setAttribute("data-placeholder", getRandomPlaceholder(placeholderTexts));


// get rid of spell check red squiggles
editor.spellcheck = false;
editor.focus();
editor.blur();

editor.addEventListener('input', () => {
    let words = editor.innerText.split(/\s+/);
    let blackWords = words.slice(-3);
    let fadeWords = words.slice(-8, -3);
    let whiteWords = words.slice(0, -8);

    let whiteSpan = document.createElement('span');
    whiteSpan.className = 'white';
    whiteSpan.innerText = whiteWords.join(' ');

    // Create fade spans
    let fadeSpans = fadeWords.map((word, index) => {
        let span = document.createElement('span');
        span.className = `fade-${index + 1}`;
        span.innerText = word;
        return span;
    });

    let blackSpan = document.createElement('span');
    blackSpan.className = 'black';
    blackSpan.innerText = blackWords.join(' ');

    editor.innerHTML = '';

    if (whiteWords.length > 0) {
        editor.appendChild(whiteSpan);
        editor.appendChild(document.createTextNode(' '));
    }

    // Append fade spans
    fadeSpans.forEach((span, index) => {
        editor.appendChild(span);
        if (index < fadeSpans.length - 1) {
            editor.appendChild(document.createTextNode(' '));
        }
    });

    if (fadeWords.length > 0) {
        editor.appendChild(document.createTextNode(' '));
    }

    editor.appendChild(blackSpan);

    // Move cursor to the end
    let range = document.createRange();
    let selection = window.getSelection();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
});


function changeFont(type) {
    editor.className = type;
}

function copyText() {
    const text = document.getElementById('editor').innerText;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const notification = document.getElementById('notif');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 1500);
}


function applyHover() {
    const elements = document.querySelectorAll('.white, .black, .fade-1, .fade-2, .fade-3, .fade-4, .fade-5');
    elements.forEach((element) => {
        element.classList.add('hover-effect');
    });
}

function removeHover() {
    if (!reveal) {
        const elements = document.querySelectorAll('.white, .black, .fade-1, .fade-2, .fade-3, .fade-4, .fade-5');
        elements.forEach((element) => {
            element.classList.remove('hover-effect');
        });
    }
}

function toggleReveal() {
    if (reveal) {
        reveal = false;
    } else {
        reveal = true;
    }
} 
