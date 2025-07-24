CREATE TABLE IF NOT EXISTS products (
    product_id     SERIAL PRIMARY KEY,
    name           TEXT NOT NULL,
    price          NUMERIC(10, 2) NOT NULL,
    category       TEXT NOT NULL,
    tags           TEXT[] DEFAULT '{}',
    description    TEXT,
    image_link     TEXT,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);