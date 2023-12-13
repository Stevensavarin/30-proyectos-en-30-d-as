const colorSchemeLSKey = "mp--color--scheme";

readColorSchemeFromLS();
let checkBoxElement = document.querySelector(".dark-toggle");

checkBoxElement.checked = isUsingDarkMode();

checkBoxElement.addEventListener("change", function(){
    if(this.checked){
        changeToDarkMode();
    }else
        changeToLightMode();
});

function readColorSchemeFromLS(){
    let colorScheme = getColorSchemFromLS();
    if(!colorScheme) return;

    let bodyElement = document.querySelector("body");

    if(colorScheme === "light"){
        changeToLightMode();
    }else{
        changeToDarkMode();
    }
}

function changeToLightMode(){
    let bodyElement = document.querySelector("body");
    bodyElement.classList.remove("force-dark");
    bodyElement.classList.add("force-light");
    setColorSchemToLS("light");
}

function changeToDarkMode(){
    let bodyElement = document.querySelector("body");
    bodyElement.classList.remove("force-light");
    bodyElement.classList.add("force-dark");
    setColorSchemToLS("dark");
}

function setColorSchemToLS(value){
    try{
        window.localStorage.setItem(colorSchemeLSKey, value);
    }catch{
        console.log("Error en Local Storage");
    }
}

function getColorSchemFromLS(){
    try{
        return window.localStorage.getItem(colorSchemeLSKey);
    }catch{
        console.log("Error en Local Storage");
    }
}

function isUsingDarkMode(){
    let bodyElement = document.querySelector("body");

    let bodyStyle = getComputedStyle(bodyElement);
    let bodyBackgroundColor = rgb2hex(bodyStyle.backgroundColor);
    let darkModeBgColor = "#0D1B1E";

    return darkModeBgColor === bodyBackgroundColor;
}

function rgb2hex(rgb){
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x){
        return("0" + parseInt(x).toString(16)).slice(-2);
    }
    return ("#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])).toUpperCase();
}