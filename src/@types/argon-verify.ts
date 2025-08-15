import argon from 'argon2'


export async function verifySafe(hash: string, plaintext: string): Promise<boolean> {
  try {
    const res = await argon.verify(hash, plaintext);
    return res;
  } catch {
    return false;
  }
}
