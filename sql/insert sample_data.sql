INSERT INTO field (field_id, field_name, field_addr) VALUES
(1, "00동 주공아파트 신축공사", "서울시 서대문구 거북골로 337");

INSERT INTO worker (worker_id, worker_name, worker_position, group_name, field_id) VALUES 
(1, "김민우", "overseer", "설계1팀", 1),
(2, "윤재민", "worker", "설계1팀", 1);

INSERT INTO helmet (helmet_id, worker_id, temp, humid, photoresistor, latitude, longitude, distance, shock, worker_danger) VALUES
(1 ,1, 52, 25, 1289, 99, 99, 38, false, false),
(2 ,2, 53, 28, 1289, 99, 99, 10, true, false);