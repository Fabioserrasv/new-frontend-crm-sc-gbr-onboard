package repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;

import javax.ejb.EJB;

import model.User;

import org.dbunit.operation.DatabaseOperation;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import model.exceptions.ErrorConnectingToDatabaseException;
import model.exceptions.ErrorQueryDatabaseException;
import runner.AndorinhaTestRunner;
import runner.DatabaseHelper;

@RunWith(AndorinhaTestRunner.class)
public class TestUserRepository {

	private static final int ID_USUARIO_CONSULTA = 1;

	@EJB
	private UserRepository userRepository;

	@Before
	public void setUp() {
		DatabaseHelper.getInstance("crm_sc").execute("dataset/database_test.xml", DatabaseOperation.CLEAN_INSERT);
	}

	@Test
	public void assert_insert_user() throws ErrorConnectingToDatabaseException, ErrorQueryDatabaseException {
		User user = new User();
		user.setNome("Teste Junit 1");
		user.setCpf("56222769007");
		user.setEmail("junit1@teste.com");
		user.setDataNascimento("00-00-0001");
		user.setSenha("12345");
		user.setCrm("0000");
		this.userRepository.insert(user);

		User inserido = this.userRepository.get(user.getId());

		assertThat(user.getId()).isGreaterThan(0);

		assertThat(inserido).isNotNull();
		assertThat(inserido.getNome()).isEqualTo(user.getNome());
		assertThat(inserido.getId()).isEqualTo(user.getId());
		assertThat(inserido.getCpf()).isEqualTo(user.getCpf());
		assertThat(inserido.getCrm()).isEqualTo(user.getCrm());
		assertThat(inserido.getEmail()).isEqualTo(user.getEmail());
		assertThat(inserido.getDataNascimento()).isEqualTo(user.getDataNascimento());
	}

	@Test
	public void assert_get_user() throws ErrorConnectingToDatabaseException, ErrorQueryDatabaseException {
		User user = this.userRepository.get(ID_USUARIO_CONSULTA);

		assertThat(user).isNotNull();
		assertThat(user.getNome()).isEqualTo("Teste Junit 1");
		assertThat(user.getId()).isEqualTo(ID_USUARIO_CONSULTA);
	}

	@Test
	public void assert_update_user() throws ErrorConnectingToDatabaseException, ErrorQueryDatabaseException {
		User user = this.userRepository.get(ID_USUARIO_CONSULTA);
		user.setNome("Alterado!");

		this.userRepository.update(user);

		User alterado = this.userRepository.get(ID_USUARIO_CONSULTA);

		assertThat(alterado).isEqualToComparingFieldByField(user);
	}

	@Test
	public void assert_get_all_user()
			throws ErrorConnectingToDatabaseException, ErrorQueryDatabaseException {
		List<User> users = this.userRepository.getAll();

		assertThat(users).isNotNull()
		.isNotEmpty()
		.hasSize(2)
		.extracting("nome")
		.containsExactlyInAnyOrder("Teste Junit 1", "Teste Junit 2");
	}

}
