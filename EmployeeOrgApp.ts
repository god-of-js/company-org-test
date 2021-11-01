import { Employee, IEmployeeOrgApp, FoundSubordinate } from "./interfaces";

class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  private movedSubordinate: FoundSubordinate = {} as FoundSubordinate;

  constructor(ceo: Employee) {
    this.ceo = ceo;
  }

  move(employeeID: number, supervisorID: number): void {
    const employeeDataToMove = this.findSubordinateById(employeeID, this.ceo);
    const newEmployeeSupervisorData = this.findSubordinateById(supervisorID, this.ceo);

    if (!employeeDataToMove || !newEmployeeSupervisorData) {
      throw new Error("Entity not found");
    }

    this.addEmployeeToSupervisor(employeeDataToMove.subordinate, newEmployeeSupervisorData.path);

    const currentSupervisorPath = employeeDataToMove.path.slice(0, -1)
    this.removeEmployeeFromSupervisor(employeeID, currentSupervisorPath);

    this.movedSubordinate = employeeDataToMove;
  }

  undo(): void {
    this.move(this.movedSubordinate.subordinate.uniqueId, this.movedSubordinate.supervisor.uniqueId);
  }

  redo(): void {
    this.move(this.movedSubordinate.subordinate.uniqueId, this.movedSubordinate.supervisor.uniqueId);
  }

  private removeEmployeeFromSupervisor(employeeId: number, path: number[]) {
    const employee = this.getEmployeeByPath(path).subordinates.find(e => e.uniqueId === employeeId);
    this.getEmployeeByPath(path).subordinates = this.getEmployeeByPath(path).subordinates.filter(e => e.uniqueId !== employeeId);
    this.getEmployeeByPath(path).subordinates.push(...employee?.subordinates || []);
  }

  private addEmployeeToSupervisor(employee: Employee, path: number[]) {
    employee.subordinates = [];
    this.getEmployeeByPath(path).subordinates.push(employee);
  }

  private getEmployeeByPath(path: number[]): Employee {
    let emp = this.ceo;

    for (const p of path) {
      emp = emp.subordinates[p];
    }

    return emp;
  }

  private findSubordinateById(id: number, employee: Employee, path: number[] = []): FoundSubordinate | null {
    if (id === 1) {
      return { subordinate: employee, supervisor: employee, path: [] }
    }

    for (let i = 0; i < employee.subordinates.length; i++) {
      const newPath = [...path, i];

      if (employee.subordinates[i].uniqueId === id) return { subordinate: employee.subordinates[i], supervisor: employee, path: newPath };

      const sub = this.findSubordinateById(id, employee.subordinates[i], newPath);

      if (sub) return sub;
    }

    return null;
  }
}

export default EmployeeOrgApp;
