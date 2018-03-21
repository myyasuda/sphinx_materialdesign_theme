from os import path
from sphinx.jinja2glue import BuiltinTemplateLoader
from bs4 import BeautifulSoup

package_dir = path.dirname(path.abspath(__file__))

def get_path():
    return package_dir

def setup(app):
    app.add_html_theme('sphinx_materialdesign_theme', package_dir)
