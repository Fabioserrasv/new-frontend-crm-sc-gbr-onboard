package repository;

import java.util.List;

import javax.ejb.Stateless;

import model.User;
import model.dto.UserDTO;
import model.exceptions.ErrorConnectingToDatabaseException;
import model.exceptions.ErrorQueryDatabaseException;
import model.selector.UserSelector;
import repository.base.AbstractCrudRepository;

@Stateless
public class UserRepository extends AbstractCrudRepository<User> {

	public User login(String email, String password) {
		try {
			User user = super.em
					.createQuery("SELECT u FROM User u WHERE u.email = :email AND u.senha = :password", User.class)
					.setParameter("email", email)
					.setParameter("password", password)
					.getSingleResult();
			return user;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	public Long count(UserSelector selector) {
		return super.createCountQuery()
				.equal("u.id", selector.getId())
				.equal("u.nome", selector.getNome())
				.equal("u.cpf", selector.getCpf())
				.equal("u.crm", selector.getCrm())
				.equal("u.email", selector.getEmail())
				.equal("u.dataNascimento", selector.getDataNascimento())
				.setFirstResult(selector.getOffset())
				.setMaxResults(selector.getLimit())
				.count();
	}

	public List<User> search(UserSelector selector)
			throws ErrorConnectingToDatabaseException, ErrorQueryDatabaseException {

		return super.createEntityQuery()
				.equal("u.id", selector.getId())
				.equal("u.nome", selector.getNome())
				.equal("u.cpf", selector.getCpf())
				.equal("u.crm", selector.getCrm())
				.equal("u.email", selector.getEmail())
				.equal("u.datanascimento", selector.getDataNascimento())
				.setFirstResult(selector.getOffset())
				.setMaxResults(selector.getLimit())
				.list();

	}

	public List<UserDTO> searchDTO(UserSelector selector)
			throws ErrorConnectingToDatabaseException, ErrorQueryDatabaseException {
		return super.createTupleQuery()
				.select("id", "nome", "cpf", "crm", "email", "datanascimento")
				.equal("u.id", selector.getId())
				.equal("u.nome", selector.getNome())
				.equal("u.cpf", selector.getCpf())
				.equal("u.crm", selector.getCrm())
				.equal("u.email", selector.getEmail())
				.equal("u.datanascimento", selector.getDataNascimento())
				.list(UserDTO.class);
	}

}
