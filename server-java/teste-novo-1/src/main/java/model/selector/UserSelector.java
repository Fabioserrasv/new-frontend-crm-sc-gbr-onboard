package model.selector;

public class UserSelector extends AbstractBaseSelector {

	private Integer id;
	private String nome;
	private String cpf;
	private String crm;
	private String email;
	private String dataNascimento;
	
	public boolean hasFilter() {
		
		if(this.id != null) {
			return true;
		}
		
		if(this.nome != null && !this.nome.trim().isEmpty()) {
			return true;
		}
		
		if(this.cpf != null && !this.cpf.trim().isEmpty()) {
			return true;
		}
		
		if(this.crm != null && !this.crm.trim().isEmpty()) {
			return true;
		}
		
		if(this.email != null && !this.email.trim().isEmpty()) {
			return true;
		}
		
		
		if(this.dataNascimento != null && !this.dataNascimento.trim().isEmpty()) {
			return true;
		}
		
		if(this.nome != null && !this.nome.trim().isEmpty()) {
			return true;
		}
		
		return false;
	}
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
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
