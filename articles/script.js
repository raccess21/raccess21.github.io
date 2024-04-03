function sortByArticleName(jsonObj) {
    return Object.keys(jsonObj).sort();
}
function sortByArticleNameRev(jsonObj) {
    return Object.keys(jsonObj).sort((a, b) => b.localeCompare(a));
}


function createArticleLinks(eId, jsonObj, sortType = sortByArticleName) {
    let text = "";
    sortType(jsonObj).forEach(article => {
        desc = jsonObj[article]["desc"] || "Description not available";
        dname = jsonObj[article]["dname"] || "Description not available";
        text += '<div class="aLink">' + 
                    `<img alt="article thumbnail" src="assets/images/articleName_thumb.jpg">` +
                    `<div class="link">` + 
                        `<a href="javascript:openArticle('${article}&` + 
                        jsonObj[article]["langs"].join(',') + `')">${dname}</a>`+
                        `<span class="linkDesc">${desc}</span></div></div>`;
    });
    document.getElementById(eId).innerHTML = text;
}

function langSelector(eId, jsonObj) {
    const langs = jsonObj[localStorage.getItem("articleName")]["langs"];
    langList(eId, langs);
}

async function fetchJson(paths, eId=false, callback=false, sortType = sortByArticleName) {
    responses = {0: 0, 1:1};
    for (let i=0; i<paths.length; i++) {
        try {
            response = await fetch(paths[i]);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            responses[i] =  await response.json();
        } catch (error) {
            console.error(`Error fetching Json: ${error}`);
            return null;
        }
    }
    Object.keys(responses[0]).forEach((article) => {
        responses[0][article] = {...responses[0][article], ...responses[1][article]};
    })
    callback(eId, responses[0], sortType);

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


function loadJson(path, eId=false, callback=false) {
    let xobj = new XMLHttpRequest();
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

function createPara(eId, jsonObj) {
    let text = "";
    for (let para of jsonObj) {
        text += `<p class='para'>${para}</p>`;
    }
    document.getElementById(eId).innerHTML = text;
};

function changeSize(bulla, eId) {
    const article = document.getElementById(eId);
    const currentFontSize = parseInt(article.style.fontSize) || 16;
    const newFontSize = (bulla ? currentFontSize + 1 : currentFontSize - 1) + "px";
    article.style.fontSize = newFontSize;
    localStorage.setItem('fontSize', newFontSize);
}