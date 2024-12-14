.. _dev_sandbox:

Setting up a sandbox
====================

SchoolTool uses Bazaar_ VCS.  Be sure to install it first::

  ~$ sudo apt-get install bzr

.. _Bazaar: http://bazaar-vcs.org/

If you don't already have it, you need make to bootstrap the process::

  ~$ sudo apt-get install make

Quickstart
----------

To get started with a sandbox::

  ~$ bzr co lp:schooltool schooltool
  ~$ cd schooltool

Install `build dependencies`_ like compilers, development libraries and fonts::

  ~$ sudo make ubuntu-environment
  
Next, pull down additional libraries via PIP and get everything in place::

  ~$ make develop

The **schooltool** package just contains the "core" functionality of SchoolTool: gets the server up and running, lets you define the structure of the school and the calendar.

To *use* SchoolTool for anything (beyond calendaring) you need plugins.

Enable plugins (optional).

To enable plugins, edit buildout.cfg to contain, for example::

  [package]
  eggs += schooltool
          schooltool.gradebook
          schooltool.lyceum.journal
          schooltool.intervention

Build and run schooltool::

  ~/schooltool$ make run

Open http://localhost:7080/ in your browser.  To make SchoolTool accessible over the network, edit ``./instance/paste.ini`` as described in :ref:`remote`.

If you want to change enabled plugins, edit buildout.cfg, and run SchoolTool again::

  ~/schooltool$ make run


Setting up a full development sandbox
-------------------------------------

Set your buildout eggs and cache directories
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create ~/.buildout/default.cfg and add::

  [buildout]
  eggs-directory = /home/*your-user*/.buildout/eggs
  download-cache = /home/*your-user*/.buildout/cache
  extends-cache = /home/*your-user*/.buildout/extends

Buildout does not understand the unix ~ notation, so use the full
path.

Create the cache directories::

  ~$ mkdir -p ~/.buildout/eggs
  ~$ mkdir -p ~/.buildout/cache
  ~$ mkdir -p ~/.buildout/extends


Create the shared repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create the bzr shared repository::

  ~$ mkdir schooltool_sandbox
  ~$ bzr init-repo schooltool_sandbox

(http://bazaar-vcs.org/SharedRepositoryTutorial)


Working on a project
--------------------

For a list of projects, see::

  https://launchpad.net/schooltool-project

Get the project you want to work on
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Let's assume you worked on schooltool.gradebook super ajax feature and your launchpad
username is "ideveloper".  Parts you are expected to change depending on who you are or what you
are working on are underlined::

  ~$ cd schooltool_sandbox
  ~/schooltool_sandbox$ bzr branch lp:schooltool.gradebook schooltool.gradebook_super_ajax
                                                                               -----------
  ~/schooltool_sandbox$ cd schooltool.gradebook_super_ajax

It's slow for the first copy of the project.  Shared repository at least speeds up the second branch.

Ensure you have all needed dev tools::

  ~/schooltool_sandbox/schooltool.gradebook_super_ajax$ sudo make ubuntu-environment

Now, build the project::

  ~/schooltool_sandbox/schooltool.gradebook_super_ajax$ make develop

Congratulations, you can run the server now::

  ~/schooltool_sandbox/schooltool.gradebook_super_ajax$ make run


Develop your feature
~~~~~~~~~~~~~~~~~~~~

Push your branch to Launchpad::

  ~/schooltool_sandbox/schooltool.gradebook$ bzr push lp:~ideveloper/schooltool/schooltool.gradebook_super_ajax
                                                          ----------            -------------------------------

Now you can begin your work.  Commit using ``bzr ci``; diff using ``bzr diff``; update your branch using ``bzr pull``.  Commit often and in small chunks.

Don't forget to update the eggs from time to time to the latest released versions::

  ~/schooltool_sandbox/schooltool.gradebook_super_ajax$ make update


Publishing your changes
~~~~~~~~~~~~~~~~~~~~~~~

If you worked on a bugfix, now is a good time to link your branch to the bug in Launchpad::

  https://code.launchpad.net/~ideveloper/schooltool/schooltool.gradebook_super_ajax
                             -----------            -------------------------------

Finally, propose a merge (to development focus branch) in the Launchpad branch's page (same link above).

Once it's reviewed, the feature will be merged to trunk and new development eggs will be released.


General guidelines
------------------

**Create a new branch for every feature**

Having every feature and every bugfix in a separate branch allows
reviewing checkins **easier**, because every branch has only 1 goal. If a
bugfix is not complete or it **did not pass the review** - you can
**continue working** on it in that **same branch** so all the related changes
are in the same place and not 20 unrelated checkins apart.  And most importantly,
they are **not mixed with other features**.  It also makes the **backporting** to
older SchoolTool versions a lot easier for the maintainers.

**Work on a single plugin at a time**

Have a separate checkout directory for each project.  Do not modify buildout.cfg
unless you really need to.  Avoid cross-dependencies between plugins.  Select carefully
to which plugin the feature should logically belong to.  Keep things simple.  Thanks!

**Commit often.  Write tests.**

Commit often and in small chunks.  Write/update unit and functional tests to
pass with each commit.  The more you practice this rule, the fewer bugs you'll
eventually make.

If you're fixing an unobvious bug, it's a good idea to write a test that ensures the
bug won't be reimplemented again.


Developing multiple plugins at the same time
-----------------------------------------------------

WARNING: we recommend avoiding this scenario when possible.

Let's assume you want to work on both SchoolTool core and the Gradebook plugin.

First, check out branches (lp:schooltool and lp:schooltool.gradebook) to your sandbox::

  ~/schooltool_sandbox$ bzr branch lp:schooltool schooltool_dev
  ~/schooltool_sandbox$ bzr branch lp:schooltool.gradebook schooltool.gradebook_dev

Edit ``buildout.cfg`` in the directory you run the server from (say, schooltool.gradebook_dev).

Change develop to include both SchoolTool and Gradebook::

  develop = . ../schooltool_dev

Check if all desired eggs are included::

  [schooltool]
  eggs += schooltool
          schooltool.gradebook
  <...>

Push both directories to separate branches in Launchpad, request merges on both at the
same time.  I believe it's obvious that dealing with multiple branch merging increases
chances of human error.


.. _build dependencies:

Build dependencies
------------------

On Ubuntu you can simply ``sudo make ubuntu-environment``. On other systems,
below is what you need:

Build essentials::

  $ apt-get install build-essential gettext

Contains gcc, make and other tools needed to build software.

Python 2.6 or 2.7 with development headers::

  $ apt-get install python-dev

Development libraries::

  $ apt-get install libicu-dev libxslt1-dev libfreetype6-dev libjpeg-dev enscript

You also need virtualenv and both Ubuntu and Liberation fonts::

  $ apt-get install python-virtualenv ttf-ubuntu-font-family ttf-liberation

See also :ref:`sandbox` if you want to manage several sandboxes using VirtualBox.
