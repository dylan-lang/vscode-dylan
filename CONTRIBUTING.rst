************
Contributing
************

So you'd like to contribute to ``vscode-dylan``...great!  This file will give
you some tips on how to do it.

Code Highlighting
=================

Before working on the TextMate grammar (:file:`syntaxes/dylan.tmLanguage.template.json`)
it's important to understand the limitations of the TextMate strategy for code
highlighting.  From what I (cgay) have discovered so far, it works as follows...

1. Each language config (e.g., dylan.tmLanguage.json) has a tree of rules (or patterns).

2. For each **line** in a Dylan source file the top-level patterns are applied in order
   and the first one to match is selected.  Obviously this means order is important.
   More specific rules should come first.

3. A rule may have subrules.  Once a rule has matched a line its subrules are applied
   **to the same line again** (starting after the "begin" match, I believe) and then to
   each line between the "begin" and "end" patterns.  Once a rule has matched, that
   source text is effectively "consumed" and will not be matched against any other rule.

4. When a rule is matched VS Code assigns a scope, like "meta.function", based on the
   "name" attribute of the rule or one of the "captures", to the span of text between its
   "begin" and "end" matches.  As subrules are matched these scopes create a stack and
   styles can be assigned based on any rule in the stack with the most specific scope
   (the one assigned by the innermost rule) taking precedence.

   *Use the "Developer: Inspect Editor Tokens and Scopes" command to view this stack for
   any source code token, which is extremely helpful for debugging the grammar.*

Developing Rules
----------------

* Simply update :file:`dylan.tmLanguage.json`, run :file:`gen_tmLanguage.sh`, and hit
  ``Cmd-r`` or ``Ctrl-r`` in the Dylan extension host window to see the changes.

  If VS Code says "No TM Grammar registered for this language" it means you have an error
  in your grammar.  This is usually due to missing or extra commas in my
  experience. (Where can we find an error message for the error?)

* The "Developer: Inspect Editor Tokens and Scopes" command is extremely helpful for
  debugging the grammar!

* Because JSON doesn't (generally) allow comments, when you need to comment an element in
  the grammar add another element by the same name with an underscore appended.  e.g., to
  comment on the ``"end"`` regex add an ``"end_"`` or ``end-comment`` element.

* Remember that Dylan is not case sensitive.  Most regular expressions should start with
  ``(?i:``.  (This is non-capturing.)  It would be great if there were a top-level
  setting for "this is a case-insensitive language" but I didn't see one.

* In general don't add extra ``(?:`` to avoid capturing a group.  It just makes the regex
  longer and makes the groups harder to count because you can't just count open parens.

* Back references may be used in the "end" regular expression to match groups in the
  "begin" regular expression.  This is useful, for example, for matching Dylan "end
  words", but also potentially whenever a begin word contains alternatives (``|``).

  .. code:: json

     "begin": "^(define) (function|method) {NAME}"
     "end": "^(end)\\s+(\\2\\s+\\3)?"

  There is supposedly a way to use back-refs in the "name" of a rule too, but I haven't
  researched it yet.

* When adding/debugging a top-level rule (e.g., for a "definer" macro) it can be useful
  to remove all patterns from the "repository.body" rule to make the highlighting from
  the rule you're working on more obvious.

* Do not put a "patterns" array at the top level of a one-pattern match rule. It doesn’t
  generate any explicit error, but it doesn’t work correctly either.

* Sometimes there is no definitive way to find the end of a code structure.  Take
  ``define variable`` as an example.  It ends after the value expression, which could be
  any valid Dylan expression followed by a semicolon.  Matching ";" could obviously have
  false matches within the value expression.  The solution is to use look-ahead in the
  "end" regular expression, which doesn't consume its match group.  In Dylan it is
  generally safe to assume that all lines within a definition begin with whitespace, so
  it generally works to look for the next line that **does not** start with whitespace.
  See examples in the grammar file using look-ahead: ``(?=...)``

References
==========

* VS Code docs on `how to write an extension
  <https://code.visualstudio.com/api/get-started/extension-anatomy>`_.

* `Naming conventions
  <https://macromates.com/manual/en/language_grammars#naming-conventions>`_ for the
  "name" elements used in the :file:`dylan.tmLanguage.json` file.

* `Writing a TextMate Grammar: Some Lessons Learned
  <https://www.apeth.com/nonblog/stories/textmatebundle.html>`_

* `Oniguruma Regular Expression Syntax
  <https://raw.githubusercontent.com/kkos/oniguruma/5.9.6/doc/RE>`_

Contributors
============

In rough order by time of initial contribution:

* Bruce Mitchener, Jr.
* Peter Hull
* Carl Gay
