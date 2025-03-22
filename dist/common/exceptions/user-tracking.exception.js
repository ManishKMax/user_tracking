"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTrackingException = void 0;
const common_1 = require("@nestjs/common");
class UserTrackingException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.UserTrackingException = UserTrackingException;
//# sourceMappingURL=user-tracking.exception.js.map