import javascript
import path

class APIRoute {
  private String endpoint;
  private String file;

  APIRoute(String endpoint, String file) {
    this.endpoint = endpoint;
    this.file = file;
  }

  String getEndpoint() {
    return endpoint;
  }

  String getFile() {
    return file;
  }
}

from RouterGetCall route, File file
where route.getEndpoint().startsWith("/api") and
      file.getName().endsWith(".js") and
      path.contains("api", file.getPath().getBaseName().toString())
select new APIRoute(route.getEndpoint(), file.getPath().toString())
