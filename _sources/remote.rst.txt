.. _remote:

Accessing SchoolTool from Other Computers
=========================================

A newly installed SchoolTool server is not accessible over the network by
default.

To allow access to SchoolTool from other computers
--------------------------------------------------

Edit ``/etc/schooltool/standard/paste.ini`` as root.  For example::

    $ sudo vim /etc/schooltool/standard/paste.ini

Change the ``host`` to ``0.0.0.0``::

    host = 0.0.0.0

And restart SchoolTool::

    $ sudo service schooltool restart

Look up the server's IP or hostname, and try to connect to it from another
computer.  Don't forget to include the port number (e.g., http://192.168.1.1:7080).

You will most likely want to make SchoolTool available on port 80, but this port
is reserved for the web server. You will have to configure a virtual host or
a path in the web server's configuration. See :ref:`apache`.

To close SchoolTool's port
--------------------------

If SchoolTool is not intended to be used by others, or is configured to run via
an Apache proxy, you can close the port schooltool server listens to.

Edit the ``paste.ini`` file as described above, setting it to read::

  host = 127.0.0.1

