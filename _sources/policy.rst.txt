.. _policy:

Security policy
===============

Security in SchoolTool is primarily based on the relationships between users and other constructs -- for example, a teacher can view and edit only the gradebooks of sections he is instructor of -- as well as using permissions based on group membership in some places -- for example, a member of the School Administrators group can view but not edit all section gradebooks.

SchoolTool security policy is based on the `Zope Security Framework <https://pypi.python.org/pypi/zope.security/>`_.  SchoolTool has a custom security policy based around ``schooltool.app.security.Principal`` and ``schooltool.securitypolicy.crowds.Crowd`` objects.  A ``Principal`` is just a component that represents a user and a ``Crowd`` is a set of ``Principal`` objects that can react to the object being accessed. For example, you can have an “owner” ``Crowd`` which only includes the accessing ``Principal`` if he is looking at an object that “belongs” to them.

SchoolTool custom permissions are defined in the ``schooltool/common/security.zcml`` file, with the two most used permissions being ``schooltool.view`` and ``schooltool.edit``.

``Crowd`` objects are coded as adapters that adapt a context object (the object being accessed) to the ``schooltool.securitypolicy.interfaces.ICrowd`` interface. This interface defines only a ``contains`` method that receives the ``Principal`` object::

 from schooltool.securitypolicy.crowds import Crowd
 class OwnersCrowd(Crowd):
     def contains(self, principal):
         owner = self.context.owner
         return owner == principal

Custom crowds can be registered using the ``crowd`` directive from SchoolTool’s ``security`` namespace:

.. code-block:: xml

 <?xml version="1.0"?>
 <configure xmlns="http://schooltool.org/securitypolicy">
   <crowd
       name="owner"
       factory=".crowds.OwnerCrowd" />
 </configure>

As you can see, the ``Crowd`` is assigned an identifier (“owner”) which can later be used in security declarations for objects.

You use the ``Crowd`` with through an ``allow`` directive also from the ``security`` namespace. You specify a list of ``Crowd`` ids (``crowds`` attribute) that have a permission (``permission`` attribute) on a type of object (``interface`` attribute):

.. code-block:: xml

  <allow
      crowds="owner managers clerks"
      permission="schooltool.edit"
      interface="schooltool.app.interfaces.ISchoolToolApplication"
  />

If any of the ``Crowd`` objects includes the ``Principal`` that is trying to access the “interface-type” object permission is granted, otherwise it is denied. You can have several ``<allow>`` directives for the same interface and permission. In that case the lists of ``Crowd`` objects will be summed.

In some cases it makes sense to provide a permission to a ``Crowd`` no matter what the context interface is.  In that case you can just leave the ``interface`` attribute out, like this:

.. code-block:: xml

  <allow
      crowds="owner managers clerks"
      permission="schooltool.edit"
  />

Inheriting permissions
----------------------

Sometimes it’s not feasible to specify crowds for each and every object. In that case Zope’s traversal mechanism is implicitly used, for example to determine permissions on views, which typically have the context objects set as their ``__parent__`` attribute.

Basically, if no ``<allow>`` declaration (with an explicit interface) is found for an object, the object's parent is taken (from the attribute `__parent__`). If the parent does not have a matching ``<allow>`` declaration either, its parent is taken, etc., until a matching declaration is found.

Permission lookup order
-----------------------

Here is a brief summary of how a permission is checked:

1. All crowds for a permission (specified as ``<allow>`` directives without an explicit interface) are checked.  If any one contains the principal, permit access.

2. While an ``<allow>`` directive with an explicit interface is not found for the context object, take the context's parent.

3. If the principal is in any of the crowds specified in the matching ``<allow>`` directive, permit access.

4. If neither of the previous steps permit access, deny.

This is implemented in the ``schooltool.securitypolicy.policy.SchoolToolSecurityPolicy`` class.


