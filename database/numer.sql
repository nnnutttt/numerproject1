ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'thagkwar783';
CREATE DATABASE inputlinear_re;

use inputlinear_re;

CREATE TABLE inputlinear_re.lineardata (
    `id` int not null AUTO_INCREMENT,
    `alldata` varchar(10000) not null,
    `num` int not null,
    primary key (id)
);

INSERT INTO inputlinear_re.lineardata(`id`,`alldata`,`num`)
value (1,'{"numgen":9,"x":[10,15,20,30,40,50,60,70,80],"y":[5,9,15,18,22,30,35,38,43]}', 9), (2,'{"numgen":9,"x":[5,15,20,30,40,50,60,70,80],"y":[5,9,15,18,22,30,35,38,43]}', 9);
