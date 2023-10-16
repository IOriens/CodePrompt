#!/usr/bin/env node

import { Command } from 'commander'
import CodePrompt from './index'

const program = new Command()

program
  .name('code-prompt')
  .description('CLI tool to generate code prompts using provided patterns')
  .version('1.0.0')

program
  .command('generate')
  .description('Generate code prompts from given file patterns')
  .argument('<pattern>', 'file pattern to process')
  .option('-p, --prefixPrompt <prefixPrompt>', 'Prefix for the prompt')
  .option('-m, --promptMessage <promptMessage>', 'Main prompt message')
  .option(
    '-i, --ignore <ignore>',
    'Pattern to ignore',
    'node_modules/**', // default value
  )
  .option(
    '-e, --encodingModel <encodingModel>',
    'Encoding model, default is gpt-4',
    'gpt-4',
  )
  .option(
    '-c, --copyToClipboard',
    'Copy result to clipboard, default true',
    true,
  )
  .option('--cwd <cwd>', 'Current working directory', process.cwd())
  .action(async (pattern, options) => {
    try {
      const result = await CodePrompt(pattern, {
        debug: options.debug,
        prefixPrompt: options.prefixPrompt,
        prompt: options.promptMessage,
        ignore: options.ignore,
        encodingModel: options.encodingModel,
        copyToClipboard: options.copyToClipboard,
        cwd: options.cwd,
      })

      console.log('-----------------------------------')
      if (options.copyToClipboard) {
        console.log('Results copied to clipboard\n')
      } else {
        console.log('Prompt:\n\n', `  ${result.prompt}\n`)
      }

      console.log('Details:')
      console.log('  Prompt Length:', result.promptLength)
      console.log('  Prompt Token Length:', result.promptTokenLength)
      console.log('\nCode List:')
      result.codeList.forEach((item) => {
        console.log(`  ${item.filePath} (${item.fileTokenLength} tokens)`)
      })
      console.log('-----------------------------------')
    } catch (error) {
      console.error('Error:', error)
    }
  })

program.parse()
