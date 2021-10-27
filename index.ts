import EmployeeOrgApp from "./EmployeeOrgApp";
import ceo from "./data";

const employeeOrganization = new EmployeeOrgApp(ceo);

employeeOrganization.move(6, 4);
employeeOrganization.redo();
employeeOrganization.undo();
