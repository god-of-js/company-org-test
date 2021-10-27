import { Employee, IEmployeeOrgApp, FoundSubordinate } from "./interfaces";

class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  private movedSubordinate: FoundSubordinate = {} as FoundSubordinate;

  constructor(ceo: Employee) {
    this.ceo = ceo;
  }

  move(employeeID: number, supervisorID: number): void {
    const subordinateData = this.findSubordinateById(
      employeeID,
      this.ceo
    );

    if (subordinateData) {

      const supervisorIndex = this.findSubordinateIndex(supervisorID, this.ceo.subordinates);
      const subordinateIndex = this.findSubordinateIndex(subordinateData.subordinate.uniqueId, this.ceo.subordinates, subordinateData.supervisorId);

      this.ceo.subordinates[supervisorIndex[0]].subordinates.push(subordinateData.subordinate);

      if (subordinateIndex.length > 1) {
        this.ceo.subordinates[subordinateIndex[0]].subordinates.splice(subordinateIndex[1], 1);
      } else {
        this.ceo.subordinates.splice(subordinateIndex[0], 1);
      }

      this.movedSubordinate = subordinateData;
    } else throw new Error("Subordinate does not exist.");
  }

  undo(): void {
    this.move(this.movedSubordinate.subordinate.uniqueId, this.movedSubordinate.supervisorId);
  }

  redo(): void {
    this.undo();
  }

  private findSubordinateById(id: number, employee: Employee): FoundSubordinate | null {
    for (const s of employee.subordinates) {
      if (s.uniqueId === id) return { subordinate: s, supervisorId: employee.uniqueId };

      const sub = this.findSubordinateById(id, s);

      if (sub) return sub;
    }
    return null;
  }

  private findSubordinateIndex(id: number, subordinates: Employee[], supervisorID?: number,): number[] {
    let index = subordinates.findIndex((sub) => sub.uniqueId === id);

    if (index >= 0) return [index];

    if (!supervisorID) throw new Error("Subordinate supervisor does not exist.")

    const supIndex = this.findSubordinateIndex(supervisorID, this.ceo.subordinates, supervisorID)

    const subIndex = this.findSubordinateIndex(id, subordinates[supIndex[0]].subordinates, supervisorID)

    return [...supIndex, ...subIndex];
  }
}

export default EmployeeOrgApp;
