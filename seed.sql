insert into users
    (email, hash, first_name, last_name )
values
    ( 'bhoe@hoes.com', '3i94293ji292ehmsndsiw','Barbara', 'Hoe' ),  
    ( 'fredtea@spoon.com', 'iuiw77ehde83ufdahjeueeh','Fred', 'Teaspoon' ),  
    ( 'mburns@molly.net', 'ndsjdiuwiiwow89282272729jsdjn','Molly', 'Burns' ),  
    ( 'san_fries@game.com', 'nsnsjsu287277272729nwii', 'Sandra', 'Fries')
    ;

insert into trips
    (location,  day,  user_id )
values
    ( 'hudsonc-rossing', 5, 3 ),  
    ( 'lilburn',5, 2 ),
    ;
    
insert into saved_places
    ( name, type,latitude,longitude, trip_id )
values
    ( 'paris', 'resturant', 30.77, 49.08, 1 ),  
    ( 'london','park', 39.02,90.43, 1 ) 
    ;
    

