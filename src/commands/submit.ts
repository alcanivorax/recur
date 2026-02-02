import readline from 'readline'
import { readState, writeState } from '../state/store.js'
import { stdout } from 'process'
import { stat, write } from 'fs'

export async function ask(question: string): Promise<string> {
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

export async function submit(): Promise<void> {
  const state = readState()

  if (!state.current) {
    console.log('Nothing to submit.')
    return
  }

  const attempted = await ask('Attempted the task? (y/N): ')
  const timeSpent = await ask('Time spent (minutes): ')
  const confidence = await ask('Confidence (1-5): ')
  const usedHint = await ask('Used hint? (y/N): ')

  // ---- streak logic ----
  state.streak += attempted === 'y' ? 1 : 0
  state.day += 1
  state.lastActive = new Date().toISOString().slice(0, 10)

  // ---- difficulty logic ----
  const conf = Number(confidence)
  if (conf >= 4 && !usedHint) {
    state.current.level = Math.min(state.current.level + 1, 5)
  } else if (conf <= 2) {
    state.current.level = Math.max(state.current.level - 1, 1)
  }

  // ---- revision stub ----
  state.revisions.push({ topic: state.current.topic, dueInDays: 3 })

  // ---- clear current task ----
  state.current = null

  writeState(state)

  console.log('\nSubmitted.')
  console.log(`Streak : $ ${state.streak}`)
  console.log('Next   : recur today')
}
