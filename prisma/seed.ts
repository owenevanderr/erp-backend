/* eslint-disable no-console */
import { PrismaClient, Role, WorkOrderStatus, AttendanceStatus, TransactionType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@erp.local' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@erp.local',
      password: passwordHash,
      role: Role.ADMIN,
    },
  });

  const supplier = await prisma.supplier.create({
    data: { name: 'Acme Supplies', contact: 'acme@example.com', address: '123 Supply St' },
  });

  const product = await prisma.product.create({
    data: { name: 'Widget A', sku: 'WIDGET-A', unit: 'pcs', stock: 100, lowStockThreshold: 10, supplierId: supplier.id },
  });

  const employee = await prisma.employee.create({
    data: { name: 'John Doe', position: 'Operator', salary: 5000000 },
  });

  await prisma.workOrder.create({
    data: {
      productId: product.id,
      quantity: 50,
      dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      status: WorkOrderStatus.PLANNED,
      assignedEmployeeId: employee.id,
      notes: 'Initial batch',
    },
  });

  const customer = await prisma.customer.create({
    data: { name: 'Jane Customer', email: 'jane@example.com', phone: '0800000000', address: 'Customer Rd' },
  });

  await prisma.transaction.createMany({
    data: [
      { type: TransactionType.CASH_IN, amount: 1500000, description: 'Initial sale', customerId: customer.id },
      { type: TransactionType.CASH_OUT, amount: 500000, description: 'Material purchase' },
    ],
  });

  await prisma.attendance.create({
    data: { employeeId: employee.id, date: new Date(), status: AttendanceStatus.PRESENT },
  });

  await prisma.payroll.create({
    data: { employeeId: employee.id, baseSalary: 5000000, deductions: 500000, netSalary: 4500000, month: new Date().getMonth() + 1, year: new Date().getFullYear() },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });




