Testing
=======

SchoolTool development began with a heavy emphasis on automated testing -- particularly when the earliest versions emphasized XML web services rather than a HTML user interface.  Over the years, the styles of testing used changed, and overall testing discipline declined.  Ark funded development was pushed out the door on tight deadlines without automated tests.

SchoolTool uses a customized test runner based on the `zope.testrunner <https://pypi.python.org/pypi/zope.testrunner>`_ package which adds a recipe for setting up Selenium functional tests.

In a SchoolTool sandbox (see :ref:`dev_sandbox`) the test runner is set up in the ``[test]`` part of the ``buildout.cfg`` file (extended from the ``base.cfg`` file).

After running ``bin/buildout``, a ``bin/test`` script will be created that can be used to run SchoolTool tests.

There are three kind of tests in SchoolTool:

 * Unit tests
 * Pre-Flourish functional tests
 * Flourish functional tests

Most of these tests are written as `doctests <https://docs.python.org/2/library/doctest.html>`_

Unit tests
----------

Most of these are not unit tests in the strict sense of the term since they require some additional components set up first in order to run. They’re just called unit tests because they’re not attached to a functional layer.

These tets can be found in the ``tests`` directory of each package (e.g. schooltool.basicperson.tests, etc) and sometimes they refer to ``.txt`` files outside the ``tests`` directory (e.g. ``schooltool/calendar/README.txt``).

Pre-Flourish functional tests
-----------------------------

These are the functional tests written for the old presentation layer before Flourish (add reference to flourish doc). They are based on the `zope.testbrowser <https://pypi.python.org/pypi/zope.testbrowser>`_ package which simulates simple interactions of a web browser (clicking links, filling out forms, etc).

These tests are configured through a ``zope.testrunner`` ZCML configuration layer placed in the ``ftesting.zcml`` file (e.g. ``schooltool/course/ftesting.zcml``) and they can be found in the ``browser/ftests`` directory of the package (e.g. ``schooltool/course/browser/ftests``).

These tests mostly pass, but given the fact that they’re testing against a user interface layer that is no longer used, interpreting the relevance of failures may be difficult, and bothering to fix the failing ones is probably not worth it.

Flourish functional tests
-------------------------

These are the functional tests written for the Flourish presentation layer and they’re based on `Selenium <http://docs.seleniumhq.org/>`_ which gives them a lot of versatility like testing JavaScript interactions through a real web browser engine, either in foreground mode or “headless” mode and taking screenshots when a test fails.

These tests are also configured through a ``zope.testrunner`` ZCML configuration layer placed in the ``stesting.zcml`` file (e.g. ``schooltool/course/stesting.zcml``) and they can be found in the ``browser/stests`` directory of the package (e.g. ``schooltool/course/browser/stests``).

These tests passed as of SchoolTool 2.8, but have not been updated for the Ark customizations, thus some fail with those changes installed.

Setting up the test runner in a sandbox
---------------------------------------

Let’s set up the test runner so we can run the Selenium tests using Google Chrome. First we need to download `Chromedriver for Chrome <https://sites.google.com/a/chromium.org/chromedriver/>`_. The latest version as of this writing is 2.23. Let’s place it under ``/usr/bin/chromedriver2.23``

If you want to run the tests in “headless” mode (no user interface), you need to install an additional Ubuntu package::

 $ sudo apt-get install xvfb

Next we need to set the test runner in the ``buildout.cfg`` file. That part would look like this::

 [test]
 eggs = schooltool [test]
 selenium.default = linux_chrome
 selenium.linux_chrome.binary = "/usr/bin/chromedriver2.23"

Now we run ``bin/buildout`` and the ``bin/test`` script will be updated.

Running ``bin/test`` will run all the tests in the system with the Selenium tests running in the user interface (Chrome windows will start popping up and closing).

We can add an additional part to our ``buildout`` configuration to run the tests in headless mode using a different script. Add this after the ``[test]`` part::

 [test-headless]
 <= test
 defaults = ['--tests-pattern', '^s?f?tests$', '-v', '--auto-color',
             '--selenium-headless-backend=xvfb',
             '--selenium-screenshots-dir=screenshots',
             '--selenium-overwrite-screenshots',
            ]

 [buildout]
 parts += test-headless

This will create a separate ``bin/test-headless`` script that we can use to run the tests with these defaults. Screenshots for failed tests and downloads will be placed under the ``parts/test-headless/`` directory in the sandbox.

Running ``bin/test --help`` will provide the complete set of available options for the test runner configuration.


