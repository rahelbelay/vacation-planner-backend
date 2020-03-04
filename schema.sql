create table users (
    id serial primary key,
    email text,
    hash text,
    first_name text,
    last_name text
)
;
create table trips (
    id serial primary key,
    location text,  
    day text,
    user_id integer references users (id)
)
;
create table categories (
    id serial primary key,
    category text,
    rating text,
    user_id integer references users (id)
)
;
