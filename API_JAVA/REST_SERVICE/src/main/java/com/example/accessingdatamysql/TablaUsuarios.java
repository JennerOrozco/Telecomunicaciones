package com.example.accessingdatamysql;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class TablaUsuarios {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)	
	private Integer ID;

	private String Usuarios;
	private String Nombre;
	private String Apellido;
	private Integer Estado;
	private String Correo;
	private String Password;
	private Integer Rol_ID;
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public String getUsuarios() {
		return Usuarios;
	}
	public void setUsuarios(String usuarios) {
		Usuarios = usuarios;
	}
	public String getNombre() {
		return Nombre;
	}
	public void setNombre(String nombre) {
		Nombre = nombre;
	}
	public String getApellido() {
		return Apellido;
	}
	public void setApellido(String apellido) {
		Apellido = apellido;
	}
	public Integer getEstado() {
		return Estado;
	}
	public void setEstado(Integer estado) {
		Estado = estado;
	}
	public String getCorreo() {
		return Correo;
	}
	public void setCorreo(String correo) {
		Correo = correo;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public Integer getRol_ID() {
		return Rol_ID;
	}
	public void setRol_ID(Integer rol_ID) {
		Rol_ID = rol_ID;
	}
	


}
