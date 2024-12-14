SchoolTool Data Model
=====================

Searching & catalogs
--------------------

SchoolTool takes the approach of avoiding premature optimization in searching in the ZODB and adding catalogs.  That is, catalogs were added to containers that seemed to need them after actual use in the field, but otherwise you search containers through simple traversal.

Catalogs have the ability to reindex when their definition is changed (like when new indexes are added).  Most of them look for a specific kind of object to index based on their implemented interfaces.  

SchoolTool's custom cataloging functionality is based on the ``zc.catalog`` and ``zope.catalog`` packages.


Usually to get a catalog you adapt the object container:

.. code-block:: python

  contacts = app['contacts']
  contacts_catalog = ICatalog(contacts)

  persons = app['persons']
  persons_catalog = ICatalog(persons)


Then you can use its indexes to search specific properties in the indexed objects. Here we'll search people with first name 'Tom'. The ``apply`` method returns a set of ``IntId`` identifiers that we turn into actual ``Person`` objects to print their title:

.. code-block:: python

  from zope.intid.interfaces import IIntIds
  from schooltool.table.column import unindex

  ids_utility = getUtility(IIntIds)
  index = persons_catalog['first_name']
  for id in index.apply({'first_name': 'Tom'}):
      person = ids_utility.getObject(id)
      print person.title

Or you can search using the catalog directly passing the indexes you want to query. Unlike querying indexes directly with ``apply``, ``searchResults`` returns an iterator of content objects::

  params = {'text': 'Douglas Cerna'}
  for contact in contacts_catalog.searchResults(**params):
      print contact.title

Relationships, temporal and otherwise
-------------------------------------

``RelationshipProperty`` objects properties are used to link objects.  This is easier to just demonstrate in code.

We'll create a temporal relationship between ``Group`` objects and ``Person`` objects.

First you define the roles in the relationship. This relationship will be between a group and a member::

  from schooltool.relationship import URIObject

  URIGroup = URIObject(
      'http://schooltool.org/ns/membership/group',
      'Group',
      'A role of a containing group.')
  URIMember = URIObject(
      'http://schooltool.org/ns/membership/member',
      'Member',
      'A group member role.')

Then we define that this is a temporal relationship.  “Temporal” relationships track the date the relationship becomes active or inactive, and a specific state.  To create non-temporal relationship just use a ``URIObject``.

For example::

  from schooltool.relationship.temporal import TemporalURIObject

  URIMembership = TemporalURIObject(
      'http://schooltool.org/ns/membership',
      'Membership',
      'The membership relationship.')

And then what kind of relationship it is through a schema::

  from schooltool.relationship import RelationshipSchema

  Membership = RelationshipSchema(
      URIMembership,
      member=URIMember,
      group=URIGroup)

Then you set a relationship property on a “content” object, in this case ``Group``, using the schema and roles defined above::

  from schooltool.relationship import RelationshipProperty

  class Group(...):

      members = RelationshipProperty(URIMembership, URIGroup, URIMember)

Then you link a ``Group`` object with a ``Person`` object using the property ``add`` method::

    # students_group is Group object
    students_group = groups['students']
    # tom is Person object
    tom = persons['tom.hoffman']
    students_group.members.add(tom)

Since this is a temporal relationship you can add the link from a starting date::

    from datetime import date
    yesterday = date(2016, 8, 12)
    students_group.members.on(yesterday).add(tom)

You can traverse the relationship property::

    # student is a Person object here
    for student in students_group.members:
        print student.title

By default, iterating a relationship property like this will show only “active” objects.  

You can use states in a query to specify which ``Relationship`` objects you're looking for::

    from schooltool.relationship.temporal import INACTIVE 
    for student in students_group.members.any(INACTIVE):
        print student.title

.. warning::

  Not querying the correct student states is a common a source of bugs.

.. warning::

  The interaction between level activation/enrolment and inactivation/unenrolment dates and the end of a ``Term`` or ``SchoolYear`` can be tricky, especially for reports.

