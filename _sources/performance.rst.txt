Performance
===========

If there are many people using SchoolTool at once, you may want to increase the
number of threads to serve more users at a time.

Edit paste.ini::

  $ sudo vim /etc/schooltool/standard/paste.ini

And set threads value::

    [server:main]
    use = egg:zope.server
    host = 127.0.0.1
    port = 7080
    threads = 12

Default number of threads is 4.

There are alternative WSGI servers to use in place of zope.server. For
development we use the Paste http server. It has different options. The
important setting is ``threadpool_workers``, default number is 10.::

  [server:main]
  use = egg:Paste#http
  host = 127.0.0.1
  port = 7080
  threadpool_workers = 12

See `Paste Thread Pool <http://pythonpaste.org/paste-httpserver-threadpool.html#paste-thread-pool>`_
documentation for more.

NOTE: there was a ``thread-pool-size`` setting in ``schooltool.conf``, but it
does nothing. You have to add one of the options as documented above.
