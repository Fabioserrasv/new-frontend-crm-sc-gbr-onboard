package model;

import java.security.Principal;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import net.bytebuddy.implementation.bytecode.ByteCodeAppender.Size;

@Entity
@Table(name = "medico")
public class User implements Principal {
  @Id
  @SequenceGenerator(name = "seq_medico", sequenceName = "seq_medico", initialValue = 1, allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "seq_medico")
  @Column(name = "id")
  private int id;

  @Column(name = "nome")
  private String nome;

  @Column(name = "cpf")
  private String cpf;

  @Column(name = "crm")
  private String crm;

  @Column(name = "email")
  private String email;

  @Column(name = "senha")
  private String senha;

  @Column(name = "dataNascimento")
  private String dataNascimento;

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

  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
  }

  public String getDataNascimento() {
    return dataNascimento;
  }

  public void setDataNascimento(String dataNascimento) {
    this.dataNascimento = dataNascimento;
  }

  @Override
  public String toString() {
    return "User{" +
        "id=" + id +
        ", nome='" + nome + '\'' +
        ", cpf='" + cpf + '\'' +
        ", crm='" + crm + '\'' +
        ", email='" + email + '\'' +
        ", senha='" + senha + '\'' +
        ", dataNascimento='" + dataNascimento + '\'' +
        '}';
  }

  @JsonIgnore
  @Override
  public String getName() {
    return this.email;
  }
}
