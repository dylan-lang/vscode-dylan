'use strict';
define(["require", "exports", './dylanDef', 'vscode'], function (require, exports, dylanDef, vscode_1) {
  function activate(subscriptions) {
    subscriptions.push(vscode_1.Modes.registerMonarchDefinition('dylan', dylanDef.language));
    subscriptions.push(vscode_1.Modes.InplaceReplaceSupport.register('dylan', {
      sets: [
        ['slot', 'constant slot'],
        ['#t', '#f']
      ]
    }));
  }
  exports.activate = activate;
});
