const englishLowerKeys = {
  keys: [
    96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, // first row with digits
    113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, //second row starting with q
    97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39,  // third row starting with a
    122, 120, 99, 118, 98, 110, 109, 44, 46, 47, // fourth row starting with z
  ],
  breaks: [
    113, 97, 122
  ]
};
const englishUpperKeys = {
  keys: [
    126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, // first row with digits
    81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 123, 125, 124, //second row starting with q
    65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34, // third row starting with a
    90, 88, 67, 86, 66, 78, 77, 60, 62, 63, // fourth row starting with z
  ],
  breaks: [
    81, 65, 90
  ]
};

const russianLowerKeys = {
  keys: [
    1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61,
    1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92, 
    1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101,
    1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46,
  ],
  breaks: [
    1081, 1092, 1103
  ]
};
const russianUpperKeys = {
  keys: [
    1025, 33, 34, 8470, 59, 37, 58, 63, 42, 40, 41, 95, 43,
    1049, 1062, 1059, 1050, 1045, 1053, 1043, 1064, 1065, 1047, 1061, 1066, 92, 
    1060, 1067, 1042, 1040, 1055, 1056, 1054, 1051, 1044, 1046, 34,
    1069, 1071, 1063, 1057, 1052, 1048, 1058, 1068, 1041, 1070, 44
  ],
  breaks: [
    1049, 1060, 1069
  ]
};

const layoutsMap = {
  'en': englishLowerKeys,
  'ru': russianLowerKeys
}

// document.onkeypress = event => {
//   keyboard.push(event);
//   console.log(event.shiftKey);
// };

const renderPageElements = () => {
  try {
    keyboardLayout = window.localStorage.getItem('layout')
  } catch(error) {
    let keyboardLayout = 'ru' // default, if not found locally
    window.localStorage.setItem('layout', keyboardLayout);
  }

  let keyboardContainer = document.createElement('div')
  keyboardContainer.classList.add('container')

  let textArea = document.createElement('textarea');

  let newDiv = document.createElement('div');
  newDiv.classList.add('keyboard');

  document.body.appendChild(keyboardContainer);
  keyboardContainer.appendChild(textArea);
  keyboardContainer.appendChild(newDiv);

  renderKeyboard(layoutsMap[keyboardLayout])
};

const handleClick = () => {
  let textArea = document.querySelector('textarea');
  document.onkeypress = event => {
    console.log(event);
    let activeKey = document.querySelector(`.key[data="${event.key}"]`)
    activeKey.classList.add('active');
    textArea.value += event.key;
    window.setTimeout(() => activeKey.classList.remove('active'), 50);
  }
};

const renderKeyboard = (keyboard) => {

  keyboard.keys.forEach(key => {
    let keyboardDiv = document.querySelector('.keyboard')
    let out = document.createElement('div');
    if (keyboard.breaks.includes(key)){
      out.classList.add('clearfix');
    } 
    out.classList.add('key');
    out.setAttribute('data', String.fromCharCode(key))
    textContent = document.createTextNode(String.fromCharCode(key))
    out.appendChild(textContent);

    keyboardDiv.appendChild(out);
  });
};


renderPageElements();
document.querySelector('.keyboard').addEventListener('click', handleClick());
