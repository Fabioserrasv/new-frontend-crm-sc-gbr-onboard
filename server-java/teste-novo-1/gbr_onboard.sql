CREATE DATABASE crm_sc;

\c crm_sc;

CREATE TABLE IF NOT EXISTS "medico" (
 "id" SERIAL PRIMARY KEY,
 "nome" VARCHAR(255) NOT NULL,
  "cpf" VARCHAR(50) NOT NULL,
  "crm" VARCHAR(50) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "senha" VARCHAR(144) NOT NULL,
  "datanascimento" VARCHAR(50) NOT NULL
);

create sequence seq_medico start with 1 increment by 1;