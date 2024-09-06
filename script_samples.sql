CREATE
DATABASE db_samples;

USE
db_samples;

CREATE TABLE samples
(
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(100),
    description VARCHAR(250)
);

INSERT INTO samples (title, description)
VALUES ("Titulo 01", "Descripcion del texto 01"),
       ("Titulo 02", "Descripcion del texto 02"),
       ("Titulo 03", "Descripcion del texto 03"),
       ("Titulo 04", "Descripcion del texto 04"),
       ("Titulo 05", "Descripcion del texto 05");