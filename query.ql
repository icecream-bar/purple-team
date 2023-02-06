import javascript

class RouteCall extends Call {
  RouteCall() {
    super(this.getMethod().getName() == "get" and
          this.getMethod().getDeclaringType().getName().endsWith("Router"));
  }
}

class Route extends RouteCall {
  Route() {
    super(this.getMethod().getFirstArgument().asStringLiteral().getValue().startsWith("/api/"));
  }
}

query routeCalls {
  Route.all().map(rc => rc.getMethod().getFirstArgument().asStringLiteral().getValue())
}
