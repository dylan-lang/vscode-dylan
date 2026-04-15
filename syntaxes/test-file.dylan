Module: test-file
Synopsis: Nonsensical Dylan source on which to test code highlighting
Author: J Random Hacker
Other: My dog has fleas

/* It's not practical to try and make this exhaustive but it should have one or two
   examples of all the top level definers at least. */

define library foo
  use bar;
  use baz, import: { quux };
  use quux,
    import: { zoot };

  export                        // comment
    foo,                        // comment
    foo-impl;                   // comment
end library foo;                // comment

define module foo               // comment
  use bar;                      // comment
  use baz, prefix: "baz/";      // comment
  use quux,
    import: { my, dog, has, fleas };
  use zoot,
    prefix: "z/",
    rename: { a => b, c => d };
  create
    one,
    two,
    three;
  export
    four, five,                 // comment
    six;                        // comment
end module foo;                 // comment

// The rules for define {constant,variable} are the same.
// If that changes, this should be duplicated more for define variable.
define constant $foo :: <int>    = 100_000;        // comment
define constant $bar :: <string> = "string";       // comment
define constant $pi              = #x13A * 1.0d-2; // comment
define variable *var*           // comment
  = begin                       // comment
      let x = f();              // comment
      x + y                     // comment
    end;                        // comment

/* At the end of the day is the beginning of the day. */
/* I am /* nested */ on one line. */
/* I am
   /* nested */
   on multiple lines. */

// define {function,method} are the same...
define method on-one-line (a :: <a>, b :: <b>, #rest r, #key k) => (r :: <r>) list(a, b, r, k) end method on-one-line; // comment

define sealed inline method foo           // a
    (a :: <a>, b :: <b>, #rest r, #key k) // b
 => (r :: <r>)                            // c
  list(a, b, r, k)                        // d
end method foo;                           // both foos should highlight as variables

define method foo                         // a
    (a :: <a>, b :: <b>, #rest r, #key k) // b
 => (r :: <r>)                            // c
  list(a, b, /* \o/ */ r, k)              // d
end function foo;    // "function foo" shouldn't highlight because doesn't match "method foo"

define class <c> (<d>) end class <c>;     // comment

define open abstract class <c> (<d>, <e>) // c should be variable, d and e inherited-class
  slot foo;                                    // a
  constant sealed slot foo = #b1010_0000;      // b
  slot %bar,                                   // c
    init-value: method (x)                     // d
                  local method m (y) => (z)    // e
                          x * y                // f
                        end;                   // g
                  m                            // h
                end;                           // i
end class <c>;                                 // j

// In macros all macro variables (?v:expression, ?:name) should be highlighted as
// variable.other.dylan and the names of auxiliary rules should be highlighted.
define macro enum-definer
    { define enum ?enum-name:name () ?clauses:* end }
 => { ?@defconst{ 1 ; ?clauses }
      define constant "$" ## ?enum-name ## "-names" = vector(?@pretty-names{ ?clauses });
      define constant "$" ## ?enum-name ## "-values" = vector(?@constant-names{ ?clauses });
      define constant ?enum-name ## "-to-name"
        = curry(enum-value-to-name, "$" ## ?enum-name ## "-names", "$" ## ?enum-name ## "-values");
      define constant "name-to-" ## ?enum-name
        = curry(enum-name-to-value, "$" ## ?enum-name ## "-names", "$" ## ?enum-name ## "-values");
      ignorable("$" ## ?enum-name ## "-values",
                "$" ## ?enum-name ## "-names", // comment
                ?enum-name ## "-to-name",
                "name-to-" ## ?enum-name);
    }

 defconst:                         // comment
    { ?default:expression } => { } // comment

    // Rewrite foo; => foo = default ("foo");
    { ?default:expression ; ?:name ; ?more:* }
 => { ?@defconst{ ?default ; ?name = ?default ?"name" ; ?more } }

    // Rewrite foo = 1; => foo = 1 ("foo");
    { ?default:expression ; ?:name = ?value:expression ; ?more:* }
 => { ?@defconst{ ?value + 1 ; ?name = ?value ?"name" ; ?more } }

    // Rewrite foo ("Foo"); => foo = default ("Foo");
    { ?default:expression ; ?:name ?pretty-name:expression ; ?more:* }
 => { ?@defconst{ ?default ; ?name = ?default ?pretty-name ; ?more } }

    // Fully specified case
    { ?default:expression ; ?:name = ?value:expression ?pretty-name:expression ; ?more:* }
 => { define constant ?name :: <int> = ?value;
      ?@defconst{ ?value + 1 ; ?more } }

 constant-names:
    { } => {}
    { ?:name ?junk:* ; ...} => { ?name , ... }

 pretty-names:
    { ?:name = ?:expression ?pretty-name:expression ; ... } => { ?pretty-name , ... }
    { ?:name ?pretty-name:expression ; ... }                => { ?pretty-name , ... }
    { ?:name = ?:expression ; ... }                         => { ?"name" , ... }
    { ?:name ; ... }                                        => { ?"name" , ... }
    {} => {}
end macro;

define enum my-enum ()          // comment
  $foo;                         // comment
  $bar = 300;
end enum my-enum;               // comment

define sealed domain make (singleton(<abc>));

