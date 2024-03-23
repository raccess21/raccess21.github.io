if (typeof require !== 'undefined') {
    const fs = require('fs');
    const paras = JSON.parse(fs.readFileSync('./article1.json', 'utf8'));
}

console.log(paras);
const article = document.getElementById("article");
for (let para of paras) {
    article.innerHTML += `<p id="para">${para}</p>`;
}