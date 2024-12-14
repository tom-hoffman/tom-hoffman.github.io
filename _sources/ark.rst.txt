Ark project specific functionality
==================================

The organization of the custom functionality used by the schools networks associated with Ark is somewhat influenced by the sequence in which it was developed.  Peas was the first customer, with no specific plans to add additional networks.  When Rising and then ISLI were added, we knew we would need to maintain some shared packages used by all the Ark clients, as well as specific customizations for each network.  We then backported Peas to use the shared packages, but it is still has more site-specific code than the other two.

Shared functionality across all projects
----------------------------------------

The ``schooltool.ark`` package has the functionality that the three ARK projects share. The main development branch in Launchpad is `lp:schooltool.ark <https://code.launchpad.net/~sielibre/schooltool.ark/trunk>`_.

Assessment
++++++++++

The assessment functionality is based on the ``AssessmentSetContainer`` object that you can get from a ``SchoolYear`` object:

.. code-block:: python

 >>> from schooltool.ark.interfaces import IAssesmentSetContainer
 >>> assessment_set_container = IAssessmentSetContainer(schoolyear)

This is a container for ``AssessmentSet`` objects:

.. code-block:: python

 >>> from schooltool.ark.assessment import AssessmentSet
 >>> term_1_set = AssessmentSet()
 >>> term_1_set.title = u’Term 1 Assessment’
 >>> assessment_set_container[‘term-1-assessment’] = term_1_set

``AssessmentSet`` objects are ordered containers for ``AssessmentSheet`` objects::

 >>> from schooltool.ark.assessment import AssessmentSheet
 >>> sheet = AssessmentSheet()
 >>> sheet.title = u’Quizzes’
 >>> sheet.points = 40
 >>> term_1_set[‘quizzes’] = sheet

The points value of sheets is used in weighted average calculations.

Assessment sets are related to ``Course`` objects through the ``CourseAssessmentSets`` object that you can get from a course like this::

 >>> from schooltool.course.interfaces import ICourseContainer
 >>> from schooltool.ark.interfaces import ICourseAssessmentSets
 >>> courses = ICourseContainer(schoolyear)
 >>> math = courses[‘math’]
 >>> course_assessment_sets = ICourseAssessmentSets(math)

Then you can store references to assessment sets by term::

 >>> term = schoolyear[‘term-1’]
 >>> course_assessment_sets.assessment_sets[term.__name__] = term_1_set

Gradebook worksheets will be created for the course’s sections for the relevant term based on the assessment sheets of the assessment set. Teachers can add activities to these worksheet at will.

If a new section is added to a course, it will receive all the sheets for that term.

Behaviour
+++++++++

You can get the ``BehaviourContainer`` for a person like this::

 >>> from schooltool.ark.interfaces import IBehaviourContainer
 >>> tom = persons[‘tom.hoffman’]
 >>> tom_behaviour = IBehaviourContainer(tom)

Then you can add ``Behaviour`` objects to it::

 >>> from datetime import date
 >>> from schooltool.ark.behaviour import Behaviour
 >>> note = Behaviour()
 >>> # Check the schooltool.ark.interfaces.IBehaviour interface
 >>> note.date = date(2016, 9, 1)
 >>> note.category = ‘negative’
 >>> note.actions = [‘point’, ‘parents’]
 >>> note.body = ‘<p>Called parents because of constant absenteeism</p>’
 >>> note.editors.add(persons[‘manager’])
 >>> tom_behaviour[‘note’] = note

Dashboard
+++++++++

The dashboard stores cached calculations for different school year based values that are used in the Dashboard view:

 * Student and teacher enrollment
 * Student enrollment by stream
 * Student and teacher attendance (yearly and by week)
 * Student assessment

You can get a school year’s dashboard cache like this::

 >>> from schooltool.ark.interfaces import IDashboardCache
 >>> cache = IDashboardCache(schoolyear)

Demographics fields
+++++++++++++++++++

All ARK projects define their own custom demographics fields. They’re defined in the ``demographics.py`` modules of each project.

Look and feel
+++++++++++++

All ARK projects override SchoolTool’s default page header to customize the color and log of the navigation area.

Reports
+++++++

Unfortunately, the many and often complex reports created for the Ark networks were added over time in a rather *ad hoc* manner on tight deadlines.  As a result, there is no real API and much less shared code than there ought to be.  This makes the body of reports very sensitive to changes in the codebase and subtle inconsistencies in the way various statistics are calculated.  

This is the most likely source of bugs in the system and should be a priority for cleanup and maintenance.  

