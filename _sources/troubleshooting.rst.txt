Troubleshooting
===============

As of SchoolTool 2.6, the SchoolTool server depends on four running processes to
work properly.  If SchoolTool is not responding, the first thing to do is issue 
the command::

    $ sudo service schooltool status

If everything is working properly and running, the output should look like 
something like this (pid and uptime values will vary)::

    schooltool                       RUNNING    pid 1411, uptime 16:35:10
    services:celery_report           RUNNING    pid 1409, uptime 16:35:10
    services:redis                   RUNNING    pid 1405, uptime 16:35:10
    services:zeo                     RUNNING    pid 1407, uptime 16:35:10

If one or more of these is not RUNNING, you should try::

    $ sudo service schooltool stop
    $ sudo service schooltool start

and after giving the server time to start -- at least a minute just to be sure, 
or until the CPU usage goes down -- try again to::

    $ sudo service schooltool status

It is useful to know if the server is starting at all or one of the processes is starting and intermittently quitting.

If your server is memory constrained (under a gigabyte of RAM) and has little or no swap space, the operating system may unpredictably kill one of the SchoolTool processes to save memory.

The logs are stored in ``/var/log/schooltool`` with ``/var/log/schooltool/error.log`` most likely to be relevant if you are having a problem.  

If these steps do not provide enough clues to solve the problem yourself, *please* `file a bug on Launchpad <https://bugs.launchpad.net/schooltool-project/+filebug>`_.  Include the output from ``sudo service schooltool status`` and a copy of the ``error.log`` which you can obtain as so::

$ cp /var/log/schooltool/error.log ~/Documents/

And attach to the bug report.

