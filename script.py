from bs4 import BeautifulSoup as bs

def merger(st, fi):
    txt = ''
    for i in range(st, fi):
        with open(f"part{i:04}.xhtml", "r") as fi:
            txt += fi.read()
    with open("final.html", "w") as fo:
        fo.write(fun1(txt))
    

def rmBody(data):
    txt = '<body>'
    for d in data.split('<body>')[1:]:
        txt += d.split('</body>')[0] 
    return txt + '</body>'
    
def fun1(data):
    return bs(data, 'html.parser').prettify(formatter="html")
    
def indexTag(data):
    txt = '<div align="right" class="class_72" id="toc4________">\n<a href="#toc4________">अनुक्रम</a>\n</div>\n'
    ndata = ''
    data = data.split('\n')
    for i in range(len(data)-1):
        if 'id="JkHOm' in data[i+1]:
            ndata += txt
        ndata += f"{data[i]}\n"
    return ndata
            
def main():
    name = "index"
    with open(f"{name}.html", "r") as fi:
        data = fun1(fi.read())

    with open(f"{name}.html", "w") as fi:
        fi.write(data)
    
    #merger(0, 23)
if __name__ == '__main__':
    main()
