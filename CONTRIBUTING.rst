************
Contributing
************

So you'd like to contribute to ``vscode-dylan``...great!  This file will give
you some tips on how to do it.

**TODO:** So far not much here other than a list of references.

TextMate Grammar (code highlighting)
====================================

Before working on the TextMate grammar it's important to understand the limitations of
the TextMate strategy for code highlighting.  From what I (cgay) have discovered so far,
it works as follows...

1. Each language config (e.g., dylan.tmLanguage.json) has a tree of rules (or patterns).

2. For each **line** in a Dylan source file the top-level patterns are applied in order
   and the first one to match is selected.

3. A rule may have subrules.  Once a rule has matched a line its subrules are applied
   **to the same line again** and then to each line between the "begin" and "end" patterns.
   Once a rule has matched, that source text is effectively "consumed" and will not be
   matched against any other rule.

4. When a rule is matched VS Code assigns a scope, like "meta.function", based on the
   "name" attribute of the rule, to the span of text between its "begin" and "end"
   matches.  As subrules are matched these scopes create a stack and styles can be
   assigned based on any rule in the stack with the must specific scope (the one assigned
   by the innermost rule) taking precedence.

   *You can use the "Developer: Inspect Editor Tokens and Scopes" command to view this
   stack for any source code token, which is extremely helpful for debugging the grammar.*

Okay, so limitations...

The algorithm described above might seem quite elegant but in the end it is just using
regular expressions to match **isolated lines** of text.  This means that when writing an
"end" pattern we are in trouble.  First consider an easy case:

.. code:: dylan

   define function foo ()
     body
   end;

Here we can match "^define " and "^end;" to trivially delimit the entire function.  Now
consider ``define constant``:

.. code:: dylan

   define constant $foo = 1;

   define constant $bar
     = begin
         let x = f();
         something(x);
       end;

How do we find the end of the constant definition?  To do it correctly we need to find
the end of an arbitrary Dylan expression which is not possible with a regex looking at
one line at a time, so we're left with trying to use heuristics.  In this particular case
maybe the best we can do is look for the first semicolon, which is obviously wrong for
``$bar`` above.

Next you might consider looking for the subsequent ``^define``, but this doesn't work
either because it *consumes* the following ``define`` token, which means the following
definition will not be matched to our rules.

TextMate Notes
--------------

* Because JSON doesn't (generally) allow comments, when you need to comment an element in
  the grammar add another element by the same name with an underscore appended.  e.g., to
  comment on the ``"end"`` regex add an ``"end_"`` element.

* In general don't use ``(?:`` to avoid capturing a group.  It just makes the regex
  longer and makes the groups harder to count because you can't just count open parens.

* Backreferences may be used in the "end" regular expression to match groups in the
  "begin" regular expression.  This is useful, for example, for matching Dylan "end
  words", but also potentially whenever a begin word contains alternatives (``|``).

  .. code:: json

     "begin": "^(define) (function|method) {NAME}"
     "end": "^(end)\\s+(\\2\\s+\\3)?"

References
==========

* VS Code docs on `how to write an extension
  <https://code.visualstudio.com/api/get-started/extension-anatomy>`_.

* `Naming conventions <https://macromates.com/manual/en/language_grammars#naming-conventions>`_
  for the "name" elements used in the :file:`dylan.tmLanguage.json` file.

Contributors
============

In rough order by time of initial contribution:

* Bruce Mitchener, Jr.
* Peter Hull
* Carl Gay
