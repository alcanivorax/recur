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
