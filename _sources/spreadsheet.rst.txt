.. _spreadsheet:

Importing and Exporting from Spreadsheet
========================================

To import or export data from a spreadsheet, you must be logged in as a member of **Clerks** or **Site Managers**. Select the **School** tab, and click on the **Import XLS** link in the sidebar:

   .. image:: images/spreadsheet-0.png

The "What is this?" sidebar contains links to three spreadsheets, of which one is empty, and two are populated with sample data.  The empty spreadsheet is documented by a complete set of tooltips -- hover the mouse pointer over a row or column header for further explanation of its function.

Note that importing ``large_sample_data.xls`` creates a database file of approximately 230 megabytes, and a temporary file the same size, so you'll need a free half gigabyte of disk space if you want to generate everything at once.  This is also much more memory intensive than routine use of SchoolTool.  A server with less than 512 MB of RAM will go heavily into virtual memory -- and, if there is little or no swap partition, this may cause the memory-starved server to start killing processes to free memory. 

While data is being imported from the spreadsheet you'll see a little notifier on the page:

   .. image:: images/spreadsheet-1.png

After a successful import, you will be sent back to the main **School** page:

   .. image:: images/spreadsheet-2.png

``large_sample_data.xls`` creates a full school of 1000 students and two years of section enrollments.  ``sample_data.xls`` has 466 students but only six teachers and a handful of sections (budget cuts).  Users are either "student" or "teacher" followed by a three digit number (for example, "**student000**" or "**teacher001**"), and their passwords are the same as their ID's.

To export data to a spreadsheet, navigate to the **School** tab, select **Reports: School Export** in the sidebar menu, and click on the **Download** button to confirm the dialog:

   .. image:: images/spreadsheet-3.png

Your browser will download an Excel format file (readable by LibreOffice and most other current spreadsheet applications) named export.xls.
