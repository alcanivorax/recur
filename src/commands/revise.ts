import readline from 'readline'
import { readState, writeState } from '../state/store.js'

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

export async function revise(): Promise<void> {
  const state = readState()

  if (!state.revisions || state.revisions.length === 0) {
    console.log('No revisions due.')
    console.log('Run: recur today')
    return
  }

  // V1: handle one revision at a time
  const rev = state.revisions[0]

  console.log('Revision\n')
  console.log(`Topic      : ${rev.topic}`)
  console.log(`Difficulty : L${Math.min((rev.level ?? 1) + 1, 5)}\n`)
  console.log('Task:')
  console.log('Explain the approach or solve 1 representative problem.\n')

  const done = await ask('Done? (y/n): ')
  if (done !== 'y') {
    console.log('Finish the revision, then come back.')
    return
  }

  // consume revision
  state.revisions.shift()
  writeState(state)

  console.log('\nRevision completed.')

  if (state.revisions.length > 0) {
    console.log('More revisions pending.')
    console.log('Run: recur revise')
  } else {
    console.log('All revisions done.')
    console.log('Run: recur today')
  }
}
