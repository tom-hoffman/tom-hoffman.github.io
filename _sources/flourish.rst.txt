.. _flourish:

SchoolTool "presentation" components
====================================

`The Zope publishing mechanism <https://pypi.python.org/pypi/zope.publisher>`_ provides a way of filtering (enabling or disabling) view components based on a marker interface called “layer."

SchoolTool’s look and feel functionality for HTML pages and PDF reports comes from a layer called “Flourish" which is placed in the ``schooltool.skin.flourish`` package.  “Flourish" was the codename, essentially, for a complete redesign of SchoolTool’s web interface roughly midway through its history.

HTML rendering
--------------

The ``schooltool.skin.flourish.page.Page`` class is the base component for Flourish. It provides a two step pattern, common to most of SchoolTool’s view components, for producing HTML code through two methods:

 1. The ``update`` method is supposed to “calculate" the data needed. It also invokes its subcomponents ``update`` methods.
 2. Then the ``render`` method produces and returns the HTML code based on the data calculated in ``update``. This step usually involves calling a `Zope Page Template <https://docs.zope.org/zope2/zope2book/ZPT.html>`_ (ZPT) file able to handle conditionals and iterations. The default logic for this method is based on the ``schooltool/skin/flourish/templates/main.pt`` template.

Main template
+++++++++++++

This template has the base HTML 4 document structure for pages and it’s logically divided as header, content and footer areas. It provides plug points for pages to insert content dynamically.

Let’s review some of these:

 * The ``schooltool.skin.flourish`` `resource library <https://pypi.python.org/pypi/zc.resourcelibrary>`_ is inserted in the header (<head> element) of the page and it’s in charge of including CSS and Javascript files taking care of dependencies between “sublibraries".
 * A few `providers <https://pypi.python.org/pypi/zope.contentprovider>`_ are used in this template. Providers are just view components that filter and prepare their subcomponents for rendering. This way a full page can be built by merging several small and focused components. The providers in this template render the navigational area at the top of the page.
 * A second template is referenced as the ``page_template`` attribute of the ``Page`` which is used for rendering the “main content area" of the page.

Page template
+++++++++++++

This template renders HTML code specific to the object that is being viewed. It’s logically structured with two sidebars and a content area. This content area in turn is divided into main and additional areas.

This is roughly the HTML code rendered by this template:

.. code-block:: xml

 <div class="body">
   <div class="sidebar refine">
   </div>
   <div class="sidebar related">
   </div>
   <div class="container">
     <div class="main">
     </div>
     <div class="additional">
     </div>
   </div>
  </div>

The two sidebars and the additional area are handled by providers. The main area is handled by the ``content_template`` attribute of the ``Page`` object and can be set either through ZCML:

.. code-block:: xml

  <!-- from schooltool/course/browser/flourish.zcml -->
  <flourish:page
      name="section_linkage.html"
      for="schooltool.course.interfaces.ISection"
      class=".section.FlourishSectionLinkageView"
      content_template="templates/f_section_linkage.pt"
      permission="schooltool.edit"
      subtitle="Terms"
      />

or in Python code::

 from zope.browserpage.viewpagetemplatefile import ViewPageTemplateFile
 class FlourishCourseView(DisplayForm):

    content_template = ViewPageTemplateFile('templates/f_course_view.pt')

.. note::
 A ``Page`` subclass can override any of these templates, composing its own rendering logic.

PDF rendering
-------------

SchoolTool uses XML markup called `ReportLab Markup Language (RML) <http://www.reportlab.com/documentation/>`_ to layout PDF reports, with ZPT again inserting the dynamic content.

The ``schooltool.skin.flourish.report.PDFPage`` class is the base component for SchoolTool’s PDF functionality. It’s similar to the ``Page`` class explained above providing the same two step pattern and a ``template`` attribute that references the ``schooltool/skin/flourish/rml/pdf.pt`` file. This template contains RML and provides the basic document structure expected by the `z3c.rml <https://pypi.python.org/pypi/z3c.rml>` package that transforms the RML into PDF. Read `RML for Idiots <https://www.reportlab.com/docs/rml-for-idiots.pdf>`_ for more on this.

There are providers for rendering each part of the RML structure:

 * ``init``: for the <docinit> element
 * ``stylesheet``: for the <stylesheet> element
 * ``template``: for the <template> element
 * ``page_info``: for the <pageInfo> element
 * ``story``: for filling the <story> element

A ``content_template`` attribute is also provided by ``PDFPage``. If it’s implemented the output of the <story> element is composed like this:

.. code-block:: xml

     <story>
        <!-- content_template attribute is rendered here -->
        <!-- story provider is rendered here -->
      </story>

The definitions for these providers and the templates they reference can be found in the ``schooltool/skin/flourish/report.zcml`` file.

Forms
-----

`z3c.form <https://pypi.python.org/pypi/z3c.form>`_ is the form library used in Flourish. The ``schooltool.skin.flourish.form`` module provides base classes for add, display and dialog forms. Dialogs use the `jQuery UI <https://jqueryui.com/dialog/>`_ library.  

AJAX parts
----------

The ``schooltool.skin.flourish.ajax`` module registers an additional provider for ``Page`` objects. It’s referenced as “ajax" in ZPT code. It’s used for registering special viewlets, called AJAX parts, that have the ability to render and update without fully reloading their ``Page``. This functionality is mostly used for tables. See the ``schooltool.table.ajax`` module.

Tables
------

The ``schooltool.table.ajax.Table`` class allows to display, filter and sort objects in a container or any kind of iterable. It’s a viewlet manager and three named viewlets can be registered on it (displayed in the order they are rendered):

 * ``filter``: a ``schooltool.table.ajax.TableFilter`` object with a ``filter`` method. It’s usually rendered as a search form
 * ``batch``: a ``schooltool.table.ajax.TableBatch`` object that knows what subset of the filtered items to display based on the request values. It’s rendered as a list of page number links
 * ``table``: by default this is just a standard viewlet that reuses the ``Table.renderTable`` method but that can be overriden to provide more specialized behaviour

The logic for adding columns, sorting and listing elements of the ``Table`` class is based on the `zc.table <https://pypi.python.org/pypi/zc.table>`_ package.


