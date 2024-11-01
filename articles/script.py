from glob import glob
import json
from datetime import datetime
# import random
import xml.dom.minidom as xmlParser
import xml.sax.saxutils as ST
import os
# import git

# takes */*/lang.json and articleName, returns lang
def lane(lang, articleName):
    print(lang)
    # return articleName
    # print(lang.split(articleName)[1].split('.')[0][1:])
    # return lang.split(articleName)[1].split('.')[0][1:]

# reads all articles folder, scans for all lang.json files
# updates lang list in articles.json file

def updateLangList():
    # characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_"
    
    ####EXISTING DATA LOADER
    langs = ["en", "hi"]
    
    with open(f"articles/articles.json", "r") as fi:
        articlesData = json.loads(fi.read())

    with open(f"sitemap.xml", "r") as fi:
        xml = fi.read().replace('\n', '').replace('\t', '').split('</urlset>')[0]
    
    articlesLangData = {}
    for lang in langs:
        with open(f"articles/articles{lang}.json", "r") as fi:
            articlesLangData[lang] = json.loads(fi.read())
    
    #######################################


    defaultDesc = {
        "hi": "विवरण उपलब्ध नहीं है",
        "en": "Description Not Available"
    }

    
    for num, article in  enumerate(glob("articles/*/")):
        articleName = article.split("/")[1]         #get articleName
        print(str(num + 1) + '. ' + articleName)

        if articleName not in articlesData:
            articlesData[articleName] = {
                "tags"  : {},
                "langs" : [],
                "thumb": "articleName_thumb.jpg",
                "cTime" : datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f"), 
                "mTime" : datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f") 
            }
        #scan for all files in article name folder, langs list is name of all the foders, 
        # lane(lang.json) retrieves lang from file path name
        articlesData[articleName]["langs"] = [
                                        lang.split(article)[1].split('.')[0]
                                        for lang in glob(f"{article}/*")
                                        ]
        # for lang in glob(f"{article}/*"):
        #     print(lang.split(article)[1].split('.')[0])
        for lang in articlesData[articleName]["langs"]:
            aName  = articleName.replace(" ", "_")
            if  f'articles_web/{aName}_{lang}' not in xml:
                xml += f'<url><loc>https://raccess21.github.io/articles/articles_web/{aName}_{lang}.html</loc><lastmod>{articlesData[articleName]["mTime"].split("T")[0]}</lastmod><changefreq>never</changefreq><priority>0.8</priority></url>'

        for lang in langs:
            if articleName not in articlesLangData[lang]:
                articlesLangData[lang][articleName] = {
                    "dname": articleName,
                    "desc" : defaultDesc[lang]
                }

    xml += '</urlset>'  
    xml = xmlParser.parseString(xml).toprettyxml()

    try:
        with open(f"articles/articles.json", "w") as fo:
            fo.write(json.dumps(articlesData, indent=2))
    except:
        print("Error writing file!")

    try:
        with open(f"sitemap.xml", "w") as fo:
            fo.write(xml)
    except:
        print("Error writing file!")

    for lang in langs:
        try:
            with open(f"articles/articles{lang}.json", "w", encoding="utf-8") as fo:
                fo.write(json.dumps(articlesLangData[lang], indent=2, ensure_ascii=False))
        except:
            print("Error writing file!")

def xmlupdate():
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

    with open('articles/articles.json', 'r') as fi:
        articesData = json.loads(fi.read())
    
    files = 0
    for key in articesData.keys():
        for lang in articesData[key]["langs"]:
            files += 1
            articleName  = key.replace(" ", "_")
            xml += f'<url><loc>https://raccess21.github.io/articles/articles_web/{articleName}_{lang}.html</loc><lastmod>{articesData[key]["mTime"].split("T")[0]}</lastmod><changefreq>never</changefreq><priority>0.8</priority></url>'
    xml += '</urlset>'
    print(f"Total files: {files+1}")
    with open('sitemap.xml', 'w') as fo:
        xml = xmlParser.parseString(xml).toprettyxml()
        fo.write(xml)

def createHtml():
    'http://127.0.0.1:5500/articles_web/Advertisement_and_Idiocracy?en.html'
    with open('assets/layouts/article.html', 'r') as fi:
        html = fi.read()

    with open('articles/articles.json', 'r') as fi:
        articlesData = json.loads(fi.read())
    langs = ["en", "hi", "fr"]
    articleLangData = {}
    for lang in langs:
        with open(f'articles/articles{lang}.json', "r") as fi:
            articleLangData[lang] = json.loads(fi.read())

    for article in articlesData.keys():
        for lang in articlesData[article]["langs"]:
            nHtml = html
            title = articleLangData[lang][article]["dname"]
            try:
                title = title + " : " + articleLangData[lang][article]["dname2"]
            except KeyError:
                ...
            nHtml = nHtml.replace('$title', title)
            nHtml = nHtml.replace('$subject', title.replace(' ', '%20'))
            with open(f'articles/{article}/{lang}.json') as fi:
                paras = json.loads(fi.read())
            nHtml = nHtml.replace('$description', paras[0])
            content = '<p class="para">' + '</p>\n\t\t\t<p class="para">'.join(paras) + '</p>'
            nHtml = nHtml.replace('$content', content)
            nHtml = nHtml.replace('$articleList', '')
        
            # writing html
            with open(f'articles_web/{article.replace(" ", "_")}_{lang}.html', 'w') as fo:
                fo.write(nHtml)

def checkGit():
    ...

def getLinks():
    with open('sitemap.xml', 'r') as fi:
        links = [link.split('</loc>')[0] for link in fi.read().split('<loc>')[1:]]
    with open('links.txt', 'w') as fo:
        fo.write('\n'.join(links))
    
def renaam():
    for html in glob('articles_web/*'):
        if '?' in html:
            print(html)
            os.rename(html, html.replace('?', '_'))

def main():
    updateLangList()
    createHtml()
    # getLinks()
    # renaam()
    xmlupdate()

if __name__ == "__main__":
    main()