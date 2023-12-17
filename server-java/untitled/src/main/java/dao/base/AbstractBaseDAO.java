package dao.base;

import javax.persistence.*;
import java.lang.reflect.ParameterizedType;
import java.util.List;

public abstract class AbstractBaseDAO<T> {

  @PersistenceContext
  protected EntityManager em;
  private final EntityManagerFactory entityManagerFactory;

  protected Class<T> persistentClass;

  public AbstractBaseDAO() {
    this.entityManagerFactory = Persistence.createEntityManagerFactory("myPersistenceUnit");
    init();
  }

  public void init() {
    this.em = entityManagerFactory.createEntityManager();
    this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
  }

  public void insert(T entity) {
    EntityTransaction transaction = this.em.getTransaction();

    transaction.begin();
    this.em.persist(entity);
    transaction.commit();
  }

  public void update(T entity) {
    this.em.merge(entity);
  }

  public T get(int id) {
    return this.em.find(this.persistentClass, id);
  }

  public void delete(int id) {
    T entity = this.get(id);
    this.em.remove(entity);
  }

  public List<T> getAll() {
    return this.em.createQuery("select t from " + this.persistentClass.getName() + " t").getResultList();
  }
}
