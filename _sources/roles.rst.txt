.. _roles:

SchoolTool Administrative Roles
-------------------------------

The "Default Manager" user has sufficient permissions to configure SchoolTool, enter student data, and completely set up and maintain the system.  

Rights and permissions in SchoolTool related to administering the school as a whole are controlled through membership in several :ref:`groups`: **Site Managers**, **Clerks** and **School Administrators**.  These groups, as well as **Teachers** and **Students**, cannot be deleted and always exist within each school year.  

By default the "Default Manager" user is a member of both **Site Managers** and **Clerks**.  

* **Site Managers** - This group is responsible for setting up and technical maintenance of the SchoolTool instance.  It has no pedagogical role, but full permissions regarding server configuration.

* **Clerks** - This group is responsible for day to day school-level data entry, data management and reporting.  **Clerks** are power users in SchoolTool, with most of the same permissions as Site Managers.  The main difference between **Clerks** and **Site Managers** is that **Clerks** have some additional administrative screens, for managing attendance school-wide, for example, and they cannot easily undertake some setup related actions that could cause wide-ranging data loss.

* **School Administrators** - Members of this group can *view* most data in the system, but have limited rights to edit it.  It is a "safe" role to prevent less technical **School Administrators** from accidentally messing up your SchoolTool instance while still viewing the records and reports they need.  **School Administrators** also have a role in certain processes and workflows, for example receiving notifications and messages regarding student interventions.  

A single person can be a member of several of these groups, and permissions are additive (adding a member of **Site Managers** to **School Administrators** does not limit his or her rights to edit data).  There is considerable overlap in permissions between the groups, in particular **Site Managers** and **Clerks**.

Both **Site Managers** and **Clerks** should be trusted users, because either can elevate their own permissions by adding themselves to the other administrative groups.  Note that a malicious clerk would *always* be able to wreak havoc on a student information system by intentionally entering bad data, deleting things, etc.

Super User and Emergency Password Recovery
------------------------------------------

The original "Default Manager" user has some special rights which are independent of his or her group membership, so that SchoolTool administrators cannot completely lock themselves out of the system accidentally.

If you forget the password for "Default Manager", you can reset the "Default Manager" password from the server's terminal.

Where PASS is the desired password::

 $ sudo python -m schooltool.app.main -c /etc/schooltool/standard/schooltool.conf --restore-manager PASS

And log in with the new password.
