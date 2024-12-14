Overview of Development Tools
=============================

On the whole, SchoolTool development is kind of low tech.  Coding has always been done in standard text editors (vi, emacs).  We have used Selenium or ChromeDriver for automated testing of the interface, and Python unit tests and doctests for code-level testing.

`Buildout <http://www.buildout.org/en/latest/>`_ and the Python Package Index (pip) are essential parts of the development process, but mostly hidden behind ``make`` files.  

Essentially all project management is based on `Launchpad <http://launchpad.net>`_.  Each part has proven to be good enough, and the overall integration has made it a clear win.  The killer app for us is Launchpad's Personal Package Archives (PPA).  We also use Launchpad to manage translation and take translation contributions online.

Ubuntu (Debian, really) package management has been a cornerstone of the project, because it allows reliable installation and updates in remote schools, on or offline.  We put a TON of work into getting all the dependencies packaged properly for 14.04, and it is now a rock solid platform. 

PPA Organization
----------------

The "core" PPA's are under `~schooltool-owners <https://launchpad.net/~schooltool-owners/>`_.  We put each point release in its own repository so that schools don't accidentally get a major upgrade mid-year.  Users have to explicitly switch PPA's to receive point upgrades.

