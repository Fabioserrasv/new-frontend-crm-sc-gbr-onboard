package server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import server.filters.JwtTokenFilter;

public class Router {
  private final Map<String, HttpHandler> routes;

  public Router() {
    this.routes = new HashMap<>();
  }
  private String getTokenFromHeader(HttpExchange exchange) {
    String jwtHeader = exchange.getRequestHeaders().getFirst("Authorization");

    if (jwtHeader != null && jwtHeader.startsWith("Bearer ")) {
      return jwtHeader.replace("Bearer ", "");
    }

    return null;
  }
  public void addRoute(String path, String method, HttpHandler handler, boolean requiresJwtToken) {
    if (requiresJwtToken) {
      this.routes.put(method + ":" + path, exchange -> new JwtTokenFilter(handler).doFilter(exchange, null));
    } else {
      this.routes.put(method + ":" + path, handler);
    }
  }

  public void handle(HttpExchange exchange) throws IOException {
    exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
    exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "*");
    exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "*");
    exchange.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");

    if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
      exchange.sendResponseHeaders(200, -1);
      return;
    }

    String path = exchange.getRequestURI().getPath();
    String method = exchange.getRequestMethod();

    HttpHandler handler = routes.get(method + ":" + path);
    if (handler != null) {
      handler.handle(exchange);
    } else {
      exchange.sendResponseHeaders(404, 0);
      exchange.close();
    }
  }
}
