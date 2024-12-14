SchoolTool Instance
===================

A SchoolTool instance is set up as a process controlled by `Supervisor <http://supervisord.org>`_.

Supervisor is configured to start four “programs”:

 * SchoolTool
 * ZEO
 * Redis
 * Celery report

Supervisor uses the ``supervisord.conf`` configuration file in the instance directory for setting these programs and their priorities.

Let’s describe what each program sets up.

SchoolTool program
------------------

Starts the `Paste server <http://pythonpaste.org>`_.  This is the main web server for SchoolTool.  Paste can also be proxied through other web servers like Apache and Ngnix. See :ref:`apache` and :ref:`nginx` for more on this. Paste uses the ``paste.ini`` configuration file in the instance directory for setting two WSGI applications mapped to these two URLs:

 * /: the SchoolTool application server that handles all the user interface requests. The ``schooltool.conf`` configuration file in the instance directory is used for defining what Zope packages get included (the main one being schooltool.skin.flourish.instance), the database connection and its caching options, optional locale codes to present the user interface, fonts used in PDF reports and error logging.

 * /schooltool.task_results: the task result server provides a small `Bottle <http://bottlepy.org>`_ application with just one route used for accessing the state of remote tasks and used for updating progress bars and report request dialogs.



ZEO program
-----------

Starts the `ZEO storage server <http://www.zodb.org/en/latest/documentation/guide/zeo.html>`_ which allows connections to the ZODB database from multiple processes (the two WSGI applications explained above). The ``zeo.conf`` configuration file in the instance directory is used for defining the path to the database file and blobs directory and logging.

Redis program
-------------

Starts a `Redis server <http://redis.io>`_ used by Celery as a message broker between the task result server and Celery’s worker processes. The ``redis.conf`` configuration file in the instance directory is used for defining the path to the database file and logging.

Celery report program
---------------------

Starts a `Celery worker daemon <http://www.celeryproject.org/>`_ for handling remote tasks setting the default loader and queue routing options. Celery’s backend and queue configurations are hard coded in the ``schooltool.task.celery.config.work_default`` module.

.. note :: 
  These components, particularly as deployed on Ubuntu 14.04, work well together, despite the apparently large number of moving parts.  We recommend an “if it ain’t broke, don’t fix it” approach here.

