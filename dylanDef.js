/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    exports.language = {
        displayName: 'Dylan',
        name: 'dylan',
        mimeTypes: [],
        fileExtensions: ['.dylan', '.lid', '.hdp'],
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
            'begin',
            'constant',
            'define',
            'end',
            'function',
            'if',
            'let',
            'method',
            'slot',
            'until',
            'while',
        ],
        brackets: [
            { open: '{', close: '}', token: 'delimiter.curly' },
            { open: '[', close: ']', token: 'delimiter.bracket' },
            { open: '(', close: ')', token: 'delimiter.parenthesis' }
        ],
        tokenizer: {
            root: [
                [/[{}\[\]()]/, '@brackets'],
                [/\s+/, 'white'],
                [/[a-zA-Z]\w*/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'identifier'
                    }
                }]
            ],
        }
    };
});
