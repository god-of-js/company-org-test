import EmployeeOrgApp from "./EmployeeOrgApp";
import ceo from "./data";

const employeeOrganization = new EmployeeOrgApp(ceo);

employeeOrganization.move(2, 4);
employeeOrganization.undo();
employeeOrganization.redo();
