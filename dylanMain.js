/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports", './dylanDef', 'monaco', './features/suggestSupport'], function (require, exports, dylanDef, monaco, SuggestSupport) {
    function activate(_ctx) {
        var ctx = {
            modelService: _ctx.modelService,
            markerService: _ctx.markerService,
            configurationService: _ctx.configurationService
        }
        monaco.Modes.registerMonarchDefinition('dylan', dylanDef.language);
        monaco.Modes.SuggestSupport.register('dylan', new SuggestSupport(ctx));
        monaco.Modes.loadInBackgroundWorker(require.toUrl('./dylanWorker.js')).then(function (workerPiece) {
            // worker piece loaded OK
        }, function (err) {
            console.error(err);
        });
        return null;
    }
    exports.activate = activate;
});
