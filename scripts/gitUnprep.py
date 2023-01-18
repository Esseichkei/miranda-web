from pathlib import Path
from itertools import chain

scssDir = Path('./style')
scssFiles = scssDir.glob('*.scss')
for file in scssFiles:
    content = ""
    with file.open('r', encoding="utf-8") as styleFile:
        styleFile.reconfigure(write_through=True)
        content = styleFile.read()
    content = content.replace(
            '---\n---\n\n$baseurl:"{{ site.baseurl }}";\n',
            '')
    content = content.replace('@ import \'',
            '@ import \'../_sass/_')
    with file.open('w', encoding="utf-8") as styleFile:
        styleFile.write(content)
    print(str(file) + ' updated')

scssPartialDir = Path('./_sass')
scssPartialFiles = scssPartialDir.glob('*.scss')
for file in scssPartialFiles:
    content = ""
    with file.open('r+', encoding="utf-8", buffering=2) as partialFile:
        partialFile.reconfigure(write_through=True)
        content = partialFile.read()
    content = content.replace('$baseurl + "/img',
            '"../img')
    with file.open('w', encoding="utf-8") as partialFile:
        partialFile.write(content)
    print(str(file) + ' updated')

baseDir = Path('.')
htmlFiles = baseDir.rglob('*.html')
phpFiles = baseDir.rglob('*.php')
swapFiles = chain(htmlFiles, phpFiles)
for file in swapFiles:
    content = ""
    with file.open('r+', encoding="utf-8", buffering=2) as swapFile:
        swapFile.reconfigure(write_through=True)
        content = swapFile.read()
    content = content.replace('/style/',
            '/css/')
    with file.open('w', encoding="utf-8") as swapFile:
        swapFile.write(content)
    print(str(file) + ' updated')
# TODO fix end of file duplication bug on unprepping