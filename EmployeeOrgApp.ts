import { Employee, IEmployeeOrgApp } from "./interfaces";

class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;

  constructor(ceo: Employee) {
    this.ceo = ceo;
  }

  move(employeeID: number, supervisorID: number): void {
    const subordinate = this.findSubordinateById(
      employeeID,
      this.ceo.subordinates
    );
    console.log(subordinate);
  }

  undo(): void {
    throw new Error("Method not implemented.");
  }

  redo(): void {
    throw new Error("Method not implemented.");
  }

  private findSubordinateById(id: number, subordinates: Employee[]): Employee {
    let sub = subordinates.find((sub) => sub.uniqueId === id);

    if (sub) return sub;

    for (const s of subordinates) {
      if (s.subordinates.length) {
        sub = this.findSubordinateById(id, s.subordinates);
      }
      continue;
    }

    if (!sub) throw new Error("subordinate not found");

    return sub;
  }
}

export default EmployeeOrgApp;
