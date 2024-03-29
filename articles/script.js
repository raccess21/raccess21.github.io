function createArticleLinks(eId, jsonObj) {
    let text = "";
    Object.keys(jsonObj).forEach(article => {
        text += `<a class="aLink" href="javascript:openArticle('` + article + 
        '&' + jsonObj[article]["langs"].join('+') + `')">${article}</a><br>`;
    });
    document.getElementById(eId).innerHTML = text;
}

function langSelector(eId, jsonObj) {
    const langs = jsonObj[localStorage.getItem("articleName")]["langs"];
    langList(eId, langs);
}

function langList(eId, langs, lang=false) {
    lang = lang || localStorage.getItem("lang");
    for (let i=0; i<langs.length; i++) {
        if (langs[i] == lang) {
            [langs[0], langs[i]] = [langs[i], langs[0]]
            break;
        }
    }
    
    const selector = document.getElementById(eId);
    for (let lang of langs) {
        let option = document.createElement("option");
        option.value = lang;
        option.textContent = lang;
        selector.appendChild(option);
    }    
}

function createPara(eId, jsonObj) {
    let text = "";
    for (let para of jsonObj) {
        text += `<p class='para'>${para}</p>`;
    }
    document.getElementById(eId).innerHTML = text;
};

function loadJson(path, eId=false, callback=false) {
    let xobj = new XMLHttpRequest();
    console.log(path)
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            if (callback) {
                callback(eId, JSON.parse(xobj.responseText));
            }
        }
    };
    xobj.send(null);
}

function changeSize(bulla, eId) {
    const article = document.getElementById(eId);
    const currentFontSize = parseInt(article.style.fontSize) || 16;
    const newFontSize = (bulla ? currentFontSize + 1 : currentFontSize - 1) + "px";
    article.style.fontSize = newFontSize;
    localStorage.setItem('fontSize', newFontSize);
}