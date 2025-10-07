"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../../prisma/prisma.service");
let PayrollController = class PayrollController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    list(employeeId, month, year) {
        return this.prisma.payroll.findMany({
            where: {
                employeeId: employeeId || undefined,
                month: month ? Number(month) : undefined,
                year: year ? Number(year) : undefined,
            },
            orderBy: [{ year: 'desc' }, { month: 'desc' }],
        });
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "list", null);
exports.PayrollController = PayrollController = __decorate([
    (0, swagger_1.ApiTags)('hrm/payroll'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('hrm/payroll'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map