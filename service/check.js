
module.exports = class CheckSomething {
    checkNull(value){
        if (value === "" || value === null || value === undefined || value === "undefined" || value === "null") {
            return false;
        } else {
            return true;
        }
    }
}