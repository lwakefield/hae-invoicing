/* globals atob */

export function decodeJwt (jwt) {
  let [encodedHeader, encodedClaims, signature] = jwt.split('.')
  let [header, claims] = [
    JSON.parse(atob(encodedHeader)),
    JSON.parse(atob(encodedClaims))
  ]
  return { header, claims, signature }
}
