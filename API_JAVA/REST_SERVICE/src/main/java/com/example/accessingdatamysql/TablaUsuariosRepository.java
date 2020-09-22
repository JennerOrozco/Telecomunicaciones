package com.example.accessingdatamysql;

import org.springframework.data.repository.CrudRepository;

import com.example.accessingdatamysql.TablaUsuarios;


public interface TablaUsuariosRepository extends CrudRepository<TablaUsuarios, Integer> {

}
