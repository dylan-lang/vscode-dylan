import { existsSync } from 'fs'
import * as vscode from 'vscode'
import * as path from 'path'
import { DylanTaskProvider } from './dylanTaskProvider'
import { activateLsp, deactivateLsp } from './dylanLsp'
let dylanTaskProvider: vscode.Disposable | undefined
export const channelName = 'Dylan Language Server'

export function activate (context: vscode.ExtensionContext): void {
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
/**
 * If the file exists, return it, otherwise return undefined.
 * If the file is a name with no directories, attempt to find
 * it on the system path.
 * @param file A file name or path
 */
export function findOnPath (file: string): string | undefined {
  if (file.includes(path.sep)) {
    if (existsSync(file)) {
      return file
    } else {
      return undefined
    }
  } else {
    const envPath = process.env.PATH
    if (envPath != null && envPath !== '') {
      const paths = envPath.split(path.delimiter)
      for (const p of paths) {
        const fullPath = path.join(p, file)
        if (existsSync(fullPath)) {
          return fullPath
        }
      }
    }
    return undefined
  }
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
  let dylanCompiler = config.get('compiler', '').trim()
  if (dylanCompiler === '') {
    dylanCompiler = process.platform === 'win32' ? 'dylan-compiler-with-tools.exe' : 'dylan-compiler'
  }
  const resolved = findOnPath(dylanCompiler)
  return resolved
}
/**
 * Get full path of the dylan compiler.
 * This is set when the extension activates and returned from the cache.
 */
export function getCompiler (): string {
  return compiler as string
}
