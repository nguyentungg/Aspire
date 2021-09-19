import { EndpointInfo, Middleware, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";

@Middleware()
export class AcceptRolesMiddleware {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  use(@Req() request: Req, @EndpointInfo() endpoint: EndpointInfo) {
    if (request.user && request.isAuthenticated()) {
      // console.log("hihi " + request.user.type);
      const roles = endpoint.get(AcceptRolesMiddleware);
      // console.log(roles);
      if (!roles.includes(request.user.type)) {
        throw new Unauthorized("Insufficient role");
      }
    }
  }
}
