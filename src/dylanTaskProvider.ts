import * as vscode from 'vscode'
import * as path from 'path'
import { getCompiler } from './extension'

// See https://github.com/microsoft/vscode-extension-samples/blob/master/task-provider-sample/src/rakeTaskProvider.ts
export class DylanTaskProvider implements vscode.TaskProvider {
  static Type = 'dylan-compiler'

  /* This is to scan the workspace root for tasks */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  provideTasks (_token: vscode.CancellationToken): Thenable<vscode.Task[]> {
    return scanWorkspacesForTasks()
  }

  /* This is to "re-animate" a task that was stored in tasks.json */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolveTask (task: vscode.Task, _token: vscode.CancellationToken): vscode.Task {
    const dylanTaskDef = task.definition as DylanTaskDefinition
    const project = dylanTaskDef.project
    return new vscode.Task(task.definition,
      vscode.TaskScope.Workspace,
      project,
      DylanTaskProvider.Type,
      new vscode.ProcessExecution(getCompiler(), ['-build', project]),
      task.problemMatchers
    )
  }
}
/**
 * Extra info we need to associate with a Dylan compiler Task.
*/
interface DylanTaskDefinition extends vscode.TaskDefinition {
  project: string // the project file name
}
/**
 * Take a reference to a project file and generate the dylan-compiler
 * command to build it.
 * @param p the URI of a project (.lid) file
 * @returns the Task
 */
function projectUriToTask (p: vscode.Uri): vscode.Task {
  const project = path.basename(p.fsPath)
  const compileTask = new vscode.Task({
    type: DylanTaskProvider.Type,
    project: project
  },
  vscode.TaskScope.Workspace,
  project,
  DylanTaskProvider.Type,
  new vscode.ProcessExecution(getCompiler(), ['-build', project]),
  '$dylan-compiler-problems'
  )
  // TODO - set the working directory?
  compileTask.group = vscode.TaskGroup.Build
  return compileTask
}
/**
 * Look in all workspace folders for project files. Return a corresponding
 * array of configured Tasks.
 * @returns Array of tasks
 */
async function scanWorkspacesForTasks (): Promise<vscode.Task[]> {
  return await vscode.workspace.findFiles('*.{lid,hdp}', '_build')
    .then(uris => uris.map(projectUriToTask))
}
