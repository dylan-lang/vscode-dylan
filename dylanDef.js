/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    exports.language = {
        displayName: 'Dylan',
        name: 'dylan',
        mimeTypes: [],
        fileExtensions: ['.dylan', '.lid', '.hdp', '.intr'],
        ignoreCase: true,
        editorOptions: { tabSize: 2, insertSpaces: true },
        defaultToken: '',
        lineComment: '//',
        blockCommentStart: '/*',
        blockCommentEnd: '*/',
        autoClosingPairs: [
          ['{', '}'],
          ['[', ']'],
          ['(', ')'],
          ['"', '"'],
          ['\'', '\'']],
        keywords: [
            'class',
            'constant',
            'domain',
            'function',
            'generic',
            'handler',
            'let',
            'library',
            'local',
            'macro',
            'method',
            'module',
            'slot',
            'variable',
        ],
        flowKeywords: [
            'afterwards',
            'begin',
            'block',
            'case',
            'cleanup',
            'define',
            'else',
            'elseif',
            'end',
            'exception',
            'for',
            'if',
            'otherwise',
            'select',
            'unless',
            'until',
            'while',
        ],
        methodAdjectives: [
            'compiler-open',
            'inline',
            'inline-only',
            'not-inline',
            'sealed',
        ],
        classAdjectives: [
            'abstract',
            'concrete',
            'dynamic',
            'free',
            'open',
            'primary',
            'sealed',
        ],
        brackets: [
            { open: '{', close: '}', token: 'delimiter.curly' },
            { open: '[', close: ']', token: 'delimiter.bracket' },
            { open: '(', close: ')', token: 'delimiter.parenthesis' }
        ],
        escapes: /\\(?:[\\"'abefnrt0]|<[0-9A-Za-z]>)/,
        tokenizer: {
            root: [
                [/\s+/, 'white'],
                { include: '@numbers' },
                [/[,;]/, 'delimiter'],
                [/[{}\[\]()]/, '@brackets'],
                [/"([^"\\]|\\.)*$/, 'string.invalid'],
                [/"/, 'string', '@string'],
                [/'[^\\']'/, 'string'],
                [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
                [/'/, 'string.invalid'],
                [/\/\*/, 'comment.block', '@comment'],
                [/\/\/.*$/, 'comment.line'],
                [/[a-zA-Z0-9]\w*/, {
                    cases: {
                        '@flowKeywords': 'keyword.flow',
                        '@keywords': 'keyword',
                        '@methodAdjectives': 'token.annotation',
                        '@classAdjectives': 'token.annotation',
                        '@default': 'identifier'
                    }
                }]
            ],
            numbers: [
                [/#x([abcdef]|[ABCDEF]|\d)+/, 'number.hex'],
                [/#o[01234567]+/, 'number.octal'],
                [/#b[01]+/, 'number.binary'],
                [/(\+|-)?[\d]+/, 'number.decimal'],
                [/(\+|-)?(([\d]+\.?[\d]*)|(\.[\d]+))(([dDeEsSxS])(\+|-)?[\d]+)?/, 'number'],
            ],
            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string', '@pop'],
            ],
            comment: [
                [/[^\/*]+/, 'comment.block'],
                [/\/\*/, 'comment.block', '@comment'],
                [/\*\//, 'comment.block', '@pop'],
                [/[\/*]/, 'comment.block']
            ],
        }
    };
});
