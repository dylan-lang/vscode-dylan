/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports", './dylanDef', 'monaco'], function (require, exports, dylanDef, monaco) {
    monaco.Modes.registerMonarchDefinition('dylan', dylanDef.language);
});
