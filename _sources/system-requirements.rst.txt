System Requirements
===================

Where can I download SchoolTool?
++++++++++++++++++++++++++++++++

There is no "Download" link to install SchoolTool.  

SchoolTool is a full stack web application.  That is, it comes with its own web 
server and database.  To make sure all the necessary components are installed 
correctly, we distribute SchoolTool to users as packages, through Ubuntu Linux.  
This gives users a simple "app store" one-click installation experience.

What follows is an explanation of this choice, hardware recommendations, and in 
subsequent pages instructions for installing various versions of SchoolTool on 
various versions of Ubuntu.

Operating System
++++++++++++++++

Ubuntu
------

The core SchoolTool development team recommends new installations  of SchoolTool 
on Ubuntu 14.04 LTS (Long Term Service).  

Ubuntu 12.04 LTS will be actively supported at least through the end of 2014, 
but we will be focusing on Ubuntu 14.04 LTS for the foreseeable future, and we 
recommend all users test and upgrade to 14.04 LTS at the earliest convenient 
time (i.e., between terms/school years).  

Going forward, we will not be focusing our efforts on non-LTS Ubuntu releases, 
as we have found most prudent and experienced school sys admins prefer to 
stick to LTS releases.

Why Ubuntu?
-----------

SchoolTool is written in Python, a highly portable open source programming 
language.  SchoolTool can be ported to Mac OS, Windows, or other Linux or Unix 
versions with a moderate amount of work.  We have done this in the past.

We have created packages for multiple operating systems, but the core 
development team could not *support* them.  The Mac OS version ran slowly and 
occasionally hung for no discernible reason.  We could copy/paste some code 
to make SchoolTool run as a Windows service, but we didn't understand how it 
worked or fix it if it didn't.  A student information system is mission 
critical for a school; we don't want schools running systems that nobody is 
responsible for fixing.

We welcome additional ports and packages; the core development team just does 
not have the capacity to provide and support them ourselves.

Hardware
++++++++

Compatibility
-------------

SchoolTool can be installed on any hardware or virtual server that is 
supported by Ubuntu.

School Level Deployments or Greater
-----------------------------------

For production deployment in a school or district, a real or virtual server 
dedicated to only running SchoolTool is recommended.  This makes it easy to 
resolve any puzzling operating system level problems by simply backing up the 
SchoolTool database and data files, and reinstalling the whole system from 
scratch.  This can usually be done in about an hour.

SchoolTool can be hosted in "the cloud" on any server (physical or virtual) 
that provides root access to the server OS or the equivalent.  You will need 
to have rights on the server to install software and add SchoolTool as a 
system service.  A simple "web hosting" service that allows you to add HTML 
and PHP pages is not sufficient.

Personal
--------

For personal use, SchoolTool can be installed and used on a personal desktop 
or laptop computer running Ubuntu Linux, accessing the web interface locally. 
This type of installation is not going to be under heavy load, since there is 
only one user, but it will eat up some memory while running in the background.  

Technical Specifications
------------------------

The primary bottleneck in SchoolTool's performance is usually memory.  The 
bare minimum RAM requirement for testing is estimated to be 512 megabytes.  
At least 1 gigabyte of RAM, plus at least 2 gigabytes of swap space is 
recommended and if you are setting up for a small production server, adding 
more than 1 gigabyte of RAM is worth it if you can afford it.  More memory 
equals faster database performance.

Faster processors will make SchoolTool run faster.  Over 1 GHz is recommended.  
Generally speaking, SchoolTool performance will benefit more from raw 
processor speed than adding cores running in parallel.

Ubuntu SchoolTool packages are available for low-power ARM architecture 
processors, as well as i386 and AMD64 PC and server processors.

By the scale of modern storage technology, SchoolTool doesn't require 
significant disk space.  One gigabyte may handle it for quite a while.  
Disk read and write speed is more important than volume.

Virtual Servers
---------------

Note that another option for non-Ubuntu users is :ref:`sandbox`.
