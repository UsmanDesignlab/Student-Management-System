import { Roles } from "src/constants";
import { RolesGuard } from "./auth.guards";


export function RoleGuard(...roles: Roles[]) {
  return new RolesGuard(roles);
}
