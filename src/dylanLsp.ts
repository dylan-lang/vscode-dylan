/* --------------------------------------------------------------------------------------------
 * Based on LSP example code which is
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path'
import * as vscode from 'vscode'
import { getChannel, getCompiler, findOnPath } from './extension'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  ExecutableOptions
} from 'vscode-languageclient/node'

let client: LanguageClient
// TODO - this should be a setting

let registries: string | undefined
function userRegistries (): string {
  if (registries == null) {
    registries = process.env.OPEN_DYLAN_USER_REGISTRIES ?? path.resolve(vscode.workspace.workspaceFolders?.[0].uri.fsPath ?? '.', 'registry')
  }
  return registries
}

/**
 * Find the Dylan LSP executable.
 * Look on the PATH for `lsp-dylan`.
 * Can be overridden with `dylan.lspServer` in the Settings.
 * Returns undefined if nothing found.
 */
function findLanguageServer (): string | undefined {
  const config = vscode.workspace.getConfiguration('dylan')
  let dylanLanguageServer = config.get<string>('lspServer', '').trim()
  if (dylanLanguageServer === '') {
    dylanLanguageServer = process.platform === 'win32' ? 'dylan-lsp-server.exe' : 'dylan-lsp-server'
  }
  const resolved = findOnPath(dylanLanguageServer)
  if (resolved === undefined) {
    getChannel().appendLine(`LSP server ${dylanLanguageServer} not found.`)
  }
  return resolved
}
export function activateLsp (_context: vscode.ExtensionContext): void {
  void _context // We don't use it
  // The server is implemented in dylan native code
  const serverExe = findLanguageServer()
  if (serverExe != null) {
    getChannel().appendLine(`serverExe: ${serverExe}`)
    getChannel().appendLine(`compiler: ${getCompiler()}`)
    const openDylanRelease =
      path.join(path.dirname(getCompiler()), '..')
    const runOptions: ExecutableOptions = {
      env: {
        ...process.env,
        OPEN_DYLAN_RELEASE: openDylanRelease,
        OPEN_DYLAN_USER_REGISTRIES: userRegistries()
      }
    }
    const serverOptions: ServerOptions = {
      run: {
        command: serverExe,
        options: runOptions
      },
      debug: {
        command: serverExe,
        args: ['--debug-server'],
        options: runOptions
      }
    }

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
      // Register the server for dylan source documents
      documentSelector: [{ scheme: 'file', language: 'dylan' }],
      synchronize: { configurationSection: 'dylan' }
    }

    // Create the language client and start the client.
    client = new LanguageClient(
      'dylan',
      'Dylan Language Server',
      serverOptions,
      clientOptions
    )

    // Start the client. This will also launch the server
    void client.start()
  } else {
    // Server not found.
    vscode.window.showErrorMessage('Dylan language server not found. Advanced editing functions will not be available.').then(() => { /* ignore */ }, () => { /* ignore */ })
  }
}

export function deactivateLsp (): Thenable<void> | undefined {
  return client.stop()
}
