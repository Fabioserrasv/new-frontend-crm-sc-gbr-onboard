package server;

import com.sun.net.httpserver.HttpServer;
import controller.AuthController;
import controller.UserController;

import java.io.IOException;
import java.net.InetSocketAddress;

public class HttpServerApp {

    public HttpServerApp() {
      UserController userController = new UserController();
      AuthController authController = new AuthController();
  }

  public static void main(String[] args) throws IOException {
    int serverPort = 8000;

    HttpServer server = HttpServer.create(new InetSocketAddress(serverPort), 0);

    Router router = new Router();

    AuthController authController = new AuthController();
    UserController userController = new UserController();

    router.addRoute("/auth/login", "POST", authController::login, false);
    router.addRoute("/users", "GET", userController::getAllUsers, true);
    router.addRoute("/users/create", "POST", userController::createUser, true);

    server.createContext("/", router::handle);

    server.setExecutor(null);

    server.start();
    System.out.println("Server started on port " + serverPort);
  }
}
