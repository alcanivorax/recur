import readline from 'readline'
import { readState, writeState } from '../state/store.js'
import { daysBetween } from '../state/date.js'
import { stat } from 'fs'

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
  await ask('Time spent (minutes): ') // timeSpent
  const confidence = await ask('Confidence (1-5): ')
  const usedHint = await ask('Used hint? (y/N): ')

  // ---- streak logic ----
  const today = new Date().toISOString().slice(0, 10)

  if (state.lastActive) {
    const gap = daysBetween(state.lastActive, today)
    if (gap > 1) {
      state.streak = 0
    }
  }

  if (attempted === 'y') {
    state.streak += 1
  }

  state.lastActive = today
  state.day += 1
  // state.streak += attempted === 'y' ? 1 : 0
  // state.day += 1
  // state.lastActive = new Date().toISOString().slice(0, 10)

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
