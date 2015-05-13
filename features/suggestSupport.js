/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
/// <reference path="../../declares.d.ts" />
'use strict';

define(["require", "exports",  'monaco', './snippets'], function (require, exports, monaco, DylanSnippets) {
    var SuggestSupport = (function (_super) {
        function SuggestSupport(ctx) {
            this.modelService = ctx.modelService;
        }

        SuggestSupport.prototype.suggest = function (resource, position) {
            var model = this.modelService.getModel(resource);
            var versionId = model.getVersionId();
            if (versionId !== model.getVersionId()) {
                return [ret];
            }

            // Need to capture the word at position before we send the request.
            // The model can move forward while the request is evaluated.
            var word = model.getWordAtPosition(position, false);

            var ret = {
                currentWord: word ? word.word.substring(0, position.column - word.startColumn) : '',
                suggestions: []
            };
            ret.suggestions = DylanSnippets.snippets;
            return [ret];
        };
        return SuggestSupport;
    })();
    return SuggestSupport;
});
