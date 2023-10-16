# CodePrompt

CodePrompt is a tool designed to generate prompts based on provided code patterns. It assists users in quickly reviewing and understanding code pieces and patterns.


| CLI Output | Prompt Result |
|-------------------------|---------------|
| ![Code Prompt CLI Example](./assets/CodePromptCliExample.png) | ![Prompt Result](./assets/PromptResult.png) |



## Features

- **Glob Pattern Search**: Use glob patterns to specify which files to include in the prompt.
- **Prefixing and Prompting**: Prefix the code content and add specific prompt messages after.
- **Token Counting**: Utilizes the `tiktoken` library to determine the token length of text and code.
- **Clipboard Integration**: Automatically copy the generated prompt to the clipboard for quick sharing and use.
- **CLI Interface**: A handy CLI tool for quick execution.

## Installation

```bash
npm install -g code-prompt
```

## Usage

### As a Library

You can import and use the main `CodePrompt` function as shown in `index.test.ts`.

Example:

```typescript
import CodePrompt from 'code-prompt'

const result = await CodePrompt('**/*.ts', {
  prefixPrompt: 'I am working on xxx project.',
  prompt: 'Help me edit xx.ts, add xxx feature',
  copyToClipboard: true,
  cwd: process.cwd(),
})
```

### CLI Tool

You can also use CodePrompt as a CLI tool:

```bash
code-prompt generate <pattern> [options]
```

#### Options:

- `-p, --prefixPrompt <prefixPrompt>`: Prefix for the prompt
- `-m, --promptMessage <promptMessage>`: Main prompt message
- `-i, --ignore <ignore>`: Pattern to ignore (default: 'node_modules/**')
- `-e, --encodingModel <encodingModel>`: Encoding model (default: 'gpt-4')
- `-c, --copyToClipboard`: Copy result to clipboard (default: true)
- `--cwd <cwd>`: Current working directory (default: process's current working directory)

Example:

```bash
code-prompt generate '**/*.ts' -p "I am working on a project." -m "Help me review this code."
```

## Contributing

Feel free to open issues and submit pull requests to improve CodePrompt.

## License

[MIT License](LICENSE.md)
