drop database web_educa
create database web_educa

select * from teachers
select * from students

delete from students WHERE students.name = 'lucas'

update from students WHERE students.name = 'lucas'

INSERT INTO teachers VALUES
    ('fa9cd974-b6e9-42bb-a8a2-0c5391301b1b','gabs', '456.456.465-60', 'gabs@gmail.com','senha', 'linkavatar', 'pix', 0, 'Aprendendo');

INSERT INTO students VALUES
    ('fa9cd974-b6e9-42bb-a8a2-0c5391301b1b','lucas', '456.456.465-60', 'lucas@gmail.com','senha', 'linkavatar', 'pix', 0);
