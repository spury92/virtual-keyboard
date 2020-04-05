const defaultLanguage = 'en';
const textPlaceholder = 'ru' ? 'Введите текст' : 'Enter your text here';
let CapsActive = false;
let AltActive = false;
let ShiftActive = false;
// Saving language into local storage, to keep it after reloading the page
try {
  keyboardLayout = window.localStorage.getItem('layout')
} catch(error) {
  let keyboardLayout = defaultLanguage; // default, if not found locally
  window.localStorage.setItem('layout', keyboardLayout);
}

const englishLowerKeys = [
  "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", "br",
  "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Delete", "br",
  "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "br",
  "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ArrowUp", "Shift", "br",
  "Control", "Win", "Alt", "Space", "Alt", "Control", "ArrowLeft", "ArrowDown", "ArrowRight", "language"
];
const englishUpperKeys = [
  "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "br",
  "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", "Delete", "br",
  "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", '"', "Enter", "br",
  "Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "?", "ArrowUp", "Shift", "br",
  "Control", "Win", "Alt", "Space", "Alt", "Control", "ArrowLeft", "ArrowDown", "ArrowRight", "language"
]

const russianLowerKeys = [
  "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "br",
  "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Delete", "br",
  "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "br",
  "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "ArrowUp", "Shift", "br",
  "Control", "Win", "Alt", "Space", "Alt", "Control", "ArrowLeft", "ArrowDown", "ArrowRight", "language"
]
const russianUpperKeys = [
  "Ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "br",
  "Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", "Delete", "br",
  "CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter", "br",
  "Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "ArrowUp", "Shift", "br",
  "Control", "Win", "Alt", "Space", "Alt", "Control", "ArrowLeft", "ArrowDown", "ArrowRight", "language"
]
const specialKeys = [
  "Backspace", "Delete", "Tab", "CapsLock", "Enter", "Shift", "ArrowUp", "Shift",
  "Control", "Win", "Alt", "Space", "ArrowLeft", "ArrowDown", "ArrowRight", "language"
]
const layoutsMap = {
  'en': englishLowerKeys,
  'ru': russianLowerKeys
}
const layoutsCapsMap = {
  'en': englishUpperKeys,
  'ru': russianUpperKeys
}
let currentMap = CapsActive ? layoutsCapsMap : layoutsMap;
const changeLayout = () => {
  keyboardLayout = 'en' ? 'ru' : 'en';
  renderKeyboard(currentMap[keyboardLayout]);
}
// create keys inside <div class="keys_container">
const renderKeyboard = (keyboard) => {
  let keyboardDiv = document.querySelector('.keys_container');
  keyboardDiv.innerHTML = null; // clear previous keys before rendering new ones
  for (let key of keyboard) {
    if (key === 'br') {
      let lineBreak = document.createElement('br');
      keyboardDiv.appendChild(lineBreak);
      continue;
    }
    let newKey = document.createElement('button');
    newKey.setAttribute('type', 'button')
    newKey.classList.add('key');
    newKey.classList.add(`key_${key}`);
    if (specialKeys.includes(key)){
      newKey.classList.add('special_key') 
    } 
    textContent = document.createTextNode(`${key}`)
    switch(key) {
      case 'Space':
        textContent = document.createTextNode(``);
        break;
      case 'Control':
        textContent = document.createTextNode('Ctrl');
        break;
      case 'CapsLock':
        newKey.classList.add('activatable_key')
        if (CapsActive) {
          newKey.classList.add('activatable_key--active')
        }
        break;
      case 'language':
        newKey.classList.add('language_indicator')
        textContent = document.createTextNode(`${keyboardLayout}`);
        break;
    }
    newKey.appendChild(textContent);
    keyboardDiv.appendChild(newKey);
  };
};
// create html elements and add them into body
const renderPageElements = () => {
  let keyboardSection = document.createElement('section')
  keyboardSection.classList.add('container')

  let textArea = document.createElement('textarea');
  textArea.setAttribute('rows', 15)
  textArea.setAttribute('placeholder', textPlaceholder)
  let keyboardDiv = document.createElement('div');
  keyboardDiv.classList.add('keyboard');

  let keysContainer = document.createElement('div');
  keysContainer.classList.add('keys_container')

  document.body.appendChild(keyboardSection);
  keyboardSection.appendChild(textArea);
  keyboardSection.appendChild(keyboardDiv);
  keyboardDiv.appendChild(keysContainer);

  renderKeyboard(currentMap[keyboardLayout]);
  document.querySelector('.keyboard').addEventListener('keydown', handleClick);
  document.querySelector('.language_indicator').addEventListener('click', changeLayout)

  // document.querySelectorAll('.key_Shift').forEach(alt => alt.addEventListener('click', handleClick));
};


const handleClick = event => {
  let textArea = document.querySelector('textarea');
  let switchAltAndShift = () => {
    switch(event.type) {
      case 'keydown':
        console.log('Alt pressed');
        AltActive = true
        break;
      case 'keyup':
        console.log('Alt let go');
        AltActive = false
        break;
    }
  }
  switch(event.key) {
    case 'Language':
      changeLayout();
      break;
    case 'Backspace':
      textArea.value = textArea.value.substring[0, -1];
      break;
    case 'Enter':
      textArea.value += '\n';
      break;
    case 'Tab':
      textArea.value += '    ';
      break;
    case 'Control':
      break;
    case 'Alt':
      document.querySelectorAll('.key_Alt').forEach(alt => alt.addEventListener('click', switchAltAndShift));
      break;
    case 'Shift':
      if (AltActive) {
        changeLayout();
      }
      break;
    case 'CapsLock':
      CapsActive = !CapsActive;
      let capsLockKey = document.querySelector('.key_CapsLock');
      CapsActive
        ? capsLockKey.classList.add('activatable_key--active')
        : capsLockKey.classList.remove('activatable_key--active');
      // const keys = document.querySelectorAll('.keys_container');
      renderKeyboard(currentMap[keyboardLayout])
      // for (const key of keys) {
      //   key.textContent = CapsActive ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
      // }
      break;
    default:
      console.log(event);
      textArea.value += (CapsActive | ShiftActive) ? event.key.toUpperCase() : event.key;
  }
};
renderPageElements()
// document.querySelector('.keyboard').oninput = (event) => console.log(event)
