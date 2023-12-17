package controller;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import controller.base.BaseController;
import model.User;
import service.UserService;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

public class UserController extends BaseController {

  private final UserService userService;
  private final Gson gson;
  public UserController() {
    this.userService = new UserService(); //
    this.gson = new Gson();
  }

  public void getAllUsers(HttpExchange exchange) throws IOException {
    List<User> users = userService.getAllUsers();

    String usersJson = this.gson.toJson(users);

    sendResponse(exchange, usersJson);
  }

  public void createUser(HttpExchange exchange) throws IOException {
    try{
      InputStream requestBody = exchange.getRequestBody();

      InputStreamReader reader = new InputStreamReader(requestBody);
      User newUser = this.gson.fromJson(reader, User.class);

      userService.createUser(newUser);

      sendResponse(exchange, "{\"message\": \"ok.\"}");
    }catch (Exception e){
      System.out.println(e.getMessage());
    }
  }

  /*public void getUserById(HttpExchange exchange, int userId) throws IOException {
    User user = userService.getUserById(userId);

    String jsonResponse = (user != null) ? this.gson.toJson(user) : "{\"message\": \"Usuário não encontrado.\"}";

    sendResponse(exchange, jsonResponse);
  }*/
}
