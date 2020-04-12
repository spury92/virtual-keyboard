window.addEventListener('DOMContentLoaded', () => { Keyboard.init(); });
const Keyboard = {
  elements: {
    main: null,
    textArea: null,
    keyboardContainer: null,
    keysContainer: null,
    keys: [],
  },
  properties: {
    altKey: false,
    capsLock: false,
    shiftKey: false,
    defaultLang: 'ru',
    layout: '',
    textPlaceholder: '',
  },
  keysMap: {
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
      en: 'q', ru: 'й', enUp: 'Q', ruUp: 'Й',
    },
    KeyW: {
      en: 'w', ru: 'ц', enUp: 'W', ruUp: 'Ц',
    },
    KeyE: {
      en: 'e', ru: 'у', enUp: 'E', ruUp: 'У',
    },
    KeyR: {
      en: 'r', ru: 'к', enUp: 'R', ruUp: 'К',
    },
    KeyT: {
      en: 't', ru: 'е', enUp: 'T', ruUp: 'Е',
    },
    KeyY: {
      en: 'y', ru: 'н', enUp: 'Y', ruUp: 'Н',
    },
    KeyU: {
      en: 'u', ru: 'г', enUp: 'U', ruUp: 'Г',
    },
    KeyI: {
      en: 'i', ru: 'ш', enUp: 'I', ruUp: 'Ш',
    },
    KeyO: {
      en: 'o', ru: 'щ', enUp: 'O', ruUp: 'Щ',
    },
    KeyP: {
      en: 'p', ru: 'з', enUp: 'P', ruUp: 'З',
    },
    BracketLeft: {
      en: '[', ru: 'х', enUp: '{', ruUp: 'Х',
    },
    BracketRight: {
      en: ']', ru: 'ъ', enUp: '}', ruUp: 'Ъ',
    },
    Backslash: {
      en: '\\', ru: '\\', enUp: '|', ruUp: '/',
    },
    CapsLock: { en: 'CapsLock', ru: 'CapsLock' },
    KeyA: {
      en: 'a', ru: 'ф', enUp: 'A', ruUp: 'Ф',
    },
    KeyS: {
      en: 's', ru: 'ы', enUp: 'S', ruUp: 'Ы',
    },
    KeyD: {
      en: 'd', ru: 'в', enUp: 'D', ruUp: 'В',
    },
    KeyF: {
      en: 'f', ru: 'а', enUp: 'F', ruUp: 'А',
    },
    KeyG: {
      en: 'g', ru: 'п', enUp: 'G', ruUp: 'П',
    },
    KeyH: {
      en: 'h', ru: 'р', enUp: 'H', ruUp: 'Р',
    },
    KeyJ: {
      en: 'j', ru: 'о', enUp: 'J', ruUp: 'О',
    },
    KeyK: {
      en: 'k', ru: 'л', enUp: 'K', ruUp: 'Л',
    },
    KeyL: {
      en: 'l', ru: 'д', enUp: 'L', ruUp: 'Д',
    },
    Semicolon: {
      en: ';', ru: 'ж', enUp: ':', ruUp: 'Ж',
    },
    Quote: {
      en: "'", ru: 'э', enUp: '"', ruUp: 'Э',
    },
    Enter: { en: '/n', ru: '/n' },
    ShiftLeft: { en: 'Shift', ru: 'Shift' },
    KeyZ: {
      en: 'z', ru: 'я', enUp: 'Z', ruUp: 'Я',
    },
    KeyX: {
      en: 'x', ru: 'ч', enUp: 'X', ruUp: 'Ч',
    },
    KeyC: {
      en: 'c', ru: 'с', enUp: 'C', ruUp: 'С',
    },
    KeyV: {
      en: 'v', ru: 'м', enUp: 'V', ruUp: 'М',
    },
    KeyB: {
      en: 'b', ru: 'и', enUp: 'B', ruUp: 'И',
    },
    KeyN: {
      en: 'n', ru: 'т', enUp: 'N', ruUp: 'Т',
    },
    KeyM: {
      en: 'm', ru: 'ь', enUp: 'M', ruUp: 'Ь',
    },
    Comma: {
      en: ',', ru: 'б', enUp: '<', ruUp: 'Б',
    },
    Period: {
      en: '.', ru: 'ю', enUp: '>', ruUp: 'Ю',
    },
    Slash: {
      en: '/', ru: '.', enUp: '?', ruUp: ',',
    },
    ShiftRight: { en: 'Shift', ru: 'Shift' },
    ControlLeft: { en: 'Control', ru: 'Control' },
    Space: { en: ' ', ru: ' ' },
    AltLeft: { en: 'Alt', ru: 'Alt' },
    ControlRight: { en: 'Control', ru: 'Control' },
  },
  keyboardCodes: [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
  ],
  breaks: [
    'Backspace', 'Backslash', 'Enter', 'ShiftRight',
  ],
  specialKeys: [
    'Backspace', 'Delete',
    'Tab', 'CapsLock', 'Enter',
    'ShiftLeft', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight',
    'ArrowLeft', 'ArrowDown', 'ArrowRight',
  ],
  switchKeys: [
    'Backquote', 'Comma', 'Period', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote'
  ],
  init() {
    // Create main elements
    this.elements.main = document.createElement('section');
    this.elements.textArea = document.createElement('textarea');
    this.elements.keyboardContainer = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    if (window.localStorage.layout) {
      this.properties.layout = window.localStorage.getItem('layout');
    } else {
      this.properties.layout = this.properties.defaultLang;
      window.localStorage.setItem('layout', this.properties.layout);
    }
    this.properties.textPlaceholder = this.properties.layout === 'en'
      ? 'Enter your text.\nShift switches keyboard into shift mode on simple click.\nLanguage doesn`t change at all'
      : 'Введите текст.\nShift переключает клавиатуру по нажатию.\nЯзык пока не переключается никак';

    // Setup main elements
    this.elements.main.classList.add('section-container');
    this.elements.textArea.classList.add('textarea');
    this.elements.textArea.setAttribute('rows', 12);
    this.elements.textArea.setAttribute('placeholder', this.properties.textPlaceholder);
    this.elements.keyboardContainer.classList.add('keyboard_container');
    this.elements.keysContainer.classList.add('keys_container');

    // Add to DOM
    this.elements.keyboardContainer.appendChild(this.elements.keysContainer);
    this.elements.main.appendChild(this.elements.textArea);
    this.elements.main.appendChild(this.elements.keyboardContainer);
    document.body.insertAdjacentElement('afterbegin', this.elements.main);
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = document.querySelectorAll('.key');

    for (const key of this.elements.keys) {
      key.addEventListener('click', this.handleClick);
      key.addEventListener('keydown', this.handleClick);
    }
  },
  createKeys() {
    const fragment = document.createDocumentFragment();
    this.keyboardCodes.forEach((code) => {
      // console.log(code);
      const keyElement = document.createElement('button');
      const insertLineBreak = this.breaks.indexOf(code) !== -1;
      const specialKey = this.specialKeys.indexOf(code) !== -1;
      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('key', code);
      if (code === 'Space') {
        keyElement.classList.add('key--space');
        keyElement.textContent = '';
      } else if (specialKey) {
        keyElement.classList.add('special_key');
        keyElement.classList.add('key--wide');
        keyElement.textContent = code;
      } else {
        keyElement.textContent = this.keysMap[code][`${this.properties.layout}`];
      }
      switch (code) {
        case 'Backspace':
          keyElement.addEventListener('click', this.removeChar);
          keyElement.addEventListener('keydown', this.removeChar);
          break;
        case 'Tab':
          keyElement.addEventListener('click', () => {
            document.querySelector('textarea').value += '    ';
          });
          break;
        case 'CapsLock':
          keyElement.classList.add('activatable_key');
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('activatable_key--active', this.properties.capsLock);
          });
          break;
        case 'Enter':
          keyElement.addEventListener('click', () => {
            document.querySelector('textarea').value += '\n';
          });
          break;
        case 'Space':
          keyElement.addEventListener('click', () => {
            document.querySelector('textarea').value += ' ';
          });
          break;
        case 'ShiftLeft' || 'ShiftRight':
          keyElement.addEventListener('keydown', this.toggleShift);
          keyElement.addEventListener('click', this.toggleShift);
          break;
        // case 'ControlLeft' || 'ControlRight':
        //   keyElement.addEventListener('click', () => {
        //     this.close();
        //   });
        //   break;
        case 'AltLeft' || 'AltRight':
          keyElement.addEventListener('keydown', () => {
            // console.log(this.properties.altKey)
            this.properties.altKey = true;
          });
          keyElement.addEventListener('keyup', () => {
            // console.log(this.properties.altKey)
            this.properties.altKey = false;
          });
          break;
        // case 'ArrowUp' || 'ArrowLeft' || 'ArrowDown' || 'ArrowRight':
        case code.startsWith('Arrow'):
          keyElement.addEventListener('click', () => {
            this.close();
          });
          break;
      }
      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
      fragment.appendChild(keyElement);
    });
    return fragment;
  },
  toggleCapsLock() {
    const keyMap = Keyboard.keysMap;
    Keyboard.properties.capsLock = !Keyboard.properties.capsLock;
    for (const key of Keyboard.keyboardCodes) {
      const selectedKey = document.querySelector(`.${key}`);
      if (Keyboard.properties.layout === 'ru') {
        if (key.startsWith('Key') || Keyboard.switchKeys.includes(key)) {
          selectedKey.textContent = Keyboard.properties.capsLock
            ? keyMap[key][`${Keyboard.properties.layout}Up`]
            : keyMap[key][`${Keyboard.properties.layout}`];
        }
      } else {
        if (key.startsWith('Key') || !Keyboard.switchKeys.includes(key)) {
        selectedKey.textContent = Keyboard.properties.capsLock
          ? keyMap[key][`${Keyboard.properties.layout}Up`]
          : keyMap[key][`${Keyboard.properties.layout}`];
        }
      }
    }
  },
  toggleShift() {
    const keyMap = Keyboard.keysMap;
    Keyboard.properties.shiftKey = !Keyboard.properties.shiftKey
    for (const key of Keyboard.keyboardCodes) {
      const selectedKey = document.querySelector(`.${key}`);
      if (Keyboard.properties.layout === 'ru') {
        if (!Keyboard.specialKeys.includes(key) || Keyboard.switchKeys.includes(key)) {
          selectedKey.textContent = Keyboard.properties.shiftKey
            ? keyMap[key][`${Keyboard.properties.layout}Up`]
            : keyMap[key][`${Keyboard.properties.layout}`];
        }
      } else {
        if (!Keyboard.specialKeys.includes(key)) {
        selectedKey.textContent = Keyboard.properties.shiftKey
          ? keyMap[key][`${Keyboard.properties.layout}Up`]
          : keyMap[key][`${Keyboard.properties.layout}`];
        }
      }
      // Keyboard.toggleCapsLock();
    }
  },
  removeChar(event) {
    event.preventDefault();
    let value = document.querySelector('textarea').value;
    document.querySelector('textarea').value = value.substring(0, value.length - 1);
  },
  handleClick(event) {
    // let currentKey = document.querySelector(`.${event.target.classList[1]}`);
    event.target.classList.add('active');
    // event.preventDefault();
    // console.log(event.target.classList)
    // console.log(event)
    if (!Keyboard.specialKeys.includes(event.target.classList[1])) {
      document.querySelector('textarea').value += event.target.textContent;
    };
    event.target.classList.remove('active');
  },
  toggleLayout(event) {
    // event.preventDefault();
    if (event.altKey) {
      Keyboard.properties.layout = Keyboard.properties.layout === 'ru' ? 'en' : 'ru';
      window.localStorage.layout = Keyboard.properties.layout;
      // console.log(Keyboard.properties.layout)
      this.toggleCapsLock();
    }
  },
};