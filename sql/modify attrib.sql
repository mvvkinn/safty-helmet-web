use helmet_dev;

alter table helmet_tests modify humid FLOAT;
alter table helmet_tests modify temp float;

desc helmet_tests;