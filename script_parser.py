import os

# Parse the readme, and add new script info
# based on the flags used for tampermonkey.


# Default section.

intro = """
#tampermonkey
My ongoing TamperMonkey scripts for Chrome.

## modules

"""


def _markdown_param(line, name):
    return line.replace(
        '// @{}'.format(name), '\n**@{}**: '.format(name)).strip()


def _parse_script(doc):
    # Parse out the tampermonkey annotations and use them as markdown entries.
    vals = ''
    with open(doc) as jsdoc:
        param = ''
        for line in jsdoc.readlines():
            if line.startswith('// @name '):
                param = _markdown_param(line, 'name')
            elif line.startswith('// @description '):
                param = _markdown_param(line, 'description')
            else:
                continue
            vals += '\n{}\n'.format(param)
    return vals + '\n'


def parse():
    # Overwrite to prevent concatenating random text, etc...
    with open('README.md', 'wb') as markdownfile:
        markdownfile.write(intro)
        jsfiles = os.listdir('src/')
        for jsfile in jsfiles:
            markdownfile.write('#### {}\n'.format(jsfile))
            markdownfile.write(_parse_script(
                '{}/src/{}'.format(os.getcwd(), jsfile)))


if __name__ == '__main__':
    parse()
