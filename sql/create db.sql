# DB명 = safty_helmet
# user = helmet_admin
# pw = helmet1234!@#$

CREATE DATABASE IF NOT EXISTS safty_helmet;

CREATE USER IF NOT EXISTS 'helmet_admin'@'%' IDENTIFIED WITH mysql_native_password by 'helmet1234!@#$';
GRANT ALL ON safty_helmet.* to 'helmet_admin'@'%';

SHOW GRANTS FOR 'helmet_admin'@'%';