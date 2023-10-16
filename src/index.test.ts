import CodePrompt from './index'

async function test() {
  let { prompt, promptLength, promptTokenLength, codeList } = await CodePrompt(
    '**/*.ts',
    {
      prefixPrompt: 'I am working on a prompt generating project.',
      // prompt: `Edit index.test.ts, make the log print more clear`,
      prompt: 'Help me write a README.md file for this project.',
      copyToClipboard: true,
      cwd: process.cwd(),
    },
  )

  // Header
  console.log('=======================================')
  console.log('           CODE PROMPT TEST            ')
  console.log('=======================================')

  // Display prompt
  console.log('\nGenerated Prompt:\n')
  console.log('---------------------------------------')
  console.log(prompt.slice(0, 100))

  // Display prompt length details
  console.log('\nPrompt Length Details:')
  console.log('---------------------------------------')
  console.log('Prompt Text Length:', promptLength)
  console.log('Prompt Token Length:', promptTokenLength)

  // Display code list details
  console.log('\nFiles Processed:')
  console.log('---------------------------------------')
  codeList.forEach((item) => {
    console.log(`${item.filePath} - ${item.fileTokenLength} tokens`)
  })

  // Footer
  console.log('=======================================')
}

test()
