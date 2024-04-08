from glob import glob
import json
from datetime import datetime
import random
import xml.dom.minidom as xmlParser
import xml.sax.saxutils as ST

# takes */*/lang.json and articleName, returns lang
def lane(lang, articleName):
    return lang.split(articleName)[1].split('.')[0][1:]

# reads all articles folder, scans for all lang.json files
# updates lang list in articles.json file

def updateLangList():
    # characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_"
    
    ####EXISTING DATA LOADER
    langs = ["en", "hi"]
    
    with open(f"articles.json", "r") as fi:
        articlesData = json.loads(fi.read())

    with open(f"sitemap.xml", "r") as fi:
        xml = fi.read().replace('\n', '').replace('\t', '').split('</urlset>')[0]
    
    articlesLangData = {}
    for lang in langs:
        with open(f"articles{lang}.json", "r") as fi:
            articlesLangData[lang] = json.loads(fi.read())
    
    #######################################


    defaultDesc = {
        "hi": "विवरण उपलब्ध नहीं है",
        "en": "Description Not Available"
    }

    
    for num, article in  enumerate(glob("*/")):
        articleName = article.split("/")[0]         #get articleName
        print(str(num + 1) + '. ' + articleName)

        if articleName not in articlesData:
            articlesData[articleName] = {
                "tags" : {},
                "langs": [],
                "time" : datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f") 
            }
        #scan for all files in article name folder, langs list is name of all the foders, 
        # lane(lang.json) retrieves lang from file path name
        articlesData[articleName]["langs"] = [lane(lang, articleName) for lang in glob(f"{article}/*")]
        
        for lang in articlesData[articleName]["langs"]:
            aName  = articleName.replace(" ", "%20")
            if  f'https://raccess21.github.io/articles/article.html?article={aName}&amp;lang={lang}' not in xml:
                xml += f'<url><loc>https://raccess21.github.io/articles/article.html?article={aName}&amp;lang={lang}</loc><lastmod>{articlesData[articleName]["time"].split("T")[0]}</lastmod><changefreq>never</changefreq><priority>0.8</priority></url>'

        for lang in langs:
            if articleName not in articlesLangData[lang]:
                articlesLangData[lang][articleName] = {
                    "dname": articleName,
                    "desc" : defaultDesc[lang]
                }

    xml += '</urlset>'  
    xml = xmlParser.parseString(xml).toprettyxml()

    try:
        with open(f"articles2.json", "w") as fo:
            fo.write(json.dumps(articlesData, indent=2))
    except:
        print("Error writing file!")

    try:
        with open(f"sitemap2.xml", "w") as fo:
            fo.write(xml)
    except:
        print("Error writing file!")

    for lang in langs:
        try:
            with open(f"articles{lang}2.json", "w", encoding="utf-8") as fo:
                fo.write(json.dumps(articlesLangData[lang], indent=2, ensure_ascii=False))
        except:
            print("Error writing file!")

def xmlupdate():
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

    with open('articles.json', 'r') as fi:
        articesData = json.loads(fi.read())
    
    for key in articesData.keys():
        for lang in articesData[key]["langs"]:
            articleName  = key.replace(" ", "%20")
            xml += f'<url><loc>https://raccess21.github.io/articles/article.html?article={articleName}&lang={lang}</loc><lastmod>{articesData[key]["time"].split("T")[0]}</lastmod><changefreq>never</changefreq><priority>0.8</priority></url>'
    xml += '</urlset>'
    xml = xmlParser.parseString(xml.replace('&', '&amp;')).toprettyxml()

    with open('sitemap.xml', 'w') as fo:
        fo.write(xml)
        # xml = xmlParser.parseString(xml).toprettyxml()
def main():
    updateLangList()

if __name__ == "__main__":
    main()