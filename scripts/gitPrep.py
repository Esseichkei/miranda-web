from pathlib import Path
from itertools import chain

scssDir = Path('./style')
scssFiles = scssDir.glob('*.scss')
for file in scssFiles:
    with file.open('r+', encoding="utf-8") as styleFile:
        content = styleFile.read()
        content = content.replace('../_sass/_', '')
        styleFile.seek(0, 0)
        if (content.find('---\n---\n\n$baseurl:"{{ site.baseurl }}";\n') == -1):
            styleFile.write('---\n---\n\n$baseurl:"{{ site.baseurl }}";\n')
        styleFile.write(content)
        print(str(file) + ' updated')

scssPartialDir = Path('./_sass')
scssPartialFiles = scssPartialDir.glob('*.scss')
for file in scssPartialFiles:
    with file.open('r+', encoding="utf-8") as partialFile:
        content = partialFile.read()
        content = content.replace('"../img', '$baseurl + "/img')
        partialFile.seek(0, 0)
        partialFile.write(content)
        print(str(file) + ' updated')

baseDir = Path('.')
htmlFiles = baseDir.rglob('*.html')
phpFiles = baseDir.rglob('*.php')
swapFiles = chain(htmlFiles, phpFiles)
for file in swapFiles:
    with file.open('r+', encoding="utf-8") as partialFile:
        content = partialFile.read()
        content = content.replace('href="./css/',
            'href="./style/')
        partialFile.seek(0, 0)
        partialFile.write(content)
        print(str(file) + ' updated')