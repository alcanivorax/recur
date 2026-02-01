import { readState, writeState } from '../state/store.js'

function hasRevisionDue(state: any): boolean {
  return state.revisions && state.revisions.length > 0
}

export function today(): void {
  const state = readState()

  console.log(`Day ${state.day + 1}\n`)

  if (hasRevisionDue(state)) {
    console.log('REVISION DUE\n')

    state.revisions.forEach((rev: any) => {
      console.log(`• ${rev.topic}`)
    })

    console.log('\nNew problems are locked until revisions are completed.')
    console.log('\nRun: recur revise')
    return
  }

  if (!state.current) {
    state.current = {
      topic: 'Binary Search',
      level: 1,
      problemId: 'lc-704',
    }

    writeState(state)
  }
  console.log(`Topic       : ${state.current.topic}`)
  console.log(`Difficulty  : L${state.current.level}`)
  console.log(`Problem     : ${state.current.problemId}\n`)

  console.log(`Streak      : ${state.streak}`)
  console.log(`Status      : NOT DONE\n`)
  console.log('One problem. One attempt. That’s enough.')
}
