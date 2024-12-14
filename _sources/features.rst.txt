Overview of Features
====================

The standard installation of SchoolTool includes:

* Customizable student and teacher demographics and other personal data;

* Contact management for teachers, students, and their guardians;

* Teacher gradebooks;

* Skill and outcomes based assessment;

* Schoolwide assessment data collection and report card generation;

* Class attendance and daily participation grades;

* Calendars for the school, groups, individuals, and resource booking;

* Tracking and management of student interventions.

Demographics and Personal Data
------------------------------

* A school can customize the fields of demographic and other data stored for each person.  

* Each field can store textual, date, boolean (yes/no) data, or a selection from a list of defined choices.

* Fields can be assigned specifically to teachers, students, administrators, or all people.

Contact Management
------------------

* Personal contact information includes address, phone, email, and contact language.

* Each student can be associated with one or more adult contacts; multiple students can be associated with a single adult contact.

Teacher Gradebooks
------------------

* Use SchoolTool's gradebook for calculating point or percentage based grades.

* SchoolTool provides a spreadsheet-style gradebook for each class section.

* Each gradebook can be organized as multiple worksheets.

* Assignments and activities can be organized and weighted by categories, such as "Exam" or "Lab," which can be customized for each site.

* Point-based scores can be converted to grades using flexible, customizable "score systems."

* Scores are viewable by students, if they are given permission to log into SchoolTool.

* Scores can be exported to .xls spreadsheet format.

CanDo -- Skill and Outcome Based Assessment
-------------------------------------------

* Create documents specifying student skills, standards, or outcomes via spreadsheet import or through the web interface.

* Associate groups of skills with courses automatically or manually.

* Create projects with unique combinations of skills.

* Assess student skills through a familiar gradebook-style interface.

* Track the history of student skill achievement across multiple sections and school years.

* Teachers and administators can generate graphical reports by student, section, or teacher.

* Skill scores can be integrated into SchoolTool's point based gradebook.

Schoolwide Assessment Data Collection and Report Card Generation
----------------------------------------------------------------

* Grades, comments, and other teacher-generated data can be collected schoolwide and aggregated using the SchoolTool gradebook interface.

* Standard report cards can be generated as PDF documents for individual students, groups, or the whole school.

* Customized report cards can be designed using an HTML-like markup language.

Class Attendance and Daily Participation Journal
------------------------------------------------

* For each meeting of a class section, teachers or clerks can mark and excuse students absent or tardy.

* Schools can create custom codes to describe attendance events.

* Daily attendance can be taken in designated homeroom periods, with day attendance status highlighted in section attendance for that day.

* Teachers can assign participation scores based on defined grading systems.

* The average participation score can be included in Gradebook calculations.

* Absence and tardy data can be included in report cards and other provided school attendance reports.

Calendars for the School, Groups, and Individuals
-------------------------------------------------

* SchoolTool automatically creates a web-based calendar for every person, group, resource, and section. There is also a school-wide calendar that can be displayed on the front page of SchoolTool.

* Person calendars are private. By default, group and class section calendars are visible only to members.

* Like iCal, Google Calendar, and other popular calendaring applications, SchoolTool allows users to “overlay” events from other calendars on their personal calendar. For example, by default, a student sees events from all sections they are enrolled in and the school-wide calendar.

* Calendars are aware of the school timetable; by default new events will start and end at the beginning and end of class periods.

* Users can create single or repeating events. Teachers can edit section events to note tests, assignments, and other class information.

Tracking and Management of Student Interventions
------------------------------------------------

* Use the Intervention system to create goals and track progress collaboratively between students, teachers, parents, and other stakeholders. 

Technical Features
------------------

* **100% free and open source software stack:**

  * Python programming language;
  * Zope 3 component architecture;
  
  * Zope Object Database (ZODB);
  
  * ReportLab PDF generation.

  * Celery task queue for background completion of long-running tasks.

* **Importing and Exporting Data:**  SchoolTool provides a variety of ways to import data into the system, in addition to its web interface.  All the major components of the school, including people, timetables, courses, and section enrollment, can be imported from and exported to .xls spreadsheets.  People, groups, section enrollments, and other objects can also be imported from comma separated value (CSV) files.  For testing and evaluation, a spreadsheet for a school of 1000 students is provided. 

* **Security:** Our custom security model manages permissions based both on role (e.g., teacher, school adminitrator) and relationships (e.g., between a specific teacher and student).  A detailed view of permissions on specific objects in SchoolTool's core model is available through the web interface.  Basic customization of some key aspects of the security policy can be done through the web by the site manager.  Complete customization is possible through XML configuration files.

* **Test-driven development:** SchoolTool includes a comprehensive test suite, including unit and functional tests.  Python "doctests" double as narrative developer documentation.

* **Installation and upgrades:** are managed via the Ubuntu packaging system and Launchpad.net.  Two-step production server deployment on Ubuntu Linux.  One-step bugfix upgrades within SchoolTool release versions.  Major releases synchronized to Ubuntu releases.

* **Internationalization:** SchoolTool is completely translatable.  New translations can be contributed via the Rosetta system on Launchpad.net.

* **Web server:** SchoolTool contains its own server for easy testing and simple deployments.  For sites requiring a encrypted (SSL) connection, we recommend using Apache as a secure proxy.  See :ref:`apache`.

* **Virtual servers:** For schools in a predominantly Windows or other non-Ubuntu environment, we recommend running SchoolTool on a dedicated virtual server, running Ubuntu Server Edition.  Regardless of the host operating system, running SchoolTool on its own virtual server isolated from other services is a good security precaution. 

* **Consistent programming style:** For readability and easier modification, SchoolTool conforms to the official PEP 8 Style Guide for Python Code.

* **LDAP Integration:** Authenticate against an `LDAP <ldap.html>`_ server, including one-step setup with `Zentyal <http://www.zentyal.org/>`_ server.

* **Single sign-on:** SchoolTool supports using `Central Authentication Service (CAS) <cas.html>`_ for single sign-on with other enterprise applications such as Moodle and Drupal.  CAS requires a separate authentication server; we have been using RubyCAS in this role at a test site.  The CAS server can be easily configured to authenticate against your LDAP server or another external database.  If you are interested in using CAS or LDAP authentication, contact the SchoolTool team via Launchpad, email or IRC.
