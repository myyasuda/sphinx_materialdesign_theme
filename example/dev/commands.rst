==============
Build Commands
==============

|project|\ 's build command list.

packaging
---------

.. code-block:: bat

   python setup.py sdist

install
-------

.. code-block:: bat

   pip install dist/sphinx_materialdesign_theme-${version}.zip

Register PyPI
-------------

.. code-block:: bat

   python setup.py register sdist upload

Build Example's Document
------------------------

.. code-block:: bat

   sphinx-build -b html ./example ./_build -c ./example

