import { registerHooks } from 'node:module'

registerHooks({
  resolve: (specifier, context, next) => {
    if (isAbsoluteUrl(specifier) || isFileUrl(specifier)) {
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
