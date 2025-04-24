export default class APIResponse {
    /**
     * @param {number} statusCode
     * @param {any} data       
     * @param {string} [message="success"]  
     */
    constructor(statusCode,data,message = "success"){
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }
}
