import javascript

class RouteDefinition {
  string path;
  string component;
}

RouteDefinition routeDef(CallExpr callExpr) {
  // Look for a call to `React.createElement`
  if (!callExpr.getCallee().matchesQualifiedName("React.createElement")) {
    return null;
  }

  // Get the component that is being rendered
  Expr component = callExpr.getArgument(0);
  if (!(component instanceof MemberExpr)) {
    return null;
  }

  // Get the props object that is being passed to the component
  Expr props = callExpr.getArgument(1);
  if (!(props instanceof ObjectLiteral)) {
    return null;
  }

  // Extract the path and component name from the props object
  string path = null;
  string componentName = null;
  for (Property prop : ((ObjectLiteral) props).getProperties()) {
    if (prop.getKey().matchesString("path")) {
      path = prop.getValue().asStringLiteral().getValue();
    } else if (prop.getKey().matchesString("component")) {
      componentName = prop.getValue().asMemberExpr().getMember().getName();
    }
  }

  // Return the extracted path and component
  if (path != null && componentName != null) {
    return new RouteDefinition(path, componentName);
  }
  return null;
}

query {
  for (CallExpr callExpr : javascript.callExpressions(RouteDefinition.routeDef)) {
    RouteDefinition route = RouteDefinition.routeDef(callExpr);
    route.path
    route.component
  }
}