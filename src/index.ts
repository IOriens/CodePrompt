import { glob, GlobOptions } from 'glob'
import fs from 'fs-extra'
import path from 'path'
import { encoding_for_model, TiktokenModel } from 'tiktoken'

interface CodePromptOptions extends GlobOptions {
  prompt: string
  prefixPrompt?: string
  encodingModel?: TiktokenModel
  copyToClipboard?: boolean
}

interface CodeInfo {
  filePath: string
  fileContent: string
  fileContentLength: number
  fileTokenLength: number
}

export default async function CodePrompt(
  pattern: string | string[],
  options: CodePromptOptions,
) {
  const {
    prompt,
    prefixPrompt,
    copyToClipboard,
    encodingModel,
  } = options

  if (!prompt) throw new Error('prompt is required')
  const files = await glob(pattern, options as GlobOptions)

  const codeList: CodeInfo[] = []

  let cwd = options.cwd || process.cwd()
  let codeContentString = ''
  for (let file of files) {
    let filePath = path.join(cwd.toString(), file.toString())
    let fileContent = await fs.readFile(filePath, 'utf-8')
    codeContentString += `## ${file}\n\n\`\`\`\n${fileContent}\n\`\`\`\n\n`
    codeList.push({
      filePath,
      fileContent,
      fileContentLength: fileContent.length,
      fileTokenLength: getTokenLength(fileContent, encodingModel),
    })
  }

  let result = ''
  if (prefixPrompt) {
    result = `${prefixPrompt}\n\n${codeContentString}`
  }
  if (prompt) {
    result = `${codeContentString}\n\n${prompt}`
  }

  if (copyToClipboard) {
    let { default: clipboard } = await import('clipboardy')
    clipboard.writeSync(result)
  }

  return {
    prompt: result,
    promptLength: result.length,
    promptTokenLength: getTokenLength(result, encodingModel),
    codeList,
  }
}

function getTokenLength(text: string, encodingModel: TiktokenModel = 'gpt-4') {
  const enc = encoding_for_model(encodingModel)
  let encoded = enc.encode(text)
  enc.free()
  return encoded.length
}
