import { UseBefore } from "@tsed/common";
import { StoreSet, useDecorators } from "@tsed/core";
import { AcceptRolesMiddleware } from "../middlewares/AcceptRolesMiddleware";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function AcceptRoles(...roles: string[]) {
  return useDecorators(
    UseBefore(AcceptRolesMiddleware),
    StoreSet(AcceptRolesMiddleware, roles)
  );
}
