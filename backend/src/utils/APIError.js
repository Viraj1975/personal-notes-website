export default class APIError extends Error {
    /**
     * @param {number} statusCode HTTP status code
     * @param {string} message Error message
     * @param {Array<any>} [errors] Optional array of detailed errors
     */

    constructor(statusCode,message = "Something went wrong",errors = []) {
        super(message);
    
        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
        this.errors = errors;

        Error.captureStackTrace(this,this.constructor);
    }
}