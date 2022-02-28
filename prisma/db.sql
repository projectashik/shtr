create table account (
  user_id serial primary key,
  username varchar(255) unique not null,
  password varchar(255) not null,
  is_admin bool not null default false,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);
create table link (
  link_id serial primary key,
  user_id integer NOT NULL REFERENCES account(user_id) on delete cascade,
  url text NOT NULL,
  slug varchar(255) NOT NULL,
  created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
  password varchar(60),
  bot_protection bool not null default false
);
create table api (
  api_id serial primary key,
  user_id integer not null references account(user_id) on delete cascade,
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
create index api_user_id_idx on api(user_id);
create index click_link_id_idx on click(link_id);
create unique index link_slug_key on link(slug);
create index link_user_id_idx on link(user_id);
insert into
  account (username, password, is_admin)
values
  (
    'admin',
    '$2b$10$BUli0c.muyCW1ErNJc3jL.vFRFtFJWrT8/GcR4A.sUdCznaXiqFXa',
    true
  );