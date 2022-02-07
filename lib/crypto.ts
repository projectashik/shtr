import { JWT, JWE, JWK } from "jose";
import crypto from "crypto";
import { v4, v5, validate } from "uuid";
import { startOfMonth } from "date-fns";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;
const KEY = JWK.asKey(Buffer.from(secret()));
const ROTATING_SALT = hash(startOfMonth(new Date()).toUTCString());
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function hash(...args: any) {
  return crypto.createHash("sha512").update(args.join("")).digest("hex");
}

export function secret() {
  return hash(process.env.HASH_SECRET);
}

export function salt() {
  return v5([secret(), ROTATING_SALT].join(""), v5.DNS);
}

export function uuid(...args: any) {
  if (!args.length) return v4();

  return v5(args.join(""), salt());
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

export function checkPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export async function createToken(payload: object) {
  return JWT.sign(payload, KEY);
}

export async function parseToken(token: string) {
  try {
    return JWT.verify(token, KEY);
  } catch {
    return null;
  }
}

export async function createSecureToken(payload: object) {
  return JWE.encrypt(await createToken(payload), KEY);
}

export async function parseSecureToken(token: string) {
  try {
    const result = await JWE.decrypt(token, KEY);

    return parseToken(result.toString());
  } catch {
    return null;
  }
}
