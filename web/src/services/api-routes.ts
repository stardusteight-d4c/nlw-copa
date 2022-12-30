export const createUser = '/createUser' // [POST -> body] {name, email, avatarUrl}
export const createPool = '/createPool' // [POST -> body] {title, ownerId}
export const getUserPools = '/usersPools' // [GET -> params] /:userId
export const searchPoolByCode = '/searchPoolByCode' // [GET -> query] ?code=<code>


