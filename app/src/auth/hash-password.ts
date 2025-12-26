export async function hashPassword(password: string) {
  const encoder = new TextEncoder()

  // 1. Generate a cryptographically secure random salt (32 bytes recommended for 2025)
  const salt = crypto.getRandomValues(new Uint8Array(32))

  // 2. Import the password string as "key material"
  const passwordKey = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])

  // 3. Derive the hash using PBKDF2 with high iterations
  const iterations = 600_000 // 2025 OWASP recommended minimum for SHA-256
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA-256',
    },
    passwordKey,
    256 // Length of the resulting hash in bits
  )

  return {
    salt: btoa(String.fromCharCode(...salt)),
    hash: btoa(String.fromCharCode(...new Uint8Array(hashBuffer))),
  }
}
