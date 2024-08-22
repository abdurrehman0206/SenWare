/**
 *Publically accessible routes
 *Do not need user to be logged in
 *@type {string[]}
 */
export const publicRoutes: string[] = [];

/**
 *Authentication routes
 *Routes for authentication
 *@type {string[]}
 */
export const authRoutes: string[] = ["/login", "/register"];

/**
 *Auth routes api prefix
 *Routes starting with this are used for API authentication
 *@type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 *Default redirect for logged in users
 *@type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";
