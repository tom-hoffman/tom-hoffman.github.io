.. _install-2_0:

Installing SchoolTool
=====================

SchoolTool in Ubuntu Universe Repositories
------------------------------------------

In Ubuntu 12.04 LTS through 14.04 LTS, the "Universe" package repository 
contains the version of SchoolTool current at the time of the operating 
system's release.  

SchoolTool in Launchpad.net Personal Package Archives
-----------------------------------------------------

Current versions of SchoolTool are available in the "SchoolTool Owners" team's
Personal Package Archives PPA at `Launchpad.net 
<http://launchpad.net/~schooltool-owners>`_.  SchoolTool 2.8 and later 
releases are organized by numbered PPA.

Thus, to install or upgrade to SchoolTool 2.8, add the 2.8 PPA to your 
server's sources list.

Using the command line::

    $ sudo add-apt-repository ppa:schooltool-owners/2.8

If you get an "add-apt-repository not found" error, install it::

    $ sudo apt-get install software-properties-common

Installation
------------

To install SchoolTool (from Ubuntu Universe or the Launchpad.net PPA) 
simply search for "SchoolTool" in the Ubuntu Software Center and click 
**Install** next to the SchoolTool entry.

Or enter at the command line::

 $ sudo apt-get update
 $ sudo apt-get install schooltool

After installation, the schooltool server can be accessed from the server at 
http://localhost:7080.  See :ref:`remote`.

.. _ppa:

Upgrading SchoolTool
--------------------

To upgrade SchoolTool to a new "point" (2.6, 2.8, etc.), switch to a repository containing a newer version as described above, and enter::

 $ sudo apt-get update
 $ sudo apt-get dist-upgrade
 
To upgrade to a minor release (2.8.1, 2.8.2, etc), you do not need 
to change the repository.  Simply enter:

 $ sudo apt-get update
 $ sudo apt-get dist-upgrade


