.. _groups:

Groups
======

In SchoolTool, Groups are used to model some default roles in a school, as well as allowing a wide variety of custom groups to be created to suit local needs.

In particular:

  * Groups have their own calendars;
  * you can run reports for the members of a Group;
  * Groups are useful for adding a specific set of students to multiple class sections.

The default :ref:`roles` are **Site Managers**, **Clerks** and **School Administrators** with certain site-wide privileges.  **Teachers** and **Students** are also default groups that affect the user's interface and visibility in various forms and searches, but not important permissions.

Groups are stored by Year.  That is, each school year has its own set of Groups.  For example, you may have one "Students" Group for Year "2008-2009" and a separate "Students" group for Year "2009-2010."

**Note that you must create Years before you can do anything with Groups.**  See :ref:`years`.

Groups can be managed through the web, imported via CSV or by :ref:`spreadsheet`.

Adding People to Existing Groups
--------------------------------

In :ref:`persons`, we imported some People via CSV who have not been assigned to Groups.  We're going to add all of them to the "Students" Group.

In order to add People to a Group, you must be logged in as a member of **Site Managers** or **Clerks**. Navigate to the **School** tab, and click on the **Groups** link:

   .. image:: images/groups-0.png

From here, select **Students**:

   .. image:: images/groups-1.png

First we will "manually" add our small group of students.  Click on the yellow pencil icon next to **Members**:

   .. image:: images/groups-2.png

We'll check the boxes next to our students.  We will leave **Set selected to**
**Enrolled** for now to indicate they are enrolled as students as of the date
selected under **Effective date** (the current date by default):

   .. image:: images/groups-3.png
   
Click **Add**:

   .. image:: images/groups-4.png

Then click **Done** to get back to the main page for the Group.

If you click on one of the students' names and then their **Groups** slider, you'll see their memberships listed:

   .. image:: images/groups-6.png

Editing Group Membership
------------------------

Withdrawing or otherwise changing existing group memberships is done as above,
but by selecting students from the list of Current Members and seting them to 
a different state, such as **Withdrawn** or **Graduated/Inactive**.

Customizing Membership Relationships
------------------------------------

On the **School** page, under **Customize**, you can select **Membership 
States** to customize the states of different types of relationships.

   .. image:: images/2.8-changes-5.png

For example, click **Student Enrollment**.

   .. image:: images/2.8-changes-6.png

In each type of relationship, there are a few pre-set "meanings" that 
may affect underlying functionality important to SchoolTool.  For example,
the basic statuses of student enrollment are defined as:

    * Active (an enrolled student)
    * Inactive (not an enrolled student)
    * Pre-enrolled (essentially an unenrolled applicant or future student)
    * Graduated/Inactive (completed the program and unenrolled)
    * Graduated/Active (completed the program but still enrolled as a stuent)

In addition to these "meanings," you can create additional statuses with their 
own Title and Code.  For example, in this form you could add an inactive 
"Transferred" status.

   .. image:: images/2.8-changes-7.png


Creating a New Group
--------------------

From the main **Groups** view, click **Add: Group**.  Add a relevant title and description:

   .. image:: images/groups-7.png

Add members as above:

   .. image:: images/groups-8.png

You can also assign "Responsible Parties," who will have permission to modify the Group, add members, and edit the calendar.

