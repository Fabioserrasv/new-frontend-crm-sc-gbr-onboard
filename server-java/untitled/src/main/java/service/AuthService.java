package service;

import dao.UserDAO;
import model.User;

public class AuthService {
  private final UserDAO userDAO;

  public AuthService() {
    this.userDAO = new UserDAO();
  }

  public User login(String email, String password){
    return userDAO.login(email, password);
  }

}
