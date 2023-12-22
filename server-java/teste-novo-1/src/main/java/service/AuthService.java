package service;

import java.util.Calendar;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import model.User;
import model.dto.AuthDTO;
import repository.JwtRepository;
import repository.UserRepository;

@Path("/auth")
public class AuthService {

  @EJB
  UserRepository userRepository;

  @Inject
  JwtRepository jwtRepository;

  @POST
  @Path("/login")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response login(AuthDTO data) {
    User user = this.userRepository.login(data.getEmail(), data.getPassword());

    if (user != null) {
      Calendar expiration = Calendar.getInstance();
      expiration.add(Calendar.HOUR_OF_DAY, 3);

      String jwt = this.jwtRepository.generateToken(user, expiration.getTime());

      return Response.ok(user).header("x-token", jwt).build();
    } else {
      return Response.status(Status.UNAUTHORIZED).build();
    }
  }

}
