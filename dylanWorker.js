/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports", 'monaco'], function (require, exports, monaco) {
    var InplaceReplaceSupport = monaco.Modes.InplaceReplaceSupport;
    var slotSets = ['slot', 'constant slot'];
    var valueSets = ['#t', '#f'];
    InplaceReplaceSupport.register('dylan', InplaceReplaceSupport.create({
        textReplace: function (value, up) {
            return InplaceReplaceSupport.valueSetsReplace([slotSets, valueSets], value, up);
        }
    }));
    exports._TS_FORCE_EXTERNAL = true;
});
