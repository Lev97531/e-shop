/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '../styles/app.css?url'
import { Layout } from '~/home/Layout'
import { Toaster } from 'sonner'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <h1>Not Found</h1>,
})

function RootComponent() {
  return (
    <RootDocument>
      <div className='className="flex flex-col max-w-7xl mx-auto'>
        <Outlet />
      </div>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
