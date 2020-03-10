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
    lat text,
    long text,
    picture_url text,
    user_id integer references users (id)
)
;
create table saved_places (
    id serial primary key,
    name text,
    type text,
    latitude decimal,
    longitude decimal,
    picture_url text,
    trip_id integer references trips (id)
)
;

