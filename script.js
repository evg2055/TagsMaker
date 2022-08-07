"use strict";

const BUTTON = document.querySelector('#button'); //кнопка добавить
const BUTTON2 = document.querySelector('#button2'); //кнопка выести сохранненый список или другой список тегов
const INPUT = document.querySelector('input');
let tagsSet = new Set;
const tagsBlock = document.querySelector('#tagsBlock');
const testButton = document.querySelector('#testButton'); //выввести список тегов в консоль
const readOnlyButton = document.querySelector('#readOnly');



// блок локал стораж
function setLocalSt() {                              //запись в локал стр
    let tagsArr = Array.from(tagsSet);
    let tagsStr = JSON.stringify(tagsArr);
    localStorage.setItem('testSet', tagsStr);
}

function getLocalSt() {                             //чтение в локал стр
    let read = localStorage.getItem('testSet');
    let tagsArr = JSON.parse(read);
    tagsSet = new Set(tagsArr);
}
function render() {                                             // рендер
    let childDiv = document.querySelectorAll('#tagsBlock p');
    for(let oldTag of childDiv) {
        tagsBlock.removeChild(oldTag);
    }

    for(let value of tagsSet) { 
        createTag(value);
    }
}
//  конец блок локал стораж

function createTag(value) {                           //создать теги
    let newP = document.createElement('p');

    if (value[0] === '#'){
    
    newP.textContent = '#' + value.slice(1);
    } else { newP.textContent ='#' + value;};

    let closeButton = document.createElement('i');
    closeButton.classList.add('fa', 'fa-close');

    closeButton.addEventListener('click',function DeleteTag (event) {
    if (readOnlyButton.checked == false ) {
    tagsBlock.removeChild(newP);
    tagsSet.delete(value);
    setLocalSt();
    }
}
    )
    newP.appendChild(closeButton);
    tagsBlock.appendChild(newP);
setLocalSt();
};

function mainFunc () {                                //добавить теги через кнопку add
    let oldSize = tagsSet.size;
    (INPUT.value[0] === '#') ? tagsSet.add(INPUT.value.slice(1)) : tagsSet.add(INPUT.value); //определяем валидный тег
    let newSize = tagsSet.size;
    
    if (oldSize != newSize && INPUT.value != '') {
    let valueINPUT = INPUT.value;

    createTag(valueINPUT); 
    }
INPUT.value = '';
}; 

readOnlyButton.addEventListener('click', () => {  // функция Ридонли

    if (readOnlyButton.checked) {
        BUTTON.removeEventListener('click', mainFunc);
        INPUT.disabled = true;
    } else { 
        BUTTON.addEventListener('click', mainFunc); 
        INPUT.disabled = false;      
    };
});

function showTags() {                               //вывести в консоль теги
    for(let elem of tagsSet) {
        console.log(elem);
    }
}

BUTTON.addEventListener('click', mainFunc);

BUTTON2.addEventListener('click',() => {getLocalSt(); render()} );

testButton.addEventListener('click', showTags);


