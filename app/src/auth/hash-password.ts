const encoder = new TextEncoder()
const ITERATIONS = 600_000
const HASH_BITS = 256

// --------------------
// Hash password
// --------------------
export async function hashPassword(password: string) {
  // Generate cryptographically secure salt (32 bytes)
  const salt = crypto.getRandomValues(new Uint8Array(32))

  // Import password as key material
  const passwordKey = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])

  // Derive hash
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    HASH_BITS
  )

  return {
    salt: btoa(String.fromCharCode(...salt)),
    hash: btoa(String.fromCharCode(...new Uint8Array(hashBuffer))),
  }
}

// --------------------
// Verify password
// --------------------
export async function verifyPassword(password: string, storedSalt: string, storedHash: string): Promise<boolean> {
  // Decode Base64 salt
  const salt = Uint8Array.from(atob(storedSalt), (c) => c.charCodeAt(0))

  // Import password as key material
  const passwordKey = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])

  // Re-derive hash
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    HASH_BITS
  )

  const computedHash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))

  // Constant-time comparison
  if (computedHash.length !== storedHash.length) return false

  let diff = 0
  for (let i = 0; i < computedHash.length; i++) {
    diff |= computedHash.charCodeAt(i) ^ storedHash.charCodeAt(i)
  }

  return diff === 0
}
