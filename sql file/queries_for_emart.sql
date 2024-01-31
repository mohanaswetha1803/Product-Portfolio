create database e_mart_data;

use e_mart_data;

alter user 'root'@'localhost' identified with mysql_native_password by 'mohana@1234';

create table login_credentials(id int, username varchar(30),password varchar(30));

alter table login_credentials modify id int auto_increment primary key;

insert into login_credentials values
("prakash","123"),
("satya","456"),
("satya","908"),
("rutuja","555");

select * from login_credentials;

desc login_credentials;