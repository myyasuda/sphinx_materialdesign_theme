from os import path
from sphinx.jinja2glue import BuiltinTemplateLoader
from bs4 import BeautifulSoup

package_dir = path.dirname(path.abspath(__file__))

def get_path():
    return package_dir

def setup(app):
    app.add_html_theme('sphinx_materialdesign_theme', package_dir)
    # app.connect('builder-inited', builder_inited_handler)
    app.config.template_bridge = 'sphinx_materialdesign_theme.TemplateLoader'

class TemplateLoader(BuiltinTemplateLoader):
    def init(self, builder, theme=None, dirs=None):
        super(TemplateLoader, self).init(builder, theme, dirs)
        self.environment.filters['globaltoc'] = _globaltoc

def _globaltoc(val):
    soup = BeautifulSoup(val, "lxml")
    for ul in soup.find_all('ul'):
        ul['class'] = []

    for index, li in enumerate(soup.find_all('li')):
        is_current = 'current' in li['class'] and 'current' not in li.a['class']
        link_wrapper = soup.new_tag('span', **{'class': ['link-wrapper']})
        link = li.a
        link_wrapper.append(link)
        li.append(link_wrapper)
        if li.ul is not None:
            ul_id = 'globalnav-{0}'.format(index)
            ul = li.ul
            ul['id'] = ul_id
            ul['class'].append('collapse')
            toggle_wrapper = soup.new_tag('span', **{ 'class': ['nav-toggle'] })
            if is_current:
                ul['class'].append('show')
                toggle_wrapper['class'].append('show')
            else:
                ul['style'] = "display: none"
            toggle_a = soup.new_tag('a', **{ 'class': 'mdl-button mdl-js-button mdl-button--icon', 'data-toggle': '#{0}'.format(ul_id)})
            toggle_icon = soup.new_tag('i', **{ 'class': 'material-icons'})
            toggle_icon.string = 'keyboard_arrow_down'
            toggle_a.append(toggle_icon)
            toggle_wrapper.append(toggle_a)

            link_wrapper.append(toggle_wrapper)
            li.append(ul)

    for a in soup.select('a.current'):
        a['class'].append('mdl-color-text--primary')

    return soup.ul.prettify()
