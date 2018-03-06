from os import path

__version__ = '0.1.3'
__version_full__ = __version__

package_dir = path.dirname(path.abspath(__file__))

def get_path():
    return package_dir

def setup(app):
    app.add_html_theme('sphinx_materialdesign_theme', package_dir)
