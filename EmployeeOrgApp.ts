import { Employee, IEmployeeOrgApp, FoundSubordinate, FoundSubordinateIndex } from "./interfaces";

class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  private movedSubordinate: FoundSubordinate = {} as FoundSubordinate;

  constructor(ceo: Employee) {
    this.ceo = ceo;
  }

  move(employeeID: number, supervisorID: number): void {
    const subordinateData = this.findSubordinateById(
      employeeID,
      this.ceo.subordinates,
      this.ceo.uniqueId
    );

    const supervisorIndexData = this.findSubordinateIndex(supervisorID)
    const subordinateIndexData = this.findSubordinateIndex(employeeID)

    if (subordinateData) {
      this.ceo.subordinates[supervisorIndexData.index].subordinates.push(subordinateData.subordinate);
      this.ceo.subordinates.splice(subordinateIndexData.index, 1);
      this.movedSubordinate = subordinateData;
      console.log(this.ceo.subordinates);
    }
  }

  undo(): void {
    this.move(this.movedSubordinate.subordinate.uniqueId, this.movedSubordinate.supervisorId);
  }

  redo(): void {
    this.undo();
  }

  private findSubordinateById(id: number, subordinates: Employee[], supervisorId: number): FoundSubordinate | null {
    for (const s of subordinates) {
      if (s.uniqueId === id) return { subordinate: s, supervisorId };

      const sub = this.findSubordinateById(id, s.subordinates, s.uniqueId);

      if (sub) return sub;
    }
    return null;
  }

  private findSubordinateIndex(id: number): FoundSubordinateIndex {
    let index = this.ceo.subordinates.findIndex((sub) => sub.uniqueId === id);

    if (index >= 0) return { id, index };

    return { id, index }
  }
}

export default EmployeeOrgApp;
