# Essentials

- [Git](#git)
- [Node.js](#nodejs)
- [pnpm](#pnpm)
- [Visual Studio Code](#visual-studio-code)

## Git

Git is used as the source code Version Control System.

### Git installation

Install using `winget`.

```ps
winget install -e --id Microsoft.Git
```

Check `git` version.

```ps
git -v
```

### Git configuration

Set default branch name to `main`.

```ps
git config --global init.defaultBranch main
```

Allows to handle file paths longer than 260 characters on Windows.

```ps
git config --global core.longpaths true
```

Allows to handle file casing renames properly. E.g. renaming `My-File` to `my-file`.

```ps
git config --global core.ignorecase false
```

Add `pushf` command for the convenience.

```ps
git config --global alias.pushf 'push --force-with-lease --force-if-includes'
```

Set user `name` and `email`.

```ps
git config --global user.name "YOUR_FIRST_NAME YOUR_LAST_NAME"
git config --global user.email "YOUR_EMAIL"
```

Set `GitHub username`.

```ps
git config --global credential.https://github.com.username "YOUR_GITHUB_USERNAME"
```

### Git usage

Clone repo.

```ps
cd YOUR_PROJECT_FOLDER
git clone YOUR_PROJECT_URL .
```

## Node.js

Node.js is used as JavaScript runtime.

### Node.js installation

Install using `winget`.

```ps
winget install -e --id OpenJS.NodeJS
```

Check node version.

```ps
node -v
```

## pnpm

pnpm is used as Node.js package manager.

### pnpm installation

Install latest `pnpm` package manager.

```ps
winget install -e --id pnpm.pnpm
```

Check `pnpm` version.

```ps
pnpm -v
```

## Visual Studio Code

Visual Studio Code used as the code editor.

### Visual Studio Code installation

Install using `winget`.

```ps
winget install -e --id Microsoft.VisualStudioCode
```

### Visual Studio Code usage

Start VS Code in project folder.

```ps
cd YOUR_PROJECT_FOLDER
code .
```
