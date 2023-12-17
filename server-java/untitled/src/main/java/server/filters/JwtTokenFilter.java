package server.filters;
import com.sun.net.httpserver.Filter;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import controller.JwtController;
import java.io.IOException;
public class JwtTokenFilter extends Filter{

  private static final String AUTH_HEADER = "Authorization";
  private static final String AUTH_HEADER_PREFIX = "Bearer ";
  private final HttpHandler nextHandler;
  public JwtTokenFilter(HttpHandler nextHandler) {
    this.nextHandler = nextHandler;
  }

  @Override
  public void doFilter(HttpExchange exchange, Chain chain) throws IOException {
    String token = getTokenFromHeader(exchange);
    if (token != null && JwtController.isValidToken(token)) {
      nextHandler.handle(exchange);
    } else {
      sendUnauthorizedResponse(exchange);
    }
  }
  private String getTokenFromHeader(HttpExchange exchange) {
    String jwtHeader = exchange.getRequestHeaders().getFirst(AUTH_HEADER);

    if (jwtHeader != null && jwtHeader.startsWith(AUTH_HEADER_PREFIX)) {
      return jwtHeader.replace(AUTH_HEADER_PREFIX, "");
    }

    return null;
  }

  private void sendUnauthorizedResponse(HttpExchange exchange) throws IOException {
    exchange.sendResponseHeaders(401, 0);
    exchange.getResponseBody().close();
  }

  @Override
  public String description() {
    return "JWT Token Filter";
  }
}