There is no direct relationship between the dates used in relationships, such as levels, and the beginning and ends of ``Term`` and ``SchoolYear`` objects.  By default, the web forms for changing relationships use the current date, but it is editable in the form.  

For example, let's say the last day of classes is in June 1, but the official end of the ``SchoolYear`` in SchoolTool is at the end of July.  If graduating students are set as inactive from the ``Students`` group as of June 1, but a report is run on active students as of the end of the year on July 31, users might still expect to see the graduated (on June 1) students show up in their end of year report.

There is not necessarily a “correct” way to handle these issues from the application's point of view, but some kind of logic/policy has to be consistently applied at the user level.

Top level containers
--------------------

In SchoolTool's ZODB, we use a number of top-level containers (BTrees) which behave similarly to Python dictionaries.  Objects in these containers are often connected by relationship properties.  Understanding what's in these containers and how they work is the first step in grokking SchoolTool's data model.

The SchoolTool Application
++++++++++++++++++++++++++

The ``SchoolToolApplication`` object is the root and stores all the top level containers in the system. It's also acts like the root site manager for component look ups.

You usually get a reference to it by just using the ISchoolToolApplication interface adapter::

  from schooltool.app.interfaces import ISchoolToolApplication
  app = ISchoolToolApplication(None)

In the following where we refer to ``app`` assume it has been assigned this way.

Relationship States
+++++++++++++++++++

The codes used in temporal relationships reference relationship state objects.  These objects have a ``title``, an ``active`` attribute and may have a ``code``.  The title allows you to define specific variations on the basic states for each use case (enrolment states, group membership states, attendance states, etc.).

For example to create relationship state objects for the group membership relationship::

  from schooltool.app.interfaces import IRelationshipStateContainer
  from schooltool.relationship.temporal import INACTIVE

  relationship_states = IRelationshipStateContainer(app)
  group_membership_states = relationship_states['group-membership']

  # built using: title, active, code
  pending_state = RelationshipState('Pending', INACTIVE, 'p')
  removed_state = RelationshipState('Removed', INACTIVE, 'r')

  group_membership_states[pending_state.code] = pending_state
  group_membership_states[removed_state.code] = removed_state

You can then use these states in a relationship::

  students_group = groups['students']
  tom = persons['tom.hoffman']
  students_group.members.relate(
      tom,
      removed_state.active,
      removed_state.code)

Or to query specific states by code, like getting removed students only::

  for person in students_group.members.coded(removed_state.code):
      print person.title

Persons
+++++++

The ``Persons`` container holds Person objects.  These are essentially all the people with logins in the system.  There are not separate objects for students and teachers *per se*.  

To get the container::

  persons = app['persons']

The ``Person`` functionality is split between two Python packages, ``schooltool.person`` and ``schooltool.basicperson``, with ``.person`` being the older of the two.  

``Person`` objects are cataloged.

The __name__ (the key for objects in a container) is generated from the username attribute.  This is also the login for the user.  Passwords are stored as unsalted SHA-1 hashes.

``Person`` objects have several temporal relationship properties:

 * groups: ``Group``/``Section`` objects
 * advisors: ``Person`` objects
 * advisees: ``Person`` objects
 * levels: ``Level`` objects
 * contacts (through adapter): ``Contact`` objects  

``Person`` objects also have some common attributes:

 * prefix    
 * middle_name    
 * suffix
 * preferred_name
 * gender
 * birth_date

Demographics
++++++++++++

The objects that add custom information fields to ``Person`` objects system wide are called ``Demographic Fields`` and for tracking that data for each ``Person`` we use ``Demographics`` objects.  See :ref:`demographics`.

You can create demographics fields like this::

  from schooltool.basicperson.interfaces import IDemographicsFields
  fields = IDemographicsFields(app)
  # field id and title for text fields
  field['diet'] = TextFieldDescription('diet', 'Dietary requirements')

Demographics fields can be limited to members of some of the built-in groups -- Students, Teachers and School Administrators, so that, for example, teachers and administrators see a “Date hired” field while students do not.  This is actually just enforced on the view level, so if you remove someone from one of the groups, the relevant data is still there, just not displayed.

