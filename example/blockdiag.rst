=================================
Examples: sphinxcontrib-blockdiag
=================================


.. contents:: Table of Contents
   :local:
   :depth: 1
   :backlinks: none

`sphinxcontrib-blockdiag` is a Sphinx extension for embedding blockdiag diagrams.
You can embed block diagrams with the `blockdiag` directive.

.. code-block:: text

   .. blockdiag::

       blockdiag admin {
         top_page -> config -> config_edit -> config_confirm -> top_page;
       }

.. blockdiag::

    blockdiag admin {
      top_page -> config -> config_edit -> config_confirm -> top_page;
    }

Setting
=======

You can get archive file at http://bitbucket.org/birkenfeld/sphinx-contrib/

Install
-------

.. code-block:: bash

   $ pip install sphinxcontrib-blockdiag


Configure Sphinx
----------------

To enable this extension, add ``sphinxcontrib.blockdiag`` module to extensions 
option at :file:`conf.py`. 

.. code-block:: python

   # Enabled extensions
   extensions = ['sphinxcontrib.blockdiag']

   # Fontpath for blockdiag (truetype font)
   blockdiag_fontpath = '/usr/share/fonts/truetype/ipafont/ipagp.ttf'

.. note::

   If you write documents including multibyte characters,
   you have to set fontpath to `blockdiag_fontpath`.

Directive
=========

.. describe:: .. blockdiag:: [filename]

   This directive inserts a block diagram into the document.
   When the `filename` argument is specified, the extension reads the diagram
   definition from the specified file.
   Otherwise, it reads the diagram definition from the code block.

   Examples::

      .. blockdiag:: foobar.diag

      .. blockdiag::

         blockdiag {
            // some diagrams are here.
         }

   In addition, the following options are recognized:

   ``alt`` : text
     Alternate text: a short description of the diagram,
     displayed by applications that cannot display diagram.

   ``height`` : length
     The desired height of the diagram.
     When the "scale" option is also specified, they are combined.
     For example, a height of 200px and a scale of 50 is equivalent to
     a height of 100px with no scale.

   ``width`` : length
     The width of the diagram.
     As with "height" above, when the "scale" option is also specified,
     they are combined.

   ``scale`` : integer percentage
     The uniform scaling factor of the image.
     The default is "100%", i.e. no scaling.

   ``maxwidth`` : length
     .. deprecated:: 1.4.0
        Use ``width`` option.

     Same as "width" option.

   ``align`` : "left", "center" or "right"
     The horizontal alignment of the diagram.

   ``caption`` : text
     The caption of the diagram.

   ``desctable`` :
     Description Table: a table that describes each diagram elements (cf. nodes, edges)
     When this option is specified, Sphinx generates Description Table from diagram,
     corrects descriptons from `description` attribute of each node and edges.

     Example::

       .. blockdiag::
          :desctable:

          blockdiag {
             A -> B -> C;
             A [description = "browsers in each client"];
             B [description = "web server"];
             C [description = "database server"];
          }

     Generated:

     .. blockdiag::
        :desctable:

        blockdiag {
           A -> B -> C;
           A [description = "browsers in each client"];
           B [description = "web server"];
           C [description = "database server"];
        }

   ``figwidth`` : "image", length
     The width of the figure.
     A special value of "image" is allowed, in which case
     the included diagram's actual width is used.

   ``figclass`` : text
     Set a `classes` attribute value on the figure element.

   ``name`` : text
     Set a `names` attribute value on the diagram-image element.
     This allows hyperlink references to the diagram using text as reference name.

   ``class`` : text
     Set a `classes` attribute value on the diagram-image element.

.. _sphinxcontrib_font_configurations:

Configuration File Options
==========================

.. confval:: blockdiag_fontpath = str or list of str

   The paths to truetype fonts.
   `blockdiag_fontpath` option accepts both single path string and list of paths.

   .. versionadded:: 0.1.1

      `blockdiag_fontpath` accepts fontpath list

.. confval:: blockdiag_fontmap = str

   The path to fontmap definitions.

.. confval:: blockdiag_antialias = bool

   Render diagrams in antialias mode or not.

.. confval:: blockdiag_transparency = bool

   Render diagrams as transparency or not.

   .. versionadded:: 1.5.0

.. confval:: blockdiag_html_image_format = "PNG" or "SVG"

   The output image format at generating HTML docs.

.. confval:: blockdiag_latex_image_format = "PNG" or "PDF"

   The output image format at generating PDF docs (through LaTeX).
   When a value of "PDF" is specified, you can get clear diagram images.
   In which case, reportlab_ library is required.

   .. _reportlab: https://pypi.python.org/pypi/reportlab

.. confval:: blockdiag_tex_image_format = "PNG" or "PDF"

   .. deprecated:: 1.4.0
      Use ``blockdiag_latex_image_format`` option.

   Same as "blockdiag_latex_image_format" option.

.. confval:: blockdiag_debug = bool

   Enable debug mode of blockdiag.

