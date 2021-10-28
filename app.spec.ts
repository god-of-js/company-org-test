import EmployeeOrgApp from "./EmployeeOrgApp";
import ceo from "./data";

test("expect employee to not exist in previous superior", () => {
    const employeeOrganization = new EmployeeOrgApp({...ceo});

    employeeOrganization.move(2, 4);

    expect(employeeOrganization.ceo.subordinates.find(sub => sub.uniqueId === 2)).toBeUndefined()
});

test("expect employee to exist in new superior", () => {
    const employeeOrganization = new EmployeeOrgApp({...ceo});
    employeeOrganization.move(2, 5);

    const newSuperior = employeeOrganization.ceo.subordinates.find(employee => employee.uniqueId === 4);
    const indexOfEmployee = newSuperior?.subordinates.findIndex(employee => employee.uniqueId === 2);

    expect(indexOfEmployee).not.toEqual(-1);
});