PEAS
----

The ``schooltool.peas`` package has the PEAS specific functionality. The main development branch in Launchpad is `lp:schooltool.peas <https://code.launchpad.net/~sielibre/schooltool.peas/trunk>`_.

Assessment
++++++++++

The assessment system in Uganda is painfully complex, and to understand fully how it is supposed to be implemented you will probably need some additional explanation and documentation from Peas and/or Ayesha.

The assessment structure is not based on flexible assessment sets containing assessment sheets, but on a simpler hard-coded structure stored in the ``AssessmentPreferences`` object that you can get for a year::

 >>> from schooltool.peas.assessment import IAssessmentPreferences
 >>> preferences = IAssessmentPreferences(schoolyear)

This object carries attributes that specify which gradebook worksheets should be enabled for any section:

 * ``bot``: Beginning of Term sheet
 * ``mot``: Middle of Term sheet
 * ``eot``: End of Term sheet
 * ``mock``: MOCK - PEAS sheet
 * ``mock_other``: MOCK - Other sheet

Other preferences stored in this object include weights for the term sheets and options for defining in which terms should the MOCK sheets be deployed. See the ``schooltool.peas.assessment.IAssessmentPreferences`` interface.

Also, all the courses get a “Target” sheet on the section of the first term of the school year.

Division scores
+++++++++++++++

A custom discrete score system has been added for calculating division scores based on the ``schooltool.peas.assessment.PEASScoreSystem`` object.

Division scores are calculated by organizing courses in four different areas (Humanities, Science, English and Mathematics), setting the minimum value of 6 as a “credit level” score and applying different sets of rules to get each division.

The ``schooltool.peas.assessment.find_division`` function takes a list of tuples of (course government_id codes, score) and calculates the division score based on different rules.

For example the rule for a “Division 1” score is: **Pass a minimum of eight subjects which must include English (with credit level), a Humanity subject, Mathematics and a Science subject. At least seven of the subjects must be a credit level or better. The aggregate for the best eight done subjects must not exceed 32**

Report card
+++++++++++

PEAS has its own term report card. It’s a PDF report coded in the ``schooltool.peas.browser.assessment.TermReportCardPDFView`` class.

Rising
------

The ``schooltool.rising`` package has the Rising Academies specific functionality. The main development branch in Launchpad is `lp:schooltool.rising <https://code.launchpad.net/~sielibre/schooltool.rising/trunk>`_.

Assessment
++++++++++

All the courses get a “Target” sheet on the section of the first term of the school year.

Report card
+++++++++++

Rising has its own term report card. It’s a PDF report coded in the ``schooltool.rising.browser.assessment.TermReportCardPDFView`` class.

Contact fields
++++++++++++++

Rising provides additional demographics fields for student contacts. See the ``schooltool.rising.contact`` module. This functionality is also integrated in the standard XLS importer/exporter.

ISLI
----

The ``schooltool.isli`` package has the ISLI specific functionality. The main development branch in Launchpad is `lp:schooltool.isli <https://code.launchpad.net/~sielibre/schooltool.isli/trunk>`_.

How to set up a development sandbox
-----------------------------------

First branch the *base* branches::

  mkdir mysandbox
  cd mysandbox
  bzr branch lp:~schooltool-owners/schooltool/ark schooltool
  bzr branch lp:~schooltool-owners/schooltool.gradebook/ark schooltool.gradebook
  bzr branch lp:~schooltool-owners/schooltool.lyceum.journal/ark schooltool.lyceum.journal
  bzr branch lp:schooltool.ark
  bzr branch lp:schooltool.fee

Then branch the *project specific* branches::

  bzr branch lp:schooltool.peas
  bzr branch lp:schooltool.isli
  bzr branch lp:schooltool.rising

Now when you want to work on a project branch::

  cd schooltool.isli

Set the development environment::

  make develop

.. warning::
   Due to incomplete configuration this command could throw an error at first.

Edit the ``buildout.cfg`` file and change the ``develop = .`` line to add the *base* branches::

  develop = . ../schooltool ../schooltool.gradebook ../schooltool.lyceum.journal ../schooltool.ark ../schooltool.fee

Then add the *base* branches to the ``[versions]`` section::

  [versions]
  # Unset versions of packages you want to develop
  schooltool.isli =
  schooltool =
  schooltool.gradebook =
  schooltool.lyceum.journal =
  schooltool.ark =
  schooltool.fee =

After saving the changes to ``buildout.cfg``, run::

  bin/buildout

The project branch is finally set up.
