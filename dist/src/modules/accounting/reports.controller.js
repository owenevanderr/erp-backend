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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReportsController = class ReportsController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async incomeStatement(month, year) {
        const where = {
            AND: [
                month ? { date: { gte: new Date(Number(year), Number(month) - 1, 1) } } : {},
                month ? { date: { lt: new Date(Number(year), Number(month), 1) } } : {},
            ],
        };
        const cashIn = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: Object.assign(Object.assign({}, (where || {})), { type: 'CASH_IN' }) });
        const cashOut = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: Object.assign(Object.assign({}, (where || {})), { type: 'CASH_OUT' }) });
        const revenue = Number(cashIn._sum.amount || 0);
        const expenses = Number(cashOut._sum.amount || 0);
        return { revenue, expenses, profit: revenue - expenses };
    }
    async cashFlow(year) {
        const out = [];
        for (let m = 1; m <= 12; m++) {
            const start = new Date(Number(year), m - 1, 1);
            const end = new Date(Number(year), m, 1);
            const cashIn = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_IN', date: { gte: start, lt: end } } });
            const cashOut = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_OUT', date: { gte: start, lt: end } } });
            out.push({ month: m, net: Number(cashIn._sum.amount || 0) - Number(cashOut._sum.amount || 0) });
        }
        return out;
    }
    async balanceOverview() {
        const cashIn = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_IN' } });
        const cashOut = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_OUT' } });
        return { cash: Number(cashIn._sum.amount || 0) - Number(cashOut._sum.amount || 0) };
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('income-statement'),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "incomeStatement", null);
__decorate([
    (0, common_1.Get)('cash-flow'),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "cashFlow", null);
__decorate([
    (0, common_1.Get)('balance-overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "balanceOverview", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('accounting/reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('accounting/reports'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map