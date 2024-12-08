DROP TABLE IF EXISTS users;

-- Table
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- SP
CREATE OR REPLACE PROCEDURE upsert_user(
    p_id BIGINT,
    p_name VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users (id, name)
    VALUES (p_id, p_name)
    ON CONFLICT (id) 
    DO UPDATE SET name = EXCLUDED.name;
END;
$$;