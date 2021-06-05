import { existsSync } from 'fs'
import * as vscode from 'vscode'
import * as path from 'path'
import { DylanTaskProvider } from './dylanTaskProvider'
import { activateLsp, deactivateLsp } from './dylanLsp'
let dylanTaskProvider: vscode.Disposable | undefined

let channel: vscode.OutputChannel | undefined
export function getChannel (): vscode.OutputChannel {
  if (channel == null) {
    channel = vscode.window.createOutputChannel('Dylan')
  }
  return channel
}

export function activate (context: vscode.ExtensionContext): void {
  getChannel().appendLine('Activating')
  compiler = findCompiler() ?? 'dylan-compiler-not-found'
  activateLsp(context)
  dylanTaskProvider = vscode.tasks.registerTaskProvider(DylanTaskProvider.Type, new DylanTaskProvider())
}

export function deactivate (): Thenable<void> | undefined {
  if (dylanTaskProvider != null) {
    dylanTaskProvider.dispose()
    dylanTaskProvider = undefined
  }
  return deactivateLsp()
}
// Cached location.
let compiler: string | undefined
/**
 * Find the Dylan compiler.
 * Look on the PATH for `dylan-compiler` and `dylan-compiler-with-tools.exe`
 * (for windows users)
 * Can be overridden with `dylan.compiler` in the Settings.
 * Returns undefined if nothing found.
 */
function findCompiler (): string | undefined {
  const config = vscode.workspace.getConfiguration('dylan')
  const dylanCompiler = config.get('compiler')
  if (dylanCompiler != null && dylanCompiler !== '') {
    return dylanCompiler as string
  } else {
    /* No setting, assume it's on the path */
    const paths = (process.env.PATH ?? '').split(path.delimiter)
    const exe = process.platform === 'win32' ? 'dylan-compiler-with-tools.exe' : 'dylan-compiler'
    for (const p of paths) {
      const dc = path.join(p, exe)
      if (existsSync(dc)) {
        return dc
      }
    }
    return undefined // Not found anywhere
  }
}
/**
 * Get full path of the dylan compiler.
 * This is set when the extension activates and returned from the cache.
 */
export function getCompiler (): string {
  return compiler as string
}
