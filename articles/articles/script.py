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
    articles = {}
    lang = "en"
    with open(f"articles.json", "r") as fi:
        articlesData = json.loads(fi.read())

    for article in  glob("*/"):
        articleName = article.split("/")[0]         #get articleName
        print(articleName)
        articles[articleName] = {
            "langs": [lane(lang, articleName) for lang in glob(f"{article}/*")],
        }
        tags = {}
        desc = "Description Not Available"
        tm = datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")
        if articleName in articlesData.keys():                         
            tags = articlesData[articleName]["tags"]
            desc = articlesData[articleName]["desc"]
            tm = articlesData[articleName]["time"]
            
        articles[articleName]["tags"] = tags
        articles[articleName]["desc"] = desc
        articles[articleName]["time"] = tm

    
    try:
        with open(f"articles.json", "w") as fo:
            fo.write(json.dumps(articles, indent=2))
    except:
        print("Error writing file!")

def updateLangList2():
    # characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_"
    articles = {}
    default = {
        "en": "विवरण उपलब्ध नहीं है",
        "hi": "Description Not Available"
    }
    with open(f"articles.json", "r") as fi:
        articlesData = json.loads(fi.read())
    
    for article in  glob("*/"):
        articleName = article.split("/")[0]         #get articleName
        print(articleName)
        articles[articleName] = {
            "langs": [lane(lang, articleName) for lang in glob(f"{article}/*")],
        }
        tags = {}
        if articleName in articlesData.keys():                         
            tags = articlesData[articleName]["tags"]
            tm = articlesData[articleName]["time"]
        else:
            tm = datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")
        articles[articleName]["tags"] = tags
        articles[articleName]["time"] = tm

    
    try:
        with open(f"articles2.json", "w") as fo:
            fo.write(json.dumps(articles, indent=2))
    except:
        print("Error writing file!")

def main():
    updateLangList2()

if __name__ == "__main__":
    main()