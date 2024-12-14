.. _translate-book:

Editing or Translating This Book
================================

Rationale
---------

We have given a lot of thought to setting up this documentation in a way that will make it easy to maintain translations, allow modification for specific sites, and offer a clear process for potential contributors to submit changes to the official version.

A wiki would be one obvious way to make editing easy -- but for managing multiple versions, languages and formats over a long period of time, maintaining text files in version control gives us more control and flexibility than a set of wikis stuffing text in databases.  Using files in revision control facilitates including scripts to automatically reproduce the steps in demonstrations in the documentation, like `Selenium <http://seleniumhq.org/>`_ scripts.  Also, it fits in nicely with the rest of our project management systems and code documentation practices.

Even if this system sounds intimidating, please give it a chance.  After you get through the initial setup, the actual editing is very wiki-like.  If you decide you can't deal with the revision control part, go ahead and just email `Tom Hoffman <mailto:hoffman@schooltool.org>`_ with changes, and I'll try to handle your contributions from there.  Simple changes can simply be `filed as bugs on SchoolTool <https://bugs.edge.launchpad.net/schooltool>`_.

Getting the Sources
-------------------

For non-programmers, the weird part will be using the `Bazaar version control system <http://bazaar-vcs.org/>`_ (aka bzr).   

To install bzr on Ubuntu do::

    sudo apt-get install bzr

For all other platforms see `Bazaar downloads <http://bazaar-vcs.org/Download>`_.  The rest of the instructions will assume you're using Ubuntu, other platforms should be similar.  Of course, if you'd like to add instructions for other platforms to this document, just follow these editing process described herein.

Then, to fetch the source::

    bzr branch lp:schooltool-book

This will create a directory called **schooltool-book**, which contains a **source** directory with all the marked up text files and images which make up the book, and a Makefile and associated files which automate the process of turning the sources into a publishable document.

Building an HTML Version
------------------------

The set of scripts which turn the sources into a finished product is called `Sphinx <http://sphinx.pocoo.org/>`_.

You'll need some basic software development tools, if you don't have them already::

  sudo apt-get install build-essential python-dev python-virtualenv

Within the **schooltool-book** directory, do::

  make html

This will first make a sandbox containing the Python packages needed for the process, create a **build/html** directory, and put finished web pages in it. 

If you open **build/html/index.html** from your browser, you'll be able to read the book in web form.  You can publish this directory to the web like any other set of HTML pages.

Building a PDF Version
----------------------

The PDF output from this process is usable.  Because there are a lot of large screengrab images in the book, and we can't (or don't know how to) control the page breaks, the layout isn't that great.  Hopefully we'll be able to improve that in the future.

Also, as of May 2009 there was a unicode bug that bombed out near the end of the book, but most of the content made it into the PDF. We have not confirmed that this PDF rendering bug is fixed, so your mileage may vary. If you manage to make a beautiful PDF by following the instructions below, feel free to let us know how you accomplished it!

Grab the TeX libraries::

  sudo apt-get install texlive-full

First, from the **schooltool-book** directory do::

  make latex

Then::

  cd build/latex
  make all-pdf

This should create a schooltool-book.pdf file in the **build/latex** directory.

For a more complete explanation of the above, see `Sphinx PDF Generation with LaTeX <http://jimmyg.org/blog/2009/sphinx-pdf-generation-with-latex.html>`_.
