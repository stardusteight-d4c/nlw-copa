export const createUser = '/createUser' // [POST -> body] {name, email, avatarUrl}
export const createPool = '/createPool' // [POST -> body] {title, ownerId}
export const getUserPools = '/usersPools' // [GET -> params] /:userId
export const poolByCode = '/poolByCode' // [GET -> query] ?code=<code>
export const createGuess = '/createGuess' // [POST -> body] {firstTeam, firstTeamScore, secondTeam, secondTeamScore, date, poolId, userId}
export const guessesByPoolId = '/guessesByPoolId' // [GET -> query] ?poolId=<poolId>
