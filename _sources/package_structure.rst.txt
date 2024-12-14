Typical structure of a SchoolTool python package
================================================

In this section we’ll explain the layout of the packages used in SchoolTool. No matter if it’s a “subpackage” like ``schooltool.course`` or ``schooltool.basicperson`` or a third party package like ``schooltool.ark`` the structure is similar.

__init__
-----------

The top level directory of a SchoolTool python package has an ``__init__.py`` file that converts the directory into a Python package and it’s usually an empty file, but sometimes it may have initialization code or package-level shared attributes like i18n message factories.

interfaces
----------

The ``interfaces`` module defines the external behaviour of the main components in the package and it’s widely used for looking up adapters of that package in the component registry.

For example to import the group container of a year, coded in the ``schooltool.group.group module``,  from a school year view component, coded in the ``schooltool.schoolyear.browser.schoolyear`` module we can do it like this::

  from schooltool.group.interfaces import IGroupContainer
  schoolyear = self.context
  groups = IGroupContainer(schoolyear)

We don’t import the adapter code directly, we just look it up by interface.

configure.zcml
--------------

SchoolTool python packages are “plugged” in the Zope framework machinery through a ``configure.zcml`` file. Sometimes there are more top level ``.zcml`` files included from it.

This file starts by using some XML namespaces according to the directives needed in the configuration. The most common directives are:

 * ``class`` specifies permissions and interfaces implemented by a component
 * ``adapter`` registers components that take other components as their “context” and perform actions based on them
 * ``subscriber`` sets up handler callables that are notified and react when an event in the system happens
 * ``utility`` registers global components that carries actions independent from the context where they’re used

Persistent components implementation
------------------------------------

Top level modules named after the package main component define their implementation. These components are persisted in the database.

For example in the ``schooltool.group`` package there’s a ``group.py`` module with all the related code for handling ``Group`` objects.

Sometimes there may be more a couple of important related components in a single package like the ``schooltool.course`` package having the ``course.py`` module for ``Course`` objects and the ``section.py`` module for ``Section`` objects.

generations subpackage
----------------------

Sometimes changes are required in the data model and attributes are added or changed in existing persistent components. The ``generations`` subpackage contains code for handling those “mutations”. The changes are versioned and handled through an utility.

test subpackage
---------------

This subpackage contains unit tests for the main components. They usually don’t need the whole Zope machinery to run. There are also some ``.txt`` files registered and used as unit tests (called “doctests”).

locales directory
-----------------

It contains a `gettext <https://www.gnu.org/software/gettext/gettext.html>`_ Portable Object Template (``.pot``) file with all the translatable strings extracted from Python, ``.zcml`` and page template files. There may also be Portable Object (``.po``) files with translated strings for different languages.

browser subpackage
------------------

If the package provides HTML or PDF rendering functionality the ``configure.zcml`` file includes a ``browser`` subpackage. This subpackage also has ``__init__.py`` and ``configure.zcml`` files that provide the same functionality described above.

.. warning::
 A ``flourish.zcml`` file in this subpackage specifies the newest view components after a skin reimplementation and it should be authoritative over ``configure.zcml``. However ``configure.zcml`` may still register active components. 

The components defined in this subpackage are referred to as “view” components and they include pages and page parts (usually referred as ``viewlets``).

The ``browser`` subpackage may contain some of these directories:

* ``templates``: contains `Zope Page Template <https://docs.zope.org/zope2/zope2book/ZPT.html>`_ files (with extension ``.pt``) for rendering HTML pages or snippets
* ``resources``: contains JavaScript, CSS or image files used in the layout design of web pages or PDF reports
* ``rml``: if a SchoolTool package provides PDF reports this directory contains the `ReportLab Report Markup Language <http://www.reportlab.com/software/rml-reference>`_ files for producing the PDF exports
* ``tests`` and ``ftests``: contain unit and functional tests for the old view components. These are mostly deprecated now
* ``stests``: contains the newest Selenium functional tests

