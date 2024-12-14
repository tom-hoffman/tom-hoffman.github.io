.. _server-settings:

Server Settings
===============

Server Information
------------------

When logged in as a **Site Manager**, you should see a "Server" tab in the top bar.  This takes you to a variety of settings and information relevant to the server itself, as opposed to your school.

   .. image:: images/server-settings-0.png

In the main content area, the Server Information section provides some technical details you may need for debugging, the **Server Information** link takes you to a more verbose version of this data.

.. _email:

Outgoing Email
--------------

SchoolTool can send emails through your school email server or another SMTP server.  That is, SchoolTool is not an email server; it sends mail as an email *client*, like a desktop application such as Evolution or Outlook.

To enable SchoolTool to send emails, you will need the instructions from your school's server, your ISP, or your webmail provider to configure a mail client to send mail via the provider's SMTP service.

You can also install and use a free mail server using the Ubuntu package manager, such as ``postfix`` or ``sendmail``.  Instructions for doing so are outside the scope of this document.  Running a mail server requires a knowledgeable systems administrator.

As an example of an external email service, here's the relevant data for enabling GMail:

    .. image:: images/email-gmail.png


To send email through an external mail service, you will need to be logged on as "manager." Navigate to the **Server** tab, then click on the **Outgoing Email** link:

   .. image:: images/server-settings-1.png

To edit the settings, click the yellow pencil icon next to **Server status: Disabled** and enter the appropriate data for your server.  Note that the username and password in question in this form are the username and password of a user *on the mail server*, not on SchoolTool.

**Note:** Outgoing emails from SchoolTool will use this email address, not the email address of a specific user within SchoolTool; e.g., in the example below, all notifications coming from SchoolTool will appear to be from schooltool.mgr@gmail.com.

A TLS connection is a type of secure connection between SchoolTool and the mail server.

As the label suggests, the outgoing email service won't do anything until you select the **Enable** -- **Yes** radio button and click **Apply**.  Select **Enable** -- **No** to turn it off.

   .. image:: images/server-settings-2.png

Click **Apply** when you're done.

To see if it is working, click **Send Test Email** under **Actions** in the sidebar and enter some relevant data, including one of your email addresses as recipient so you can make sure the message arrives safely:

   .. image:: images/server-settings-3.png

After you hit **Send**, you'll find yourself on the **Email Queue** page, and hopefully will tell you that the queue is clear (not that your message is stuck):

   .. image:: images/server-settings-4.png

Check your mail, and you should see the message:

    .. image:: images/email-gmail-2.png

Calendar
--------

SchoolTool is designed to be usable in many different countries, and different parts of the world handle calendars and dates differently, so you may have to change some settings here to suit your local needs.  Click on the **Calendar** link to do so.

   .. image:: images/server-settings-5.png

SchoolTool's calendar uses a more or less European configuration by default.  I've changed it above to suit my American tastes.

Hit **Apply** to save your new settings.

LDAP Single Sign On
-------------------

If :ref:`ldap` plugin is installed, it can be configured from here.


Sidebar Settings
----------------

Further server settings and information are available in the sidebar at left.

Security
++++++++

The **Security** link in the sidebar provides a report on the active permissions within the system and limited options to tailor the access rights for your school.

The main view is a textual summary of what users can conduct which actions on what objects in SchoolTool.

   .. image:: images/server-settings-8.png

Clicking the edit pencil next to Access Rights takes you to a form that has a list of specific rights that sites might commonly want to modify.

   .. image:: images/server-settings-9.png

Click **Apply** to save whatever changes you might make; **Cancel** to leave without saving changes.

Note that all the access control settings within the system can be modified from configuration files within SchoolTool's source code.  This is not a trivial matter, but extensive customization for specific sites is possible.

Errors
++++++

The **Errors** entry in the sidebar provides quick access to a limited number of errors logged on the server since it has been restarted.  They are stored in memory.  Full logs are kept in the filesystem, at ``/var/log/schooltool`` in a standard Ubuntu package installation.

   .. image:: images/server-settings-10.png

Clicking on the exception object takes you to a full description of the error, including the traceback and HTTP request:

   .. image:: images/server-settings-11.png

Clicking on the yellow pencil icon allows some customization of this display:

   .. image:: images/server-settings-12.png

Tabs
++++

Schools that are not using all components of SchoolTool can reduce visual clutter by hiding unnecessary links in the top navigation bar.

Note that these settings have no effects other than removing navigational links; they don't change the functionality, data, or security settings of SchoolTool in any way.

Links can be changed from visible to hidden at any time.

When users log in, they will usually be directed to the tab selected in the default column. The default tab must also be visible.

To hide tabs, simply uncheck the corresponding checkbox.  Select the default view in the third table column, click **Submit**

   .. image:: images/server-settings-12_5.png

Name Sorting
++++++++++++

Sets the default name sort behavior throughout the application, sorting by first or last names.  This also changes the order that names appear in most places so that the sort column is the leftmost in the table.

   .. image:: images/server-settings-12_6.png

Sidebar Actions
----------------

Pack Database
+++++++++++++

SchoolTool's database engine supports certain undo capabilities which are not implemented in SchoolTool.  As a result, SchoolTool's database file grows in size over time.  "Packing" the database strips out the old changes and shrinks the file back down to its minimum size without otherwise affecting your SchoolTool data.

Packing the database periodically will help optimize performance, particularly after many changes have been made to the database, for example, from large data imports.  This can be a resource-intensive action on large databases, so it is best to do it during off-peak times.

To pack the database, click **Pack Database** under **Actions** in the sidebar.  You should see a little confirmation spinner while this is in progress:

   .. image:: images/server-settings-13.png

And a dialog when it completes:

   .. image:: images/server-settings-14.png

Note that if you don't stay on the page while the packing is underway, it *will* still complete.  You just will not receive any confirmation.
