-- Create the users table with UUID primary key
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(16) UNIQUE NOT NULL,
  email VARCHAR(25) NOT NULL,
  password VARCHAR(16) NOT NULL,
  firstName VARCHAR(15) NOT NULL,
  lastName VARCHAR(15) NOT NULL
);

-- Create the posts table with UUID primary key and foreign key reference to users
CREATE TABLE posts (
  post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(50) NOT NULL,
  content TEXT,
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

-- Seed data for testing (optional)
INSERT INTO users (username, email, password, firstName, lastName) VALUES
  ('john_doe', 'password123', 'john@example.com', 'John', 'Doe'),
  ('jane_smith', 'letmein', 'jane@example.com', 'Jane', 'Smith');

INSERT INTO posts (title, content, user_id) VALUES
  ('First Post', 'Hello, world!', (SELECT user_id FROM users WHERE username = 'john_doe')),
  ('Second Post', 'Another post content', (SELECT user_id FROM users WHERE username = 'jane_smith'));
