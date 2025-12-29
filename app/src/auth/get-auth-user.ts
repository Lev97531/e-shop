import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { prisma } from 'prisma'
import { sessionDuration } from './login'

export const getAuthUser = createServerFn().handler(async () => {
  const sessionId = getCookie('session')

  if (!sessionId) {
    return null
  }

  const session = await prisma.session.findUnique({ where: { id: sessionId }, include: { user: true } })
  if (!session) {
    return null
  }

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } })
    return null
  }

  if (needsRenewal(session.expiresAt)) {
    const expiresAt = new Date(Date.now() + sessionDuration)
    await prisma.session.update({ where: { id: session.id }, data: { expiresAt } })

    setCookie('session', session.id, { expires: expiresAt, httpOnly: true, sameSite: 'lax', secure: true })
  }

  return session.user
})

function needsRenewal(sessionExp: Date) {
  const now = Date.now()
  const exp = sessionExp.getTime()

  const timeLeft = exp - now
  const totalDuration = 30 * 24 * 60 * 60 * 1000 // 30 days

  return timeLeft < totalDuration / 2
}
