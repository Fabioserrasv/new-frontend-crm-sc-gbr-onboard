package service;

import dao.UserDAO;
import model.User;

import java.util.List;

public class UserService {

  private final UserDAO userDAO;

  public UserService() {
    this.userDAO = new UserDAO();
  }

  public List<User> getAllUsers() {

    return userDAO.getAll();
  }

  public void createUser(User user) {
    userDAO.insert(user);
  }

  public User getUserById(int userId) {
    return userDAO.get(userId);
  }

  public void updateUser(User user) {
    userDAO.update(user);
  }

  public void deleteUser(int userId) {
    userDAO.delete(userId);
  }
}
