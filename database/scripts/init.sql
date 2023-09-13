-- Create the "load" table
CREATE TABLE load (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(255),
    timestamp TIMESTAMP,
    page VARCHAR(255),
    isunique BOOLEAN,
    lastvisit BIGINT,
    useragent VARCHAR(255),
    screensize VARCHAR(255),
    language VARCHAR(255),
    location VARCHAR(255),
    timezone VARCHAR(255)
);

-- Create the "adview" table
CREATE TABLE adview (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(255),
    timestamp TIMESTAMP,
    adid VARCHAR(255),
    time INTEGER
);

-- Create the "adclick" table
CREATE TABLE adclick (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(255),
    timestamp TIMESTAMP,
    adid VARCHAR(255),
    redirectUrl VARCHAR(255)
);

-- Create the "visitduration" table
CREATE TABLE visitduration (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(255),
    timestamp TIMESTAMP,
    duration INTEGER,
    time INTEGER
);

-- Create the "outoffocusduration" table
CREATE TABLE outoffocusduration (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(255),
    timestamp TIMESTAMP,
    page VARCHAR(255),
    duration INTEGER,
    time INTEGER
);

-- Create the 'pagevisitduration' table
CREATE TABLE pagevisitduration (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(255),
    timestamp TIMESTAMP,
    visitTime INTEGER,
    newPage VARCHAR(255),
    page VARCHAR(255)
);

-- Create the "mouseout" table
CREATE TABLE mouseout (
    id SERIAL PRIMARY KEY,
    userid VARCHAR(255),
    timestamp TIMESTAMP,
    page VARCHAR(255),
    time INTEGER
);

-- Create indexes for all tables
CREATE INDEX idx_load_id ON load (id);
CREATE INDEX idx_adview_id ON adview (id);
CREATE INDEX idx_adclick_id ON adclick (id);
CREATE INDEX idx_visitduration_id ON visitduration (id);
CREATE INDEX idx_outoffocusduration_id ON outoffocusduration (id);
CREATE INDEX idx_pagevisitduration_id ON pagevisitduration (id);
CREATE INDEX idx_mouseout_id ON mouseout (id);
