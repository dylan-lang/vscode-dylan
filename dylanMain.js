/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports", './dylanDef', 'monaco'], function (require, exports, dylanDef, monaco) {
    monaco.Modes.registerMonarchDefinition('dylan', dylanDef.language);
    monaco.Modes.loadInBackgroundWorker(require.toUrl('./dylanWorker.js')).then(function (workerPiece) {
        // worker piece loaded OK
    }, function (err) {
        console.error(err);
    });
});
