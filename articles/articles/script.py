from glob import glob
import json
from datetime import datetime
import random

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
    
    articlesLangData = {}
    for lang in langs:
        with open(f"articles{lang}.json", "r") as fi:
            articlesLangData[lang] = json.loads(fi.read())
    
    #######################################


    defaultDesc = {
        "hi": "विवरण उपलब्ध नहीं है",
        "en": "Description Not Available"
    }

    
    for article in  glob("*/"):
        articleName = article.split("/")[0]         #get articleName
        print(articleName)

        if articleName not in articlesData.keys():
            articlesData[articleName] = {
                "tags" : {},
                "langs": [],
                "time" : datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f") 
            }
        #scan for all files in article name folder, langs list is name of all the foders, 
        # lane(lang.json) retrieves lang from file path name
        articlesData[articleName]["langs"] = [lane(lang, articleName) for lang in glob(f"{article}/*")]
        
        for lang in langs:
            if articleName not in articlesLangData[lang].keys():
                articlesLangData[lang][articleName] = {
                    "dname": articleName,
                    "desc" : defaultDesc[lang]
                }

    
    try:
        with open(f"articles.json", "w") as fo:
            fo.write(json.dumps(articlesData, indent=2))
    except:
        print("Error writing file!")

    for lang in langs:
        try:
            with open(f"articles{lang}.json", "w", encoding="utf-8") as fo:
                fo.write(json.dumps(articlesLangData[lang], indent=2, ensure_ascii=False))
        except:
            print("Error writing file!")

def main():
    updateLangList()

if __name__ == "__main__":
    main()