We have fields for: text lines, integer numbers, text paragraphs, dates, boolean values and selection lists.

It's worth mentioning that the demographics fields container is an ordered container so they can be reordered and traversed in order -- that is, you can set the order in which they are displayed in forms.

This is how you store actual ``Person`` data for a custom demographics field::

  from schooltool.basicperson.interfaces import IDemographics
  tom = persons['tom.hoffman']
  tom_demographics_data = IDemographics(tom)
  tom_demographics_data['diet'] = 'Lactose intolerance'

Contacts
++++++++

As SchoolTool is designed primarily for K-12 schools, most formal contact information is focused on parents and other people related to the student.  Parents, etc., are created as contacts which store phone, address and email information.  Contacts are established as temporal relationships.  

The initial implementation where contacts could not log in.  We later added the capability for contacts to have their own login. For this a new ``Person`` object is added to the system based on the ``Contact`` object information and the ``Contact`` object is deleted.  If the contact person logs in, they will have access to read-only views of the related student's data.

Resources
+++++++++

``Resource`` objects represent certain objects in a school.  There are three types: ``Location``, ``Equipment`` and ``Resource``.  You may assign a ``leader`` to a resource as a temporal relationship.  The ``leader`` has elevated permissions to edit the object.  For example, the music teacher, as the ``leader`` of his equipment, might edit the condition of musical instruments. 

.. warning::

  Resources have been underutilized and underdeveloped in SchoolTool, particularly after a large calendar refactoring several years ago.  The original idea was that resources could be scheduled and reserved and generally interact with the calendar and other objects like sections in useful ways.  The Ark clients aren't using them, and you shouldn't count on them to do what you expect without testing (and perhaps fixing…).

“Resource Demographics”
+++++++++++++++++++++++

You can add custom fields to resources with an implementation of the same design as used for people.  For example, you could track serial numbers on equipment or specific facilities within a location.  Again, this hasn't been used much and should be tested before trying to do anything important or complicated with it.  

Terms
+++++

``Term`` objects are mainly used for defining the days school is in session (see :ref:`terms`). They are created with a title, start date and end date::

  from datetime import date
  from schooltool.term.term import Term
  start = date(2016, 1, 1)
  end = date(2016, 6, 30)
  term_1 = Term('Term 1', start, end)

Terms may not overlap in date span.

Years
+++++

See :ref:`years` for the definition of a year within SchoolTool.

``SchoolYear`` objects are stored in a single container that you can get like this::

  from schooltool.schoolyear.interfaces import ISchoolYearContainer
  schoolyears = ISchoolYearContainer(app)

You can get the “active” school year (see :ref:`multi-years`) like this::

  active_year = schoolyears.getActiveSchoolYear()

``SchoolYear`` objects are also containers for ``Term`` objects::

  from schooltool.term.term import Term
  active_year['term-1'] = term_1

It's worth noting that ``SchoolYear`` objects are not ordered containers.

.. warning::

 Not properly selecting the year -- assuming the active year -- is sometimes the source of report bugs.

Courses
+++++++

For an explanation of the general role of courses in SchoolTool, see :ref:`courses`.

``Course`` objects are stored in containers that you can get from the ``SchoolYear`` object::

  from schooltool.course.interfaces import ICourseContainer
  schoolyear = schoolyears['2016']
  courses = ICourseContainer(schoolyear)
  for course in course.values():
      print course.title

The course container is also an ordered container.

``Course`` objects have non-temporal relationships to ``Section`` objects::

  course = courses['math']
  for section in course.sections:
      print section.title

They can also be linked to ``Level`` objects, so you could indicate the grade level associate with the course, however this relationship is not actually used for anything within the application at this point.  It could be used to filter or order courses in a report.

Courses can have “leaders” who have elevated permissions to edit the course.  This could be, for example, a teacher department head for the relevant course.

Sections
++++++++

For an explanation of the general role of sections in SchoolTool, see :ref:`sections`.

``Section`` objects are mainly accessed from their related course::

  course = courses['math']
  for section in course.sections:
      print section.title

A back reference relationship is also available to get the courses of the section::

  for course in section.courses:
      print course.title

In the data model, courses have a many to many relationship to sections, however, on the user interface level, it was later restricted to a one to many relationship for simplicity.  That is, even though “courses” is a relationship (which is an iterable property) the system's user interface only allows the user to set one course per section.

.. warning::

 It is important to understand that multi-term sections are modeled internally as linked single-term ``Section`` objects.  

That is, in a four term year, a section for a course that happens to run all year is stored as four ``Section`` objects.  We tend to try to make these linked sections behave as one to the user in the interface.

``Section`` objects in a multi-term section are linked with other ``Section`` objects, like a linked list. The “previous” and “next” attributes are used for this.  In most cases, changes to a section, such as enrolment changes, are propagated to *later* linked sections.  

Sections are stored in ``SectionContainer`` objects. There's a ``SectionContainer`` object for every ``Term`` object in the system. You can get a ``Term`` reference for a section::

  from schooltool.term.interfaces import ITerm
  term = ITerm(section)

``Section`` objects have two temporal relationships: ``instructors`` and ``members`` (students of the section). Both with ``Person`` objects. We have custom subscriber handlers that make propagate instructor and member changes to subsequent sections.

.. warning::

 It is extremely important to understand that the ``Section`` ``instructors`` and ``members`` relationships are fundamental to SchoolTool's  and privacy.  See also :ref:`roles` :ref:`policy`.

Teachers and students are granted few additional privileges based simply on membership in the ``Teachers`` and ``Students`` groups.  Teachers gain most of their functionality and access privileges based on their role as ``instructors`` within a ``Section``.  For example, they can view personal information only about ``Person`` objects who are assigned as ``members`` of a ``Section`` they are ``instructor`` of. 

Membership in either ``Students`` or ``Teachers`` groups is irrelevant to being assigned as an ``instructor`` or ``member`` of a ``Section``, except perhaps in terms of the search defaults used in the user interface.

``Section`` objects also have a non-temporal relationship ``resources`` with ``Resource`` objects.

Groups
++++++

``Group`` objects have two different jobs in SchoolTool.  They can be used to organize students for whatever purposes is needed in the school to help with internal organization, report generation, shared calendars, making search filtering more efficient, etc.  In this sense, they are little more than a bag of ``Person`` objects.

There are also “built in” groups which have important implications for access and other application behavior.  These groups are:

 * Clerks
 * Site Managers
 * Students
 * Teachers
 * School Administrators

These implications of memberships in these groups is described in detail at :ref:`roles`.  Note again that membership in ``Students`` and ``Teachers`` has little affect on access permissions.  Primarily these cue the user interface in various ways so users see what is most relevant to them.  

Groups are stored in ``GroupContainer`` objects. There's a ``GroupContainer`` object for each ``SchoolYear`` object that is created when the ``SchoolYear`` object is added to the system and that is automatically populated with the five “built in” groups.

The “built in” groups cannot be removed from the system.

You can get the group container for a school year::

  from schooltool.group.interfaces import IGroupContainer
  schoolyear = schoolyears['2016']
  groups = IGroupContainer(schoolyear)

``Group`` objects have a temporal relationship ``members``, with ``Person`` objects.

Groups can also have ``leaders`` who have elevated permissions to edit the group.  For example, the coach of the chess team can be given permission to add and remove people from the group.

Streams
+++++++

You can get the stream container for a school year::

  from schooltool.stream.interfaces import IStreamContainer
  schoolyear = schoolyears['2016']
  groups = IStreamContainer(schoolyear)

``Stream`` objects have a temporal relationships ``members``, with ``Person`` objects and a non-temporal relationship ``sections``, with ``Section`` objects.

Levels
++++++

``Level`` objects are used to track the linear progress of a student through the school -- generally a ``Level`` corresponds to a year of schooling, which has different names in different countries.  See :ref:`levels`

