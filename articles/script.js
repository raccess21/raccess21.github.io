function createArticleLinks(jsonObj) {
    let text = "";
    for (let article of jsonObj) {
        text += '<a class="aLink" href="javascript:openArticle' +
            `('article.html?article=${article.name}')">${article.name}</a><br>`;
    }
    document.getElementById("articleList").innerHTML = text;
}