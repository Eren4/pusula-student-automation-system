DELETE FROM admin cascade;
DELETE FROM grade cascade;
DELETE FROM student cascade;
DELETE FROM course cascade;
DELETE FROM teacher cascade;

ALTER SEQUENCE student_student_id_seq RESTART WITH 1;
ALTER SEQUENCE teacher_teacher_id_seq RESTART WITH 1;
ALTER SEQUENCE admin_admin_id_seq RESTART WITH 1;
ALTER SEQUENCE course_course_id_seq RESTART WITH 1;

INSERT INTO student(student_name, student_surname, student_email, student_password)
VALUES(
'John',
'Doe',
'johndoe@email.com',
'$2a$11$HfCsrSoE4zIz2Qxv15QmcefdrwHoCuDSyFsfV/io41ECTWQ6Vtl/W'
),
(
'Michael',
'Jordan',
'michaeljordan@email.com',
'$2a$11$1O9KVVnpVyG3R3gpz9.oeOviSgr6qd5qbBBMA5bmKNetRaQ/X4ryW'
);

INSERT INTO teacher(teacher_name, teacher_surname, teacher_email, teacher_password)
VALUES(
'Steve',
'Jobs',
'stevejobs@email.com',
'$2a$11$DxoswufaFKmAGI04wnpTe.ZhSBfrEt7kIBU2NErZJ//uiject5EsS'
),
(
'Linus',
'Torvalds',
'linustorvalds@email.com',
'$2a$11$TKxHi2ZW74.lDu3gcNj6LeHjqUF92iReK6Nn1UkWGL32PhJBNtokC'
);

INSERT INTO admin(admin_nickname, admin_email, admin_password)
VALUES(
'georgehotz',
'georgehotz@email.com',
'$2a$11$FVs2eSh11mc.Bhl2VzoHDe535rb7ixWV0DvMBcTd8KRZn2rDmT8.S'
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