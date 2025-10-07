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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../../prisma/prisma.service");
let DashboardController = class DashboardController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async summary() {
        var _a, _b;
        const [lowStockCount, activeWorkOrders, cashInAgg, cashOutAgg] = await Promise.all([
            this.prisma.$queryRawUnsafe('SELECT COUNT(1)::bigint as count FROM "Product" WHERE "stock" < "lowStockThreshold"'),
            this.prisma.workOrder.count({ where: { status: { in: ['PLANNED', 'IN_PROGRESS'] } } }),
            this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_IN' } }),
            this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_OUT' } }),
        ]);
        const low = Number(((_b = (_a = lowStockCount[0]) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0));
        const cash = Number(cashInAgg._sum.amount || 0) - Number(cashOutAgg._sum.amount || 0);
        return { lowStockCount: low, activeWorkOrders, cash };
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "summary", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map