CREATE TABLE api (
  api_id integer NOT NULL,
  user_id integer NOT NULL,
  key text NOT NULL,
  name text NOT NULL,
  created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE click (
  click_id integer NOT NULL,
  link_id integer NOT NULL,
  created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
  ua character varying(255),
  browser character varying(255),
  os character varying(200),
  device character varying(200),
  ip character varying(50),
  referral character varying(255),
  country character varying(255)
);
CREATE TABLE link (
  link_id integer NOT NULL,
  user_id integer NOT NULL,
  url text NOT NULL,
  slug character varying(255) NOT NULL,
  created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
  password character varying(60),
  bot_protection boolean DEFAULT false NOT NULL
);
CREATE TABLE user (
  user_id integer NOT NULL,
  username character varying(255) NOT NULL,
  password character varying(60) NOT NULL,
  is_admin boolean DEFAULT false NOT NULL,
  created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX api_user_id_idx ON api USING btree (user_id);
CREATE INDEX click_link_id_idx ON click USING btree (link_id);
CREATE UNIQUE INDEX link_slug_key ON link USING btree (slug);
CREATE INDEX link_user_id_idx ON link USING btree (user_id);
CREATE UNIQUE INDEX user_username_key ON "user" USING btree (username);
INSERT INTO
  user(username, password, is_admin)
VALUES
  (
    'admin',
    '$2a$10$OEj1CERiX8FTEYCD60.12u.MwVM5OjZYy2Y3fUHCb6/H8BiSPvsoO',
    true
  );