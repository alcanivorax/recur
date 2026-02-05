import { args } from './args.js'
import { today } from './today.js'
import { submit } from './submit.js'
import { revise } from './revise.js'
import pkg from '../../package.json' with { type: 'json' }

function printHelp(): void {
  console.log(`
${pkg.name} - a cli tool

Usage:
  ${pkg.name} [options]

Options:
  -h, --help, help        Show help
  -v, --version, version  Show version
`)
}

function printVersion(): void {
  console.log(`
${pkg.name} version ${pkg.version}
`)
}
function printInvalidOptions(option: string): void {
  console.error(`
unknown option: ${option}
usage: ${pkg.name} [-v | --version] [-h | --help]
usage: ${pkg.name} [-today | --today | today]
usage: ${pkg.name} [-revise | --revise | revise]
usage: ${pkg.name} [-submit | --submit | submit]
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
