Managing Multiple SchoolTools on One Server
===========================================

Creating multiple SchoolTool web servers on a single server (physical or virtual) based on the Ubuntu packages is a somewhat manual operation at this point.  It should take you about 10 minutes to edit the necessary files if you have some experience with that sort of thing.  In the explanation below, bear in mind that you can substitute whatever names you want for "another" and use whatever text editor you prefer if you don't like ``vim``.

SchoolTool instances are defined in /etc/schooltool. Copy the standard one::

 $ sudo cp -r /etc/schooltool/standard /etc/schooltool/another

Edit the configuration files and replace or add prefixes to have
different file names::

 $ sudo vim /etc/schooltool/another/schooltool.conf
 ...
 site-definition /etc/schooltool/another/site.zcml
 ...
 result-server-definition /etc/schooltool/another/result-server.zcml
 report-server-definition /etc/schooltool/another/report-server.zcml
 ...
 <zeoclient>
    server /var/run/schooltool/another-zeo.sock
    blob-dir /var/lib/schooltool/another-blobs
    shared-blob-dir yes
 </zeoclient>
 ...
 error-log-file /var/log/schooltool/another-error.log
 web-access-log-file /var/log/schooltool/another-web-access.log

These are the changes required in zeo.conf::

 $ sudo vim /etc/schooltool/another/zeo.conf
 ...
 address /var/run/schooltool/another-zeo.sock
 ...
 <logfile>
   path /var/log/schooltool/another-zeo.log
 </logfile> 
 ...
 <filestorage>
   path /var/lib/schooltool/another-Data.fs
   blob-dir /var/lib/schooltool/another-blobs
 </filestorage>

You do not need to create any of those files -- they will appear automatically when the server begins logging.

By default, SchoolTool's web server listens for connections on port 7080. To prevent collisions, you must configure the duplicate server to listen on a different port::

 $ sudo vim /etc/schooltool/another/paste.ini
 ...
 port = 7082

Same thing with the redis configuration::

 $ sudo vim /etc/schooltool/another/redis.conf
 ...
 port 7078
 ...

We also have to use the redis port in a couple of changes to the
supervisord.conf file (on the environment=... lines)::

 $ sudo vim /etc/schooltool/another/supervisord.conf
 ...
 [unix_http_server]
 file=/var/run/schooltool/another-supervisord.sock
 ...
 [supervisord]
 logfile=/var/log/schooltool/another-supervisord.log
 ...
 pidfile=/var/run/schooltool/another-supervisord.pid
 ...
 [supervisorctl]
 serverurl=unix:///var/run/schooltool/another-supervisord.sock
 ...
 [program:schooltool]
 ...
 command=/usr/bin/start-schooltool-instance /etc/schooltool/another
 environment=CELERY_CONFIG_MODULE='schooltool.task.config.zope',REDIS_HOST='127.0.0.1',REDIS_PORT='7078'
 ...
 stdout_logfile=/var/log/schooltool/another-paste.log
 ...
 [program:zeo]
 ...
 command=/usr/bin/runzeo -C /etc/schooltool/another/zeo.conf
 ...
 [program:redis]
 ...
 command=redis-server /etc/schooltool/another/redis.conf
 ...
 [program:celery_report]
 ...
 environment=SCHOOLTOOL_CONF='/etc/schooltool/another/schooltool.conf',REDIS_HOST='127.0.0.1',REDIS_PORT='7078'
 ...
 stdout_logfile=/var/log/schooltool/another-celery_report.log
 ...

Copy and edit the init script::

 $ sudo cp /etc/init.d/schooltool /etc/init.d/schooltool-another
 $ sudo vim /etc/init.d/schooltool-another
 ...
 NAME=schooltool-another
 DESC="Another SchoolTool"
 ...
 INSTANCE=another
 ...
 PIDFILE=/var/run/schooltool/another-supervisord.pid
 ...

Now you can start the new server::

 $ sudo service schooltool-another start

Check the logfiles to see if there are any startup errors::

 $ tail -f /var/log/schooltool/another-supervisord.log
 ... INFO success: redis entered RUNNING state, ...
 ... INFO success: zeo entered RUNNING state, ...
 ... INFO success: celery_report entered RUNNING state, ...
 ... INFO success: schooltool entered RUNNING state, ...

The server should have started. Go to http://localhost:7082 to see if
the web interface is up and running.

In order for this server to stop/start automatically on reboot, install
its init.d script to the appropriate runlevels::

 $ sudo update-rc.d schooltool-another defaults
  Adding system startup for /etc/init.d/schooltool-another ...

Congratulations -- you now have two instances of SchoolTool.
