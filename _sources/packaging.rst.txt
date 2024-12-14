Packaging and publishing in Launchpad PPA
=========================================

We are going to demonstrate how to package the ``schooltool`` package and publish it in the `SchoolTool Owners 2.8 PPA <https://launchpad.net/~schooltool-owners/+archive/ubuntu/2.8>`_ in Launchpad.

First we need to configure our packaging environment, so make sure of installing the following packages::

 $ sudo apt-get install bzr bzr-builddeb python-van.pydeb dh-make

Also two environment variables are needed by the Debian package builder when it updates the ``debian/changelog`` file::

 $ export DEBFULLNAME="Douglas Cerna"
 $ export DEBEMAIL="douglascerna@example.org"

If you use Bash you could add these to your ``~/.bashrc`` file (or the equivalent in another shell).

The next step is to configure the bzr client. We’re going to assume bzr 2.7.0 for this. You will need to set up your email and Launchpad username::

 $ bzr whoami “Douglas Cerna <douglascerna@example.org>”
 $ bzr launchpad-login replaceafill

Besides this you’ll need to set up an SSH key and a GnuPG key and import them in Launchpad so you can write to branches and publish changes in PPAs. You can read more about this in ` Importing your SSH key <https://help.launchpad.net/YourAccount/CreatingAnSSHKeyPair>`_ and `Importing your PGP key <https://help.launchpad.net/YourAccount/ImportingYourPGPKey>`_.

With this environment set up, let’s create a directory for all of our work::

 $ mkdir ~/packaging
 $ cd ~/packaging

Now we are going to branch the schooltool package from the `<2.8 series https://launchpad.net/schooltool/2.8>`_::

 $ bzr branch lp:schooltool/2.8 schooltool
 $ cd schooltool

Usually you merge some branch with additional changes::

 $ bzr merge lp:~replaceafill/schooltool/new_school_page
 $ bzr commit -m “Merged new School page branch”

and update the ``versions.txt.in`` file, usually just removing the ``dev`` part. And just for reference we also update the CHANGES.txt file this way::

 2.8.6 (2016-08-12)
 ------------------

 - Added the new School page

We mark these couple of changes with a commit and create a “tag” so we reference them later::

 $ bzr commit -m “Preparing release 2.8.6”
 $ bzr tag 2.8.6

At this point we can push our changes back to Launchpad::

 $ bzr push lp:schooltool/2.8

Next, we need to create a `source distribution file <https://docs.python.org/2.7/distutils/sourcedist.html>`_ that we’re going to merge into our packaging branch. SchoolTool branches have rules for doing this in their ``Makefile``::

 $ make develop
 $ make release

The source distribution file will be placed under ``./dist/schooltool-2.8.6.tar.gz``.

Now, we need to branch our “packaging branch” (a branch with a .debian directory set up)::

 $ cd ..
 $ bzr branch lp:~replaceafill/ubuntu/trusty/schooltool/2.8 2.8_packaging
 $ cd 2.8_packaging

and “merge” the source distribution file::

 $ bzr merge-upstream ../schooltool/dist/schooltool-2.8.6.tar.gz

This will merge all of our changes and because of the way the packaging branch is set up the ``debian/changelog`` file has been updated and we just need to update its first entry by replacing “UNRELEASED” with “trusty” as the target distribution.

After that we need to commit our changes::

 $ bzr ci

This will open a text editor with a default commit message that you can use. Just save the file.

Now we tell bzr to create a source package from our packaging branch::

 $ bzr builddeb -S

This may ask for the passphrase of your GnuPG key and will create a ``../build-area`` directory with a ``.changes`` file necessary for publishing in a PPA with the ``dput`` command::

 $ cd ../build-area
 $ dput ppa:schooltool-owners/2.8 schooltool_2.8.6-0ubuntu1_source.changes

You’ll need writing access to the target PPA.

If everything goes well Launchpad will send you an email notifying that your upload has been accepted.

After that we go back to our packaging branch and push the changes to Launchpad::

 $ cd ../2.8_packaging
 $ bzr push lp:~replaceafill/ubuntu/trusty/schooltool/2.8

We do the same for the 2.8 branch, but first we set a development version for the next release target (e.g. 2.8.7dev) and add something like this to the CHANGES.txt file::

 2.8.7 (unreleased)
 ------------------

 - Nothing changed yet

We commit the changes with a message we can identify in the future and push them to Launchpad::

 $ bzr ci -m “Back to development: 2.8.7”
 $ bzr push lp:schooltool/2.8

Read the `Ubuntu Packaging Guide <http://packaging.ubuntu.com/html/>`_ for learning more about packaging.

Packaging third party branches
------------------------------

The process described above works for all the “core” packages that are included in the Universe repository in Ubuntu:

 * schooltool
 * schooltool.cando
 * schooltool.gradebook
 * schooltool.intervention
 * schooltool.ldap
 * schooltool.lyceum.journal

Third party packages usually have a simpler packaging setup and require a few different steps that we’ll demonstrate by packaging the 2.10 series of the ``schooltool.ark``. For more see the `Merging a new upstream version <http://packaging.ubuntu.com/html/udd-merging.html#merging-a-new-upstream-version>`_ section in the Ubuntu Packaging Guide.

Let’s create a new directory::

 $ mkdir ~/packaging_3rd
 $ cd ~/packaging_3rd

and branch schooltool.ark 2.10::

 $ bzr branch lp:schooltool.ark/2.10 schooltool.ark

The process to merge changes and get the source distribution file is similar to the described above for the ``schooltool`` package.

An additional step is to upload the distribution file somewhere we can reference in the ``debian/watch`` file of the packaging branch. The ``schooltool.ark`` package uses the http://ftp.schooltool.org/schooltool/ark/ directory for this.

We also have a ``Makefile`` rule for doing this::

 $ make upload

After the distribution file is available for download we can move on to the packaging branch::

 $ cd ..
 $ bzr branch lp:~sielibre/schooltool.ark/2.10_packaging
 $ cd 2.10_packaging

A difference here compared to the ``schooltool`` packaging branch is that we don’t “merge-upstream” the distribution file. Instead we merge the 2.10 branch directly::

 $ bzr merge lp:schooltool.ark/2.10

In this case the ``debian/changelog`` file is not automatically updated, so we need to append an entry using the ``dch`` command::

 $ dch -a

Then we edit the first entry appropriately.

From here the rest of the process is the same.


