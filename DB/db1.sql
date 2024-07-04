create  database movies_cac;

use movies_cac;

create table peliculas (
id int not null auto_increment primary key,
titulo varchar(50),
fecha_lanzamiento date,
genero varchar(15),
duracion varchar(15),
director varchar(15),
reparto varchar(15),
sinopsis varchar(15),
imagen varchar(15)
);


insert into peliculas values (null,'Rambo 1', now(),'Accion','1H 33m','Juan Jose Campanella','Varios Actores','Esta muy buena',null);
insert into peliculas values (null,'Rambo 2', now(),'Accion','1H 40m','Juan Jose Campanella','Varios Actores','Esta muy buena',null);
insert into peliculas values (null,'Rambo 3', now(),'Accion','1H 50m','Juan Jose Campanella','Varios Actores','Esta muy buena',null);
insert into peliculas values (null,'TMNT', now(),'Accion','1H 50m','ni idea','Varios Actores','Esta muy buena',null);
insert into peliculas values (null,'TMNT 2', now(),'Accion','1H 50m','ni idea','Varios Actores','Esta muy buena',null);
insert into peliculas values (null,'TMNT 3', now(),'Accion','1H 50m','ni idea','Varios Actores','Esta muy buena',null);

