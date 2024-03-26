from glob import glob
import json


# takes */*/lang.json and articleName, returns lang
def lane(lang, articleName):
    return lang.split(articleName)[1].split('.')[0][1:]

# reads all articles folder, scans for all lang.json files
# updates lang list in articles.json file
def updateLangList():
    with open("articles.json", "r") as fi:
        articlesData = json.loads(fi.read())

    for article in  glob("*/"):
        articleName = article.split("/")[0]
        articlesData[articleName]["langs"] = [lane(lang, articleName) for lang in glob(f"{article}/*")]
    
    try:
        with open("articles.json", "w") as fo:
            fo.write(json.dumps(articlesData, indent=2))
    except:
        print("Error writing file!")

def main():
    updateLangList()

if __name__ == "__main__":
    main()