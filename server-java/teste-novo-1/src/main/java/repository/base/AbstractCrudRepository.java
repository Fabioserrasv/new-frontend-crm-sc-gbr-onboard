package repository.base;

import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;

public abstract class AbstractCrudRepository<T> {

	@Resource(name = "crm_sc")
	protected DataSource ds;

	@PersistenceContext
	protected EntityManager em;

	protected Class<T> persistentClass;

	@PostConstruct
	public void init() {
		this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
				.getActualTypeArguments()[0];
	}

	public void insert(T entity) {
		this.em.persist(entity);
	}

	public T get(int id) {
		return this.em.find(this.persistentClass, id);
	}

	public void update(T entity) {
		this.em.merge(entity);
	}

	public void delete(int id) {
		T entity = this.get(id);
		this.em.remove(entity);
	}

	public List<T> getAll() {
		return this.em.createQuery("SELECT t FROM " + this.persistentClass.getName() + " t").getResultList();
	}

	protected EntityQuery<T> createEntityQuery() {
		return EntityQuery.create(this.em, this.persistentClass);
	}

	protected EntityQuery<T> createCountQuery() {
		return EntityQuery.createCount(this.em, this.persistentClass);
	}

	protected TupleQuery<T> createTupleQuery() {
		return TupleQuery.create(this.em, this.persistentClass);
	}

}
