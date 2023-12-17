package controller;

import com.google.gson.Gson;
import com.sun.net.httpserver.HttpExchange;
import controller.base.BaseController;
import model.User;
import model.dto.AuthDTO;
import service.AuthService;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Calendar;

public class AuthController extends BaseController {
  private final AuthService authService;
  private final JwtController jwtController;
  private final Gson gson;

  public AuthController() {
    this.jwtController = new JwtController();
    this.authService = new AuthService(); //
    this.gson = new Gson();
  }

  public void login(HttpExchange exchange) throws IOException {
    try{
      InputStream requestBody = exchange.getRequestBody();

      InputStreamReader reader = new InputStreamReader(requestBody);
      AuthDTO authData = this.gson.fromJson(reader, AuthDTO.class);

      User user = authService.login(authData.getEmail(), authData.getPassword());

      if (user != null) {
        Calendar tokenExpiration = Calendar.getInstance();
        tokenExpiration.add(Calendar.HOUR_OF_DAY, 3);

        String jwt = this.jwtController.generateToken(user, tokenExpiration.getTime());

        String resp = this.gson.toJson(user);
        resp = resp.replace("}", ",\n\"token\": \""+jwt+"\"}");
        sendResponseWithJwtToken(exchange, resp, jwt);
      }
    }catch (Exception e){
      System.out.println(e.getMessage());
    }

  }
}
