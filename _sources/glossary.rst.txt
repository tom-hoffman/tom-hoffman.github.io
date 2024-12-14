.. _glossary:


Glossary of SchoolTool
======================

**administrator** - An administrator of the school itself.  This is a school governance role, not a technical role.  For example, the principal or headmaster of a school is an administrator.  Compare with "manager."

**advisor/advisee** - In some US schools, "advisors" are adults, usually teachers, who have a relationship with a student throughout their career at a school.  The "advisee" is the student being advised.  "Mentor" and "protege" expresses a similar, if tighter, relationship.

**class** - We avoid using "class" as an educational term. It has too many overlapping usages. Plus it has a different meaning in computer science. If someone is using "class" in an educational context, they usually mean what SchoolTool calls a "section."

**contact** - A student may have one or more "contacts," people who may need to recieve notifications and information about the student or the school as a whole.  A user may also be a contact for him or herself (particularly in the case of older students and adults).  Contact information includes home address, phone number, email address, etc.   For example, parent, guardian, parole officer; for report cards, announcements, notification of absence via email, etc.  

**course** - A course in SchoolTool describes a set curriculum taught in a section.  For example, Algebra I, American History, 3rd Grade Reading, and Biology I are all courses.  This definition is *different* from the way many learning management systems, such as Moodle, use "course."  A Moodle "course" is closer to a SchoolTool "section."

**demographics** - In SchoolTool, we use the word "demographics" to refer to a set of information that may be stored for each person in the system.  The fields used in demographics can be edited at the school level.  Note that not all data in "demographics" will necessarily fit the dictionary definition of "demographics."

**group** - Groups are sets of persons.  They can be used for organization, facilitating sorting and searching, and reporting.  They also have calendars.

**period** - A period represents a specific configuration of sections and locations in the school. That is, for any given period, you should be able to identify what sections should be meeting in what locations. Periods occur during one or more slots in the school timetable.  

In simple cases, a period simply corresponds to a time; at 9:00, it describes which sections are meeting where.  In more complex cases, periods may occur at different times and are often identified by letters (A period, B period, etc).

**manager** - A person who maintains an instance of SchoolTool.  This is a technical role, not a school governance role.  For example, a systems administrator or webmaster that is responsible for setting up SchoolTool and keeping it running is a manager.  Compare to "administrator."

**resources** - These are locations or objects within a school.  SchoolTool's calendar can function as a reservation and tracking system for resources.

**schedule** - This is used as a verb in the SchoolTool UI, to refer to the process of assigning a student to his or her sections.

**school administrator** - Longer form of "administrator."  Useful for avoiding ambiguity with "site manager" role.

**school timetable** - This is a "bell schedule" in US parlance, defining where the "slots" fall during the school's weekly (or other) cycle, when section meetings start and end each day.  

**school year** - A school year encompasses the annual cycle of a school.  For example, most students are promoted at the end of a year.  Most teachers start work at the beginning of the year.  Terms must be contained within years.  

The school year does not have to correspond to the calendar year or be limited to a single calendar year.  It may be defined in any way that suits the processes of your school.  

It is best to set this up so that each year begins immediately after the previous one.  Every date is part of one school year or another.  School years cannot overlap.

**score system** - A scale used for assessment.  A grading scale or rubric scale.  

**section** - A section is a set of one or more learners who meet during a term. There are lots of other optional attributes and relationships associated with sections. They may have instructors, they may be implementations of courses.  

The standard example of a section would be something like "Mr. Hoffman's 9:00 Algebra II class, spring semester, 1995." Less traditional structures like eLearning and internships are still expressed as sections.  

Sections that span multiple terms are modeled as separate, but linked sections, with each linked section associated with a single term.

**site-manager** - Longer form of "manager."  Useful to avoid ambiguity with the "school administrator" role.

**slot** - Defines a period of time in a school timetable. The time span and day in the cycle.  8:00 - 9:30 Monday mornings is an example of a slot. Or 8:30 - 9:30 on "B" days. Each slot contains one period.  

In a simple schedule, a given period will always occur in the same slots, and the entire concept may seem needlessly complex to you.  In more complicated schedules, periods fall in different slots according to a defined pattern.

**term** - A unit of time that defines the beginning and end of sections on the calendar -- for example, a semester or trimester.  Students generally recieve evaluations for each section at the end of the term.  

If section enrollments or schedules are changed at a certain point in the school year, that transition should be represented by a change in terms.

SchoolTool does not recognize a hierarchy of terms.  If in a particular school some sections last all year, some change by semesters, and some change quarterly, a "term" for this school would be defined as a quarter -- the shortest unit that defines the lifetime of a section.  In this case a year-long section would be modeled as four separate but linked sections.  

Terms cannot overlap and must be contained within school years.  If you don't feel you need terms, you can simply create a term that spans the entire school year.

**time period** - Synonymous with "term."  Deprecated.

**timetable** - A person's or section's timetable is the automatically generated set of scheduled classes for the person or section.  Generated from the timetable schema.

**timetable schema** - Synonymous with "school timetable."  Deprecated.
