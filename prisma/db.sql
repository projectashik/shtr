create table api (
  api_id serial primary key,
  user_id integer not null references user(user_id) on delete cascade,
  key text NOT NULL,
  name text NOT NULL,
  created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
create table click (
  click_id serial primary key,
  link_id integer not null REFERENCES link(link_id) on delete cascade,
  created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
  ua varchar(255),
  browser varchar(255),
  os varchar(200),
  device varchar(200),
  ip varchar(50),
  referral varchar(255),
  country varchar(255)
);
create table link (
  link_id serial primary key,
  user_id integer NOT NULL REFERENCES user(user_id) on delete cascade,
  url text NOT NULL,
  slug varchar(255) NOT NULL,
  created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
  password varchar(60),
  bot_protection bool not null default false
);
create table account (
  user_id serial primary key,
  username varchar(255) unique not null,
  password varchar(60) not null,
  is_admin bool not null default false,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);
create index api_user_id_idx on api using btree (user_id);
create index click_link_id_idx on click using btree (link_id);
create unique index link_slug_key on link using btree (slug);
create index link_user_id_idx on link using btree (user_id);
create unique index user_username_key on user using btree (username);
insert into
  account(username, password, is_admin)
values
  (
    "admin",
    "$2a$10$OEj1CERiX8FTEYCD60.12u.MwVM5OjZYy2Y3fUHCb6/H8BiSPvsoO",
    true
  );