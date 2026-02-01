import fs from 'fs'
import os from 'os'
import path from 'path'

const dirPath = path.join(os.homedir(), '.recur')
const statePath = path.join(dirPath, 'state.json')

export type RecurState = {
  day: number
  streak: number
  lastActive: string | null
  current: {
    topic: string
    level: number
    problemId: string
  } | null
  revisions: any[]
}

export function ensureStateFile(): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }

  if (!fs.existsSync(statePath)) {
    const initialState: RecurState = {
      day: 0,
      streak: 0,
      lastActive: null,
      current: null,
      revisions: [],
    }

    fs.writeFileSync(statePath, JSON.stringify(initialState, null, 2))
  }
}

export function readState(): RecurState {
  ensureStateFile()

  const raw = fs.readFileSync(statePath, 'utf-8')
  return JSON.parse(raw) as RecurState
}

export function writeState(state: RecurState): void {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2))
}
