.. _install-dev:

Installing SchoolTool development release
=========================================

Current development release is available from `SchoolTool dev PPA <https://launchpad.net/~schooltool-owners/+archive/dev>`_. Refer to the :ref:`release-notes` to see what's new.

Add SchoolTool dev PPA
----------------------

Open the **Ubuntu Software Center**.  Choose **Edit > Software Sources...**  Click **Other Software > Add...**, enter as the **APT line**::

    ppa:schooltool-owners/dev

And click **Add Source**.

    .. image:: images/usc-precise.png

Then search for "SchoolTool" in the searchbox at upper right in the Software Center and click **Install** next to the SchoolTool entry.

    .. image:: images/usc-schooltool.png

Or, using the command line::

    $ sudo add-apt-repository ppa:schooltool-owners/dev
    $ sudo apt-get update

Then install the ``schooltool`` package::

    $ sudo apt-get install schooltool

After installation, the schooltool server will be started at
http://localhost:7080. See :ref:`remote`.


.. _daily:

Daily builds
============

Packages are built daily from the trunk series of the actively developed
projects. They are available for testing from the `SchoolTool trunk PPA
<https://launchpad.net/~schooltool-owners/+archive/trunk>`_::

    $ sudo add-apt-repository ppa:schooltool-owners/trunk

