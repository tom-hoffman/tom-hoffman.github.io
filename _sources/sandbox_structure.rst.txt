Sandbox structure
=================

A development sandbox is a `zc.buildout <http://www.buildout.org>`_ project and through `virtualenv <https://virtualenv.pypa.io>`_ provides an isolated development environment.

Buildout allows us to get packages from specific sources like development branches and pin down their versions, set up and run the Selenium test runner and create a unified directory structure of symlinks to the installed packages for easy navigation. 

Once the project has been fully bootstrapped a SchoolTool instance is created under the ``instance`` directory and a ``bin`` directory is generated with several scripts. A python interpreter can be started with the command ``bin/python`` inside the sandbox directory. This interpreter will have all of SchoolTool’s python package dependencies available.

The sandbox also has a ``Makefile`` with several rules like:

 * make start/stop/restart: manage all Supervisor’s programs in “background” mode
 * make run: starts all Supervisor’s programs in “foreground” mode
 * make ubuntu-environment: installs all the required Ubuntu package dependencies
 * make realclean: for deleting all the “bootstrapped” files including the ``instance`` directory

Another development tool that is not enabled by default is the ``debugdb`` script which provides access to the ZODB database from the python interpreter. It can be enabled by adding::

  [scripts]
  scripts += debugdb

to the ``buildout.cfg`` file and then running ``bin/buildout``. A ``bin/debugdb`` script will be generated. In order to use it we must first start the Supervisor’s programs::

  $ make start
  $ bin/debugdb

This will start a python interpreter with some objects available:

 * app: The SchoolToolApplication object
 * connection: a connection to the ZODB database
 * database: the ZODB database

This allows for instance to check how many ``Person`` objects we have in the system::

 >>> len(app[‘persons’])
 340

Components like adapters and utilities are also available::

 >>> from schooltool.schoolyear.interfaces import ISchoolYearContainer
 >>> schoolyears = ISchoolYearContainer(app)
 >>> year = schoolyears.getActiveSchoolYear()
 >>> print ‘%s goes from %s to %s’ % (year.title, year.first, year.last)
 2016-2017, from 2016-04-01 to 2017-03-31

It’s also possible to alter and persist changes to objects in the database by committing the transaction::

 >>> year.title = u’2016/17’
 >>> import transaction
 >>> transaction.commit()



