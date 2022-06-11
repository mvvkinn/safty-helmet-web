USE safty_helmet;

CREATE TABLE IF NOT EXISTS field (
    field_id INT AUTO_INCREMENT,
    field_name VARCHAR(20),
    field_addr VARCHAR(50),

    PRIMARY KEY (field_id)
);

CREATE TABLE IF NOT EXISTS worker (
    worker_id INT AUTO_INCREMENT,
    worker_name VARCHAR(10),
    worker_position VARCHAR(10),
    group_name varchar(10),
    field_id int,

    PRIMARY KEY (worker_id),
    FOREIGN KEY (field_id) REFERENCES field(field_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS helmet (
    helmet_id INT AUTO_INCREMENT,
    worker_id INT,
    temp FLOAT,
    humid FLOAT,
    photoresistor INT,
    latitude FLOAT,
    longitude FLOAT,
    distance LONG,
    shock BOOLEAN,
    
    worker_danger BOOLEAN,
    updated_time DATETIME NOT NULL DEFAULT current_TIMESTAMP,

    PRIMARY KEY (helmet_id),
    FOREIGN KEY (worker_id) REFERENCES worker(worker_id) ON DELETE CASCADE
);



SELECT * FROM helmet;