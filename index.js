/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
const defaultLanguage = 'en';
const textPlaceholder = defaultLanguage === 'ru' ? 'Введите текст' : 'Enter your text here';
let CapsActive = false;
const Layout = window.localStorage.getItem('layout') || 'en';
const breaks = [
  'Backspace', 'Backslash', 'Enter', 'ShiftRight',
];
const specialKeys = [
  'Backspace', 'Delete',
  'Tab', 'CapsLock', 'Enter',
  'ShiftLeft', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight',
  'ArrowLeft', 'ArrowDown', 'ArrowRight', 'language',
];

const handleClick = (event) => {
  const textArea = document.querySelector('textarea');
  switch (event.key) {
    case 'Language':
      break;
    case 'Backspace':
      textArea.value = textArea.value.substring(0, -1);
      break;
    case 'Enter':
      textArea.value += '\n';
      break;
    case 'Tab':
      textArea.value += '    ';
      break;
    case 'Control':
      break;
    // case 'Alt':
    //   document.querySelectorAll('.key_Alt').forEach((alt) => alt.addEventListener('click', switchAltAndShift));
    //   break;
    case 'CapsLock':
      CapsActive = !CapsActive;
      if (CapsActive) {
        document.querySelector('.key_CapsLock').classList.add('activatable_key--active');
      } else {
        document.querySelector('.key_CapsLock').classList.remove('activatable_key--active');
      }
      break;
    default:
      // console.log(event);
      textArea.value += (CapsActive || event.ShiftLeft || event.ShiftRight) ? event.key.toUpperCase() : event.key;
  }
};

// create keys inside <div class="keys_container">
const renderKeyboard = (keyboard, layout) => {
  const keyboardDiv = document.querySelector('.keys_container');
  keyboardDiv.innerHTML = null; // clear previous keys before rendering new ones
  const iter = keyboard.entries;
  for (const key of iter) {
    if (!breaks.includes(key)) {
      const newKey = document.createElement('button');
      newKey.setAttribute('type', 'button');
      newKey.classList.add('key');
      newKey.classList.add(`key_${key}`);
      if (specialKeys.includes(key)) {
        newKey.classList.add('special_key');
      }
      const textContent = document.createTextNode(`${key[layout]}`);
      if (key === 'CapsLock') {
        newKey.classList.add('activatable_key');
        if (CapsActive) {
          newKey.classList.add('activatable_key--active');
        }
      }
      newKey.appendChild(textContent);
      keyboardDiv.appendChild(newKey);
    } else {
      keyboardDiv.appendChild(document.createElement('br'));
    }
  }
};
// create html elements and add them into body
const renderPageElements = (keyboard) => {
  const keyboardSection = document.createElement('section');
  keyboardSection.classList.add('container');

  const textArea = document.createElement('textarea');
  textArea.setAttribute('rows', 15);
  textArea.setAttribute('placeholder', textPlaceholder);
  const keyboardDiv = document.createElement('div');
  keyboardDiv.classList.add('keyboard');

  const keysContainer = document.createElement('div');
  keysContainer.classList.add('keys_container');

  document.body.appendChild(keyboardSection);
  keyboardSection.appendChild(textArea);
  keyboardSection.appendChild(keyboardDiv);
  keyboardDiv.appendChild(keysContainer);

  renderKeyboard(keyboard, Layout);
  document.querySelector('.keyboard').addEventListener('keydown', handleClick);
};