.. warning::

 Internally this tends to be very confusing because levels are not simply an attribute on a student.  

 The student has temporal relationships with each ``Level`` indicating beginning and completing the ``Level``.  These are not mutually exclusive, so you could continue adding a student to new levels without removing him or her from the previous one -- which is probably not the expected behavior for a school.  Ensuring that a student is only associated with one ``Level`` at a time is enforced at the view level.

To get the container for ``Level`` objects::

  from schooltool.level.interfaces import ILevelContainer
  levels = ILevelContainer(app)

This container is an ordered container.

``Level`` objects are relatively simple with just a title attribute::

  from schooltool.level.level import Level
  levels['1'] = Level('1st grade')
  levels['2'] = Level('2nd grade')

Enrolling a student into a level is done from the ``Person`` object using the ``levels`` temporal relationship. Let's enroll a person in 1st grade starting on January 1st, 2015::

  first_grade = levels['1']
  tom = persons['tom.hoffman']
  tom.levels.on(date(2015, 1, 1)).add(first_grade)

Promoting a student can be represented by first graduating them from their current level. We may also want to mark them as inactive in that level (the 'r' code used here corresponds to the default state code)::

  from schooltool.app.states import GRADUATE
  tom.levels.on(date(2015, 12, 31)).relate(
      first_grade,
      INACTIVE + GRADUATED,
      'r')

Then we can enroll the student in second grade::

  second_grade = levels['2']
  tom.levels.on(date(2016, 1, 1)).add(second_grade)

Remote Tasks and Messages
+++++++++++++++++++++++++

``RemoteTask`` objects represent a background job performed by Celery. In fact they reference a custom Celery ``Task`` object.

They're stored in a ``TaskContainer`` container::

  from schooltool.task.interfaces import ITaskContainer
  tasks = ITaskContainer(app)

Some of the important attributes of a ``RemoteTask`` object are:

 * creator_username: a key from the ``Person`` container mostly used to set ``Message`` objects in the user interface for a user.

 * routing_key: to identify the Celery queue the task belongs to (see http://docs.celeryproject.org/en/latest/userguide/routing.html#exchanges-queues-and-routing-keys)

 * celery_task: a custom Celery ``Task`` that tracks the ``RemoteTask`` that is attached to, provides access to the ``SchoolToolApplication`` object and manages the transaction when the task is executed

Some of the important methods of a ``RemoteTask`` object are:

 * schedule: this method is responsable for:

    * Setting the creator for the task based on an HTTP request provided by a view.
    * Creating a custom transaction manager and adding it to the current transaction machinery (see http://zodb.readthedocs.io/en/latest/transactions.html#transaction-managers).
    * Adding the ``RemoteTask`` object to the task container.
    * Notifying subscribers that the task has been scheduled.

 * complete: notifies subscribers that the celery task has been successfully executed (the transaction was committed). These subscribers, for example, create success ``Message`` objects that are displayed in the user's profile. The method finally deletes the ``RemoteTask`` object from the task container.

 * fail: notifies subscribers that the celery task has failed (the transaction was aborted).

.. note::
  Most importers and reports in the system are coded as remote tasks.

``Message`` objects are mostly created from notification handlers and may reference the task (for example a failed message showing the task identifier in a ticket that can be tracked in the celery_report.log file)

.. note :: 

  Messages could be used much more extensively in SchoolTool for all kinds of notification, with a little more refinement, including making them deletable (they are not currently).

``Message`` objects are cataloged.

Email
+++++

Schooltool can act as an email client to send emails through a mail server, as described in :ref:`server-settings`.

You can get the container for ``Email`` objects like this::

  from schooltool.email.interfaces import IEmailContainer
  emails = IEmailContainer(app)

``Email`` objects store message information like subject, body, sender and recipeint email addresses and status data.

The logic for sending and queuing (in case of errors) ``Email`` objects is handled through the ``EmailUtility`` utility which acts as an SMTP client.




