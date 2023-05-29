-- Table: figuritas.album

-- DROP TABLE IF EXISTS figuritas.album;

CREATE TABLE IF NOT EXISTS figuritas.album
(
    id integer NOT NULL DEFAULT nextval('figuritas.album_id_seq'::regclass),
    nombre character varying COLLATE pg_catalog."default",
    imagen text COLLATE pg_catalog."default",
    CONSTRAINT album_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS figuritas.album
    OWNER to postgres;

    -- Table: figuritas.figuritas

-- DROP TABLE IF EXISTS figuritas.figuritas;

CREATE TABLE IF NOT EXISTS figuritas.figuritas
(
    id integer NOT NULL DEFAULT nextval('figuritas.figuritas_id_seq'::regclass),
    nombre character varying COLLATE pg_catalog."default",
    imagen text COLLATE pg_catalog."default",
    tengo boolean,
    cantidad integer,
    categoria integer,
    CONSTRAINT figuritas_pkey PRIMARY KEY (id),
    CONSTRAINT categoria FOREIGN KEY (categoria)
        REFERENCES figuritas.album (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS figuritas.figuritas
    OWNER to postgres;

    -- Table: figuritas.usuario

-- DROP TABLE IF EXISTS figuritas.usuario;

CREATE TABLE IF NOT EXISTS figuritas.usuario
(
    id integer NOT NULL DEFAULT nextval('figuritas.usuario_id_seq'::regclass),
    nombre character varying COLLATE pg_catalog."default",
    user_name character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    album_id integer,
    CONSTRAINT usuario_pkey PRIMARY KEY (id),
    CONSTRAINT "album_id FK" FOREIGN KEY (album_id)
        REFERENCES figuritas.album (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS figuritas.usuario
    OWNER to postgres;