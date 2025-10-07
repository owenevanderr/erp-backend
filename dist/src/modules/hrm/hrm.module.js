"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrmModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const employees_service_1 = require("./employees.service");
const employees_controller_1 = require("./employees.controller");
const attendance_controller_1 = require("./attendance.controller");
const payroll_controller_1 = require("./payroll.controller");
let HrmModule = class HrmModule {
};
exports.HrmModule = HrmModule;
exports.HrmModule = HrmModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [employees_service_1.EmployeesService],
        controllers: [employees_controller_1.EmployeesController, attendance_controller_1.AttendanceController, payroll_controller_1.PayrollController],
    })
], HrmModule);
//# sourceMappingURL=hrm.module.js.map