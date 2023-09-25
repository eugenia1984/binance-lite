/* URLs*/

// To register a new user 
export const URL_REGISTER = "https://binance-production.up.railway.app/api/v1/users/register"

// To login in the app with email or telephone and password
export const URL_LOGIN= "https://binance-production.up.railway.app/api/v1/auth/login"

// To find a crypto currency by uuid, need to add '/id'
export const URL_GET_CURRENCY_BY_ID = "https://binance-production.up.railway.app/api/v1/cryptocurrencies"

// To get the list of all the cryptocurrencies
export const URL_GET_ALL_CRIPTOCURRENCIES = "https://binance-production.up.railway.app/api/v1/cryptocurrencies"

// To get the favorites cryptocurrencies by user id
// The complete URL is'https://binance-production.up.railway.app/api/v1/user-favorites/list-favorites/{userID}'
// '/userID', is the user id
export const URL_GET_FAVORITES_BY_USERID = "https://binance-production.up.railway.app/api/v1/user-favorites/list-favorites"

// To update the favorites cryptocurrencies by user id
// The complete URL is 'https://binance-production.up.railway.app/api/v1/user-favorites/{userID}'
// 'userID', the user id
export const URL_POST_FAVORITES_BY_USERID = "https://binance-production.up.railway.app/api/v1/user-favorites"

// To delete a favorite, the complete URL is ' https://binance-production.up.railway.app/api/v1/user-favorites/delete/{useId}/{cryptoId}', need to add:
// 'userID', the user id
// 'cryptoId', the cryptocurrency id
export const URL_DELETE_FAVORITE_BY_USEDI = "https://binance-production.up.railway.app/api/v1/user-favorites/delete"