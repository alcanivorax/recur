#!/usr/bin/env node

import { handleCliOptions } from './commands/options.js'
import { readState, writeState } from './state/store.js'

export async function run() {
  handleCliOptions()
  const state = readState()
  state.day += 1
  writeState(state)
  return 'recur is running...'
}

await run()
