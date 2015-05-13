'use strict';
define(["require", "exports"], function (require, exports) {
    exports.snippets = [
      {
        'type': 'snippet',
        'label': '<integer>',
        'documentationLabel': 'Integer type',
        'codeSnippet': '<integer>'
      },
      {
        'label': '<string>',
        'type': 'snippet',
        'documentationLabel': 'String type',
        'codeSnippet': '<string>'
      },
      {
        'type': 'snippet',
        'label': 'block',
        'documentationLabel': '',
        'codeSnippet': [
          'block ({{return}})\n',
          '  {{}}\n',
          'end;\n'
        ].join('')
      },
      {
        'label': 'define class',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define class <{{class}}> (<{{object}}>)\n',
          '  {{}}\n',
          'end class <{{class}}>;\n'
        ].join('')
      },
      {
        'label': 'define constant',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'define constant \${{}} = {{}};\n'
      },
      {
        'label': 'define function',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define function {{function}} ({{}}) => ({{}})\n',
          '  {{}}\n',
          'end function {{function}};\n'
        ].join('')
      },
      {
        'label': 'define generic',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'define generic {{}} ({{}}) => ({{}});\n'
      },
      {
        'label': 'define method',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define method {{method}} ({{}}) => ({{}})\n',
          '  {{}}\n',
          'end method {{method}};\n'
        ].join('')
      },
      {
        'label': 'define objc-class',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define objc-class {{}} ({{}}) => {{}}\n',
          '  {{}}\n',
          'end objc-class;\n'
        ].join('')
      },
      {
        'label': 'define objc-method',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define objc-method {{}} ({{}}) => ({{}})\n',
          '  c-signature: ({{}}) => ({{}})\n',
          '  {{}}\n',
          'end objc-method;\n'
        ].join('')
      },
      {
        'label': 'define suite',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define suite {{}} ()\n',
          '  {{}};\n',
          'end suite;\n'
        ].join('')
      },
      {
        'label': 'define test',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define test {{}} ()\n',
          '  {{}};\n',
          'end test;\n'
        ].join('')
      },
      {
        'label': 'define thread variable',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'define thread variable *{{}}* = {{}};\n'
      },
      {
        'label': 'define variable',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'define variable *{{}}* = {{}};\n'
      },
      {
        'label': 'for statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'for ({{}})\n',
          '  {{}}\n',
          'end for;\n'
        ].join('')
      },
      {
        'label': 'for/finally statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'for ({{}})\n',
          '  {{}}\n',
          'finally\n',
          '  {{}}',
          'end for;\n'
        ].join('')
      },
      {
        'label': 'for statement (in)',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'for ({{}} in {{}})\n',
          '  {{}}\n',
          'end for;\n'
        ].join('')
      },
      {
        'label': 'if statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'if ({{}})\n',
          '  {{}}\n',
          'end if;\n'
        ].join('')
      },
      {
        'label': 'if/elseif statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'if ({{}})\n',
          '  {{}}\n',
          'elseif ({{}})\n',
          '  {{}}\n',
          'end if;\n'
        ].join('')
      },
      {
        'label': 'if/else statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'if ({{}})\n',
          '  {{}}\n',
          'else\n',
          '  {{}}',
          'end if;\n'
        ].join('')
      },
      {
        'label': 'let statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'let {{}} = {{}};\n'
      },
      {
        'label': 'let (typed) statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'let {{}} :: {{}} = {{}};\n'
      },
      {
        'label': 'unless statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'unless ({{}})\n',
          '  {{}}\n',
          'end unless;\n'
        ].join('')
      },
      {
        'label': 'until statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'until ({{}})\n',
          '  {{}}\n',
          'end until;\n'
        ].join('')
      },
      {
        'label': 'while statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'while ({{}})\n',
          '  {{}}\n',
          'end while;\n'
        ].join('')
      }
    ]
});
