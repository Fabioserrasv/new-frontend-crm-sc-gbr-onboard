package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import config.AppConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import model.User;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

public class JwtController {
  private static final String SECRET = AppConfig.getJwtSecret();

  public JwtController() {  }

  public User getFromToken(String token) {
    try {
      byte[] encodedKey = Base64.getEncoder().encode(SECRET.getBytes());
      Key key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "DES");

      Claims claim = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();

      String subject = claim.getSubject();

      Gson gson = new GsonBuilder().create();

      return gson.fromJson(subject, User.class);
    } catch (JsonSyntaxException ex) {
      ex.printStackTrace();
      throw ex;
    }
  }
  public String generateToken(User u, Date expirationDate) {
    String s = null;
    try {
      byte[] encodedKey = Base64.getEncoder().encode(SECRET.getBytes());
      Key key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "DES");

      // Usando o Gson para converter o objeto User em JSON
      Gson gson = new GsonBuilder().create();
      String userJson = gson.toJson(u);

      // Montando o token passando o subject, data de expiração e geração
      s = Jwts.builder()
        .signWith(SignatureAlgorithm.HS512, key)
        .setSubject(userJson)
        .setIssuedAt(new Date())
        .setExpiration(expirationDate)
        .compact();

    } catch (JsonIOException | JsonSyntaxException e) {
      e.printStackTrace();
    }
    return s;
  }

  public static boolean isValidToken(String token) {
    try {
      byte[] encodedKey = Base64.getEncoder().encode(SECRET.getBytes());
      Key key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "DES");

      Jwts.parser().setSigningKey(key).parseClaimsJws(token);

      return true;
    } catch (Exception ex) {
      return false;
    }
  }
}
