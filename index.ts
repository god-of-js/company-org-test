import EmployeeOrgApp from "./EmployeeOrgApp";
import ceo from "./data";

const employeeOrganization = new EmployeeOrgApp(ceo);

const operations = (employeeID: number, supervisorID: number) => {
    employeeOrganization.move(employeeID, supervisorID);
    // employeeOrganization.undo();
    // employeeOrganization.redo();
}

operations(2,4);
// operations(6,5);