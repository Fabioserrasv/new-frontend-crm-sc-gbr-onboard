package dao;
import dao.base.AbstractBaseDAO;
import model.User;

public class UserDAO extends AbstractBaseDAO<User> {

  public User login(String email, String password) {
    try {
      return super.em.createQuery("SELECT u FROM User u WHERE u.email = :email and u.senha = :password", User.class)
        .setParameter("email", email)
        .setParameter("password", password)
        .getSingleResult();
    }
    catch (Exception ex) {
      System.out.println(ex.getMessage());
      return null;
    }
  }
}
