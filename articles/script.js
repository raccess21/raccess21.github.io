function createArticleLinks(eId, jsonObj) {
    let text = "";
    for (let article of jsonObj) {
        text += `<a class="aLink" href="javascript:openArticle('` + article.name + 
        '&' + article.langs.join('+') + `')">${article.name}</a><br>`;
    }
    document.getElementById(eId).innerHTML = text;
}

function langSelector(langSelector, langs = ["en"]) {
    for (let lang of langs) {
        let option = document.createElement("option");
        option.value = lang;
        option.textContent = lang;
        selector.appendChild(option);
    }
    selector.selectedOptions[0].textContent = lang;
}

function createPara(eId, jsonObj) {
    let text = "";
    for (let para of jsonObj) {
        text += `<p class='para'>${para}</p>`;
    }
    document.getElementById(eId).innerHTML = text;
};

function loadJson(path, callback, eId) {
    let xobj = new XMLHttpRequest();
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(eId, JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}