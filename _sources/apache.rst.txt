.. highlight:: apache
.. _apache:

Apache configuration
====================

Virtual hosting
---------------

SchoolTool provides support for virtual hosting with Apache's mod_proxy_.

The standard SchoolTool instance runs on port 7080, but most web traffic runs 
over port 80 -- the standard HTTP port. It's generally desirable for schools
to configure a standard web server to listen for requests on port 80 and 
forward these requests to SchoolTool on port 7080. In this scenario, the web 
server listening on port 80 is known as a *proxy server*.

This approach has several benefits. By using a well-known web server such as 
`Apache HTTP Server <http://httpd.apache.org>`_ , we can protect the SchoolTool server from 
direct exposure to web traffic, thereby improving security and reliability -- 
and by accepting incoming browser requests on the widely-used port 80, we 
can avoid the necessity of explaining to students, teachers, and staff that 
they need to tack ``:7080`` on the end of SchoolTool URLs.

To configure Apache as a proxy server listening to port 80 on ``school1.example.org``
and passing traffic to SchoolTool on port 7080, you will need root access to 
the Apache server.

Begin by creating a new file in your Apache configuration directory,
``/etc/apache/sites-available/school1.example.org.conf``, containing
the following::

  <VirtualHost *:80>
    ServerName school1.example.org

    <Proxy *>
        order allow,deny
        allow from all
        deny from none
    </Proxy>

    ProxyPreserveHost on
    RewriteEngine On

    RewriteRule ^/schooltool.task_results(/?.*) http://127.0.0.1:7080/schooltool.task_results/$1 [P,L]
    RewriteRule ^(/?.*) http://127.0.0.1:7080/++vh++http:school1.example.org:80/++$1 [P,L]

  </VirtualHost>

You will need to enable Apache modules ``mod_proxy``, ``mod_proxy_http`` and ``mod_rewrite``::

  $ sudo a2enmod proxy
  $ sudo a2enmod proxy_http
  $ sudo a2enmod rewrite

Then enable the site and restart apache::

  $ sudo a2ensite school1.example.org
  $ sudo service apache reload

You can make SchoolTool available in a custom path,
e.g. ``school1.example.org/schooltool``::

    RewriteRule ^/schooltool/schooltool.task_results(/?.*) http://127.0.0.1:7080/schooltool.task_results/$1 [P,L]
    RewriteRule ^/schooltool(/?.*) http://127.0.0.1:7080/++vh++http:school1.example.org:80/schooltool/++$1 [P,L]

For more information, see `Virtual Hosting`_ in Zope 3.

.. _mod_proxy: http://httpd.apache.org/docs/current/mod/mod_proxy.html
.. _Virtual Hosting: http://wiki.zope.org/zope3/virtualhosting.html


HTTPS
-----

It is recommmended to use HTTPS/SSL to best protect your users. The
configuration is similar -- just use port 443 instead of port 80, and 
https instead of http::

  <VirtualHost *:443>
    ServerName school1.example.org

    SSLEngine On
    SSLCertificateFile /etc/ssl/certs/ssl-cert-snakeoil.pem
    SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key

    <Proxy *>
            order allow,deny
            allow from all
            deny from none
    </Proxy>

    ProxyPreserveHost on
    RewriteEngine On

    RewriteRule ^/schooltool.task_results(/?.*) http://127.0.0.1:7080/schooltool.task_results/$1 [P,L]
    RewriteRule ^(/?.*) http://127.0.0.1:7080/++vh++https:school1.example.org:443/++$1 [P,L]

  </VirtualHost>

For SSL to work, you will need a SSL certificate. Read Ubuntu documentation on
OpenSSL_ about creating a self-signed certificate, or purchase an official one 
from a reputable Certificate Signing Authority.

.. _OpenSSL: https://help.ubuntu.com/community/OpenSSL#SSL_Certificates

The ``mod_ssl`` module has to be enabled.::

  $ sudo a2enmod ssl

When you get this working, you may want to redirect users that connect through
regular HTTP to the secure site.  Add a ``Redirect``::

  <VirtualHost *:80>
    ServerName school1.example.org
    Redirect / https://school1.example.org/
  </VirtualHost>


Example
-------

Download `example configuration file <_static/school1.example.org.conf>`_ with all of the
above and more.
