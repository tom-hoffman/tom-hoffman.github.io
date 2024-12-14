.. _cas:

Central Authentication Service (CAS) Support
============================================

`SchoolTool CAS <https://launchpad.net/schooltool.cas>`_ plugin provides support
for single sign-on with other applications on a school intranet.  If you're
already using CAS at your school, this is a no-brainer.  Otherwise, you'll probably
need to do some research on `the CAS website <http://www.jasig.org/cas>`_ first .
Note that using CAS authentication requires the installation and maintenance of
a CAS authentication server.  There are CAS modules for Moodle and other web
applications popular in schools.

Enabling CAS in SchoolTool
++++++++++++++++++++++++++

Install python-schooltool.cas from `SchoolTool PPA <install-pre-natty.html>`_::

    sudo apt-get install python-schooltool.cas

Configure CAS authority (add to configuration)::

    $ sudo vim /etc/schooltool/standard/schooltool.conf

And add to the file, where "my.cas.server" is replaced by the URL of your CAS server::

    %import schooltool.cas
    <cas_authority>
      server https://my.cas.server
    </cas_authority>

Enable plugin::

    $ sudo vim /etc/schooltool/standard/plugins/cas.zcml

Put this line (only) in that file::

    <include package="schooltool.cas" />

Restart SchoolTool::

    $ sudo service schooltool restart

SchoolTool should now redirect logins to your CAS server.
