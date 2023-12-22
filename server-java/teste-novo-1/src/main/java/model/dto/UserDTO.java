package model.dto;

public class UserDTO {

  private int id;
  private String nome;
  private String cpf;
  private String crm;
  private String email;
  private String dataNascimento;

  public UserDTO(){
    super();
  }

  public UserDTO(int id, String nome, String cpf, String crm, String email, String dataNascimento) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.crm = crm;
    this.email = email;
    this.dataNascimento = dataNascimento;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  public String getCrm() {
    return crm;
  }

  public void setCrm(String crm) {
    this.crm = crm;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getDataNascimento() {
    return dataNascimento;
  }

  public void setDataNascimento(String dataNascimento) {
    this.dataNascimento = dataNascimento;
  }
}
