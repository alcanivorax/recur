import { args } from './args.js'
import { today } from './today.js'
import { submit } from './submit.js'
import { revise } from './revise.js'
import pkg from '../../package.json' with { type: 'json' }

function printHelp(): void {
  console.log(`
${pkg.name} — Daily DSA Practice CLI

Usage:
  ${pkg.name} <command>

Commands:
  today      Get today’s DSA problem
  submit     Mark today’s problem as completed
  revise     Revisit previously solved problems

Options:
  -h, --help       Show help
  -v, --version    Show version

Examples:
  ${pkg.name} today
  ${pkg.name} submit
  ${pkg.name} revise
`)
}

function printVersion(): void {
  console.log(`
${pkg.name} version ${pkg.version}
`)
}

function printInvalidOptions(option: string): void {
  console.error(`
${pkg.name}: unknown option "${option}"

Usage:
  ${pkg.name} <command>

Commands:
  today       Get today’s DSA problem
  submit      Mark today’s problem as completed
  revise      Revisit previously solved problems

Options:
  -h, --help        Show help
  -v, --version     Show version

Tip:
  Run "${pkg.name} --help" to see all available commands.
`)
}

export async function handleCliOptions(): Promise<void> {
  if (args.length === 0) return

  if (
    args.includes('-today') ||
    args.includes('--today') ||
    args.includes('today')
  ) {
    today()
    process.exit(0)
  }

  if (
    args.includes('-revise') ||
    args.includes('--revise') ||
    args.includes('revise')
  ) {
    await revise()
    process.exit(0)
  }

  if (
    args.includes('-submit') ||
    args.includes('--submit') ||
    args.includes('submit')
  ) {
    await submit()
    process.exit(0)
  }

  if (args.includes('-h') || args.includes('--help') || args.includes('help')) {
    printHelp()
    process.exit(0)
  }

  if (
    args.includes('-v') ||
    args.includes('--version') ||
    args.includes('version')
  ) {
    printVersion()
    process.exit(0)
  }

  printInvalidOptions(args[0])
  process.exit(2)
}
