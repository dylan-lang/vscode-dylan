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
          '  {{body}}\n',
          'end;\n'
        ].join('')
      },
      {
        'label': 'define class',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define class <{{class}}> (<{{object}}>)\n',
          '  {{body}}\n',
          'end class <{{class}}>;\n'
        ].join('')
      },
      {
        'label': 'define constant',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'define constant \${{constant}} = {{value}};\n'
      },
      {
        'label': 'define function',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define function {{function}} ({{args}}) => ({{value}})\n',
          '  {{body}}\n',
          'end function {{function}};\n'
        ].join('')
      },
      {
        'label': 'define generic',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'define generic {{generic}} ({{args}}) => ({{value}});\n'
      },
      {
        'label': 'define method',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define method {{method}} ({{args}}) => ({{value}})\n',
          '  {{body}}\n',
          'end method {{method}};\n'
        ].join('')
      },
      {
        'label': 'define objc-class',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define objc-class {{class-name}} ({{super-class}}) => {{objective-c-class}}\n',
          '  {{body}}\n',
          'end objc-class;\n'
        ].join('')
      },
      {
        'label': 'define objc-method',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define objc-method {{method}} ({{args}}) => ({{value}})\n',
          '  c-signature: ({{c-args}}) => ({{c-value}})\n',
          '  {{body}}\n',
          'end objc-method;\n'
        ].join('')
      },
      {
        'label': 'define suite',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define suite {{suite-name}} ()\n',
          '  {{body}};\n',
          'end suite;\n'
        ].join('')
      },
      {
        'label': 'define test',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'define test {{test-name}} ()\n',
          '  {{body}};\n',
          'end test;\n'
        ].join('')
      },
      {
        'label': 'define thread variable',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'define thread variable *{{variable}}* = {{value}};\n'
      },
      {
        'label': 'define variable',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'define variable *{{variable}}* = {{value}};\n'
      },
      {
        'label': 'for statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'for ({{loop-condition}})\n',
          '  {{body}}\n',
          'end for;\n'
        ].join('')
      },
      {
        'label': 'for/finally statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'for ({{loop-condition}})\n',
          '  {{loop-body}}\n',
          'finally\n',
          '  {{finally-body}}',
          'end for;\n'
        ].join('')
      },
      {
        'label': 'for statement (in)',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'for ({{var}} in {{collection}})\n',
          '  {{body}}\n',
          'end for;\n'
        ].join('')
      },
      {
        'label': 'if statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'if ({{if-condition}})\n',
          '  {{body}}\n',
          'end if;\n'
        ].join('')
      },
      {
        'label': 'if/elseif statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'if ({{if-condition}})\n',
          '  {{true-body}}\n',
          'elseif ({{alternate-condition}})\n',
          '  {{false-body}}\n',
          'end if;\n'
        ].join('')
      },
      {
        'label': 'if/else statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'if ({{if-condition}})\n',
          '  {{true-body}}\n',
          'else\n',
          '  {{false-body}}',
          'end if;\n'
        ].join('')
      },
      {
        'label': 'let statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'let {{binding}} = {{value}};\n'
      },
      {
        'label': 'let (typed) statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': 'let {{binding}} :: {{type}} = {{value}};\n'
      },
      {
        'label': 'unless statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'unless ({{condition}})\n',
          '  {{body}}\n',
          'end unless;\n'
        ].join('')
      },
      {
        'label': 'until statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'until ({{condition}})\n',
          '  {{body}}\n',
          'end until;\n'
        ].join('')
      },
      {
        'label': 'while statement',
        'type': 'snippet',
        'documentationLabel': '',
        'codeSnippet': [
          'while ({{condition}})\n',
          '  {{body}}\n',
          'end while;\n'
        ].join('')
      }
    ]
});
