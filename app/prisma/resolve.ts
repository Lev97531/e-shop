import { registerHooks } from 'node:module'
import { pathToFileURL } from 'node:url'

registerHooks({
  resolve: (specifier, context, next) => {
    if (isAbsoluteUrl(specifier) || isFileUrl(specifier)) {
      return next(specifier, context)
    }

    if (isUnderNodeModules(context.parentURL)) {
      return next(specifier, context)
    }

    return next(specifier + '.ts', context)
  },
})

function isAbsoluteUrl(url: string) {
  return !url.startsWith('.')
}

function isFileUrl(url: string) {
  return url.startsWith('file://')
}

const modulesUrl = pathToFileURL('node_modules')

function isUnderNodeModules(url?: string) {
  if (!url) {
    return false
  }

  const rel = new URL(url, modulesUrl)
  return rel.href.startsWith(modulesUrl.href)
}