// renderPageElements();
const Keyboard = {
  elements: {
    main: null,
    textArea: null,
    keyboardContainer: null,
    keysContainer: null,
    keys: {
      Backquote: {
        en: '`', ru: 'ё', enUp: '~', ruUp: 'Ё',
      },
      Digit1: {
        en: '1', ru: '1', enUp: '!', ruUp: '!',
      },
      Digit2: {
        en: '2', ru: '2', enUp: '@', ruUp: '"',
      },
      Digit3: {
        en: '3', ru: '3', enUp: '#', ruUp: '№',
      },
      Digit4: {
        en: '4', ru: '4', enUp: '$', ruUp: ';',
      },
      Digit5: {
        en: '5', ru: '5', enUp: '%', ruUp: '%',
      },
      Digit6: {
        en: '6', ru: '6', enUp: '^', ruUp: ':',
      },
      Digit7: {
        en: '7', ru: '7', enUp: '&', ruUp: '?',
      },
      Digit8: {
        en: '8', ru: '8', enUp: '*', ruUp: '*',
      },
      Digit9: {
        en: '9', ru: '9', enUp: '(', ruUp: '(',
      },
      Digit0: {
        en: '0', ru: '0', enUp: ')', ruUp: ')',
      },
      Minus: {
        en: '-', ru: '-', enUp: '_', ruUp: '_',
      },
      Equal: {
        en: '=', ru: '=', enUp: '+', ruUp: '+',
      },
      Backspace: { en: 'Backspace', ru: 'Backspace' },
      Tab: { en: 'Tab', ru: 'Tab' },
      KeyQ: {
        en: 'q', ru: 'й', enUp: '~', ruUp: 'Ё',
      },
      KeyW: {
        en: 'w', ru: 'ц', enUp: '~', ruUp: 'Ё',
      },
      KeyE: {
        en: 'e', ru: 'у', enUp: '~', ruUp: 'Ё',
      },
      KeyR: {
        en: 'r', ru: 'к', enUp: '~', ruUp: 'Ё',
      },
      KeyT: {
        en: 't', ru: 'е', enUp: '~', ruUp: 'Ё',
      },
      KeyY: {
        en: 'y', ru: 'н', enUp: '~', ruUp: 'Ё',
      },
      KeyU: {
        en: 'u', ru: 'г', enUp: '~', ruUp: 'Ё',
      },
      KeyI: {
        en: 'i', ru: 'ш', enUp: '~', ruUp: 'Ё',
      },
      KeyO: {
        en: 'o', ru: 'щ', enUp: '~', ruUp: 'Ё',
      },
      KeyP: {
        en: 'p', ru: 'з', enUp: '~', ruUp: 'Ё',
      },
      BracketLeft: {
        en: '[', ru: 'х', enUp: '~', ruUp: 'Ё',
      },
      BracketRight: {
        en: ']', ru: 'ъ', enUp: '~', ruUp: 'Ё',
      },
      Backslash: {
        en: '\\', ru: '\\', enUp: '~', ruUp: 'Ё',
      },
      CapsLock: { en: 'CapsLock', ru: 'CapsLock' },
      KeyA: {
        en: 'a', ru: 'ф', enUp: '~', ruUp: 'Ё',
      },
      KeyS: {
        en: 's', ru: 'ы', enUp: '~', ruUp: 'Ё',
      },
      KeyD: {
        en: 'd', ru: 'в', enUp: '~', ruUp: 'Ё',
      },
      KeyF: {
        en: 'f', ru: 'а', enUp: '~', ruUp: 'Ё',
      },
      KeyG: {
        en: 'g', ru: 'п', enUp: '~', ruUp: 'Ё',
      },
      KeyH: {
        en: 'h', ru: 'р', enUp: '~', ruUp: 'Ё',
      },
      KeyJ: {
        en: 'j', ru: 'о', enUp: '~', ruUp: 'Ё',
      },
      KeyK: {
        en: 'k', ru: 'л', enUp: '~', ruUp: 'Ё',
      },
      KeyL: {
        en: 'l', ru: 'д', enUp: '~', ruUp: 'Ё',
      },
      Semicolon: {
        en: ';', ru: 'ж', enUp: '~', ruUp: 'Ё',
      },
      Quote: {
        en: "'", ru: 'э', enUp: '~', ruUp: 'Ё',
      },
      Enter: { en: '\n', ru: '\n' },
      ShiftLeft: { en: 'Shift', ru: 'Shift' },
      KeyZ: {
        en: 'z', ru: 'я', enUp: '~', ruUp: 'Ё',
      },
      KeyX: {
        en: 'x', ru: 'ч', enUp: '~', ruUp: 'Ё',
      },
      KeyC: {
        en: 'c', ru: 'с', enUp: '~', ruUp: 'Ё',
      },
      KeyV: {
        en: 'v', ru: 'м', enUp: '~', ruUp: 'Ё',
      },
      KeyB: {
        en: 'b', ru: 'и', enUp: '~', ruUp: 'Ё',
      },
      KeyN: {
        en: 'n', ru: 'т', enUp: '~', ruUp: 'Ё',
      },
      KeyM: {
        en: 'm', ru: 'ь', enUp: '~', ruUp: 'Ё',
      },
      Comma: {
        en: ',', ru: 'б', enUp: '~', ruUp: 'Ё',
      },
      Period: {
        en: '.', ru: 'ю', enUp: '~', ruUp: 'Ё',
      },
      Slash: {
        en: '/', ru: '.', enUp: '~', ruUp: 'Ё',
      },
      ShiftRight: { en: 'Shift', ru: 'Shift' },
      ControlLeft: { en: 'Control', ru: 'Control' },
      Space: { en: ' ', ru: ' ' },
      AltLeft: { en: 'Alt', ru: 'Alt' },
      ControlRight: { en: 'Control', ru: 'Control' },
    }
  },
  eventHandlers: {
    oninput: null,
    onclose: null,
  },
  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('section');
    this.elements.textArea = document.createElement('textarea');
    this.elements.keyboardContainer = document.createElement('div');
    this.elements.keysContainer = document.createElement('div')

    // Setup main elements
    this.elements.main.classList.add('section-container');
    this.elements.textArea.classList.add('textarea');
    this.elements.keyboardContainer.classList.add('keyboard_container');
    this.elements.keysContainer.classList.add('keys_container');

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keys_container");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
        element.addEventListener("focus", () => {
            this.open(element.value, currentValue => {
                element.value = currentValue;
            });
        });
    });
},
  },
  createKeys() {

  },
};
// renderPageElements(Keyboard);
