import java

class RESTEndpoint {
  private String endpoint;
  
  RESTEndpoint(String endpoint) {
    this.endpoint = endpoint;
  }
  
  String getEndpoint() {
    return endpoint;
  }
}

class RESTEndpointCall {
  private RESTEndpoint endpoint;
  private String httpMethod;
  
  RESTEndpointCall(RESTEndpoint endpoint, String httpMethod) {
    this.endpoint = endpoint;
    this.httpMethod = httpMethod;
  }
  
  RESTEndpoint getEndpoint() {
    return endpoint;
  }
  
  String getHTTPMethod() {
    return httpMethod;
  }
}

from Method m, Annotation a, RESTEndpoint endpoint
where a.getType().getName().matches("^.*Path$")
and m.getAnnotations().contains(a)
select new RESTEndpoint(a.getValue().toString())

from RESTEndpoint endpoint, Method m, Annotation a
where m.getAnnotations().contains(a)
and a.getType().getName().matches("^.*(Get|Post|Put|Delete)Mapping$")
select new RESTEndpointCall(endpoint, a.getType().getName().substring(0, a.getType().getName().indexOf("Mapping")))
