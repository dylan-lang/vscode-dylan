/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    exports.language = {
        displayName: 'Dylan',
        name: 'dylan',
        mimeTypes: [],
        fileExtensions: ['.dylan', '.lid', '.hdp'],
        ignoreCase: true,
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
        tokenizer: {
            root: [
                [/[{}\[\]()]/, '@brackets'],
                [/\s+/, 'white'],
                [/[a-zA-Z]\w*/, {
                    cases: {
                        '@flowKeywords': 'keyword.flow',
                        '@keywords': 'keyword',
                        '@methodAdjectives': 'token.annotation',
                        '@classAdjectives': 'token.annotation',
                        '@default': 'identifier'
                    }
                }]
            ],
        }
    };
});
