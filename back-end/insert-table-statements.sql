DELETE FROM course cascade;
DELETE FROM admin cascade;
DELETE FROM student cascade;
DELETE FROM teacher cascade;
DELETE FROM grade cascade;

ALTER SEQUENCE student_student_id_seq RESTART WITH 1;
ALTER SEQUENCE teacher_teacher_id_seq RESTART WITH 1;
ALTER SEQUENCE admin_admin_id_seq RESTART WITH 1;
ALTER SEQUENCE course_course_id_seq RESTART WITH 1;

INSERT INTO student(student_name, student_surname, student_email, student_password)
VALUES(
'John',
'Doe',
'johndoe@email.com',
'$2a$12$QazlqFPwyuYb4EJmeAc/i.tT3THAZaPxPSiTpJftrPIgF8ItKS7sO'
),
(
'Michael',
'Jordan',
'michaeljordan@email.com',
'$2a$12$QjwN1014Ww6zATQXX4cPIuW02OiA2GeX58aPs4P48KqSuHtWYAS/y'
);

INSERT INTO teacher(teacher_name, teacher_surname, teacher_email, teacher_password)
VALUES(
'Steve',
'Jobs',
'stevejobs@email.com',
'$2a$12$hUr6AQN.dB5G15aas9Kb/uKQcphaSeDuFbafikWHcbh52w1Ps9Kvu'
),
(
'Linus',
'Torvalds',
'linustorvalds@email.com',
'$2a$12$nOk180sOONCdvlCHARyVXejwOzr7C4Nu.mkk3E6D3TKJ7cbhrr3LO'
);

INSERT INTO admin(admin_nickname, admin_email, admin_password)
VALUES(
'georgehotz',
'georgehotz@email.com',
'$2a$12$m2mHKRT0szaUkBd6ye6bLe/0FeSrWdFkRQXsOmFvE4lR6e/v.9qFW'
);

INSERT INTO course(course_name, teacher_id, course_ongoing)
VALUES('Introduction to Python', 1, TRUE),
('Database Design for Banking Systems', 2, FALSE),
('Full-Stack Web Development with React', 2, TRUE),
('Secure Software Engineering Practices', 1, TRUE),
('Machine Learning for Fraud Detection', 2, FALSE);

INSERT INTO grade(course_id, student_id, student_grade, student_absence, student_comment)
VALUES(1, 1, 75, 4, 'Should study to OOP more'),
(3, 2, 70, 2, 'Good frontend skills, but need to study to core backend concepts'),
(5, 1, 100, 2, 'Excellent work!');