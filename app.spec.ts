import EmployeeOrgApp from "./EmployeeOrgApp";
import ceo from "./data";

test("expect employee to not exist in previous superior after moved", () => {
    const employeeOrganization = new EmployeeOrgApp({...ceo});

    employeeOrganization.move(2, 4);

    expect(employeeOrganization.ceo.subordinates.find(sub => sub.uniqueId === 2)).toBeUndefined()
});

test("expect employee to exist in new superior after moved", () => {
    const employeeOrganization = new EmployeeOrgApp({...ceo});
    employeeOrganization.move(2, 5);

    const newSuperior = employeeOrganization.ceo.subordinates.find(employee => employee.uniqueId === 5);
    const indexOfEmployee = newSuperior?.subordinates.findIndex(employee => employee.uniqueId === 2);

    expect(indexOfEmployee).not.toEqual(-1);
});

test("expect undo to return the employee to former position", () => {
    const employeeOrganization = new EmployeeOrgApp({...ceo});
    employeeOrganization.move(2, 5);
    employeeOrganization.undo();
    const indexOfEmployee = employeeOrganization.ceo.subordinates.findIndex(employee => employee.uniqueId === 2);

    expect(indexOfEmployee).not.toEqual(-1);
});

test("expect redo to place the employee in the previously placed position", () => {
    const employeeOrganization = new EmployeeOrgApp({...ceo});
    employeeOrganization.move(2, 5);
    employeeOrganization.undo();
    employeeOrganization.redo();

    const newSuperior = employeeOrganization.ceo.subordinates.find(employee => employee.uniqueId === 5);
    const indexOfEmployee = newSuperior?.subordinates.findIndex(employee => employee.uniqueId === 2);

    expect(indexOfEmployee).not.toEqual(-1);
});

test("expect subordinate to not exist in the previous position after redo.", () => {
    const employeeOrganization = new EmployeeOrgApp({...ceo});
    employeeOrganization.move(2, 5);
    employeeOrganization.undo();
    employeeOrganization.redo();

    const indexOfEmployee = employeeOrganization.ceo.subordinates.findIndex(employee => employee.uniqueId === 2);

    expect(indexOfEmployee).toEqual(-1);
});
