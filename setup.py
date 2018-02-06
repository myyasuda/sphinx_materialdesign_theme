from setuptools import setup

setup(
    name = 'sphinx_materialdesign_theme',
    version = '0.0.6',
    author = 'Masahiko Yasuda',
    author_email= 'myasuda@uchida.co.jp',
    url="https://github.com/myyasuda/sphinx_materialdesign_theme",
    docs_url="http://myyasuda.github.io/sphinx_materialdesign_theme/",
    description='Sphinx Material Design Theme',
    py_modules = ['sphinx_materialdesign_theme'],
    packages = ['themes'],
    include_package_data=True,
    license= 'MIT License',
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "Intended Audience :: System Administrators",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Topic :: Internet",
        "Topic :: Software Development :: Documentation"
    ],
)

