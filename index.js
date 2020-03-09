const http = require('http');
const express = require('express');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});
const parseJson = bodyParser.json();
const session = require('express-session');
const user = require('./models/user')
const FileStore = require('session-file-store')(session);
const cors = require("cors");
const trip = require('./models/trip')
const place = require('./models/place')
app.use(cors({
    origin: ['*'],
    methods: ['*'],
    credentials: true
}))
app.use(session({
    store: new FileStore({}),
    // resave: true,
    // saveUninitialized: false,
    secret: 'lalala1234lalala'
}));

app.use((req, res, next) => {
    console.log('***********');
    console.log(req.session);
    console.log('***********');

    next();
});
const server = http.createServer(app);
app.use(express.static('public'));

// users
app.get('/', (req, res) => {
    res.redirect('/api/login');
});


function requireLogin(req, res, next) {
    console.log(req.session.users)
    if (req.session && req.session.users) {
        console.log('user is logged in')
        next();
    } else {
        console.log('user is not logged in')
        res.json({ login: false });
    }
};


app.post('/api/login', parseForm, parseJson, async (req, res) => {
    const { email, password } = req.body;
    const didLoginSuccessfully = await user.login(email, password);
    console.log(didLoginSuccessfully)
    if (didLoginSuccessfully) {
        console.log(`the user has logged in!`);

        const u = await user.getByEmail(email);
        req.session.users = {
            email,
            id: u.id
        };
        req.session.save(() => {
            console.log('The session is now saved!!!');
            console.log(req.session)
            res.json({
                success: true
            });
        });
    } else {
        console.log(`Incorrect`);
        res.json({
            success: false
        });
    }
});

app.post('/api/signup', parseForm, parseJson, async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    try {
        const searchForUser = await user.getByEmail(email);
        console.log(searchForUser)
        console.log("success is false")
        res.json({
            success: false,
            user_taken: true
        });

    } catch (err) {
        const newUserId = await user.signUp(email, password, first_name, last_name);

        console.log(newUserId);

        if (newUserId.id > 0) {
            console.log(`you signed up!`);
            res.json({
                success: true
            });
        }
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});


// Trips

app.post('/api/create/trip', requireLogin, parseJson, async (req, res) => {
    const { location, day, lat, long } = req.body;
    console.log('creating trip');
    console.log(req.body)
    const user_id = req.session.users.id;
    const newTripId = await trip.createTrip(location, day, lat, long, user_id);
    console.log(newTripId)
    res.json({
        success: true
    });
});


app.get('/api/my-trips', requireLogin, async (req, res) => {
    const id = req.session.users.id
    const userTrips = await trip.getAllTripsByUserId(id);
    res.json({
        result: userTrips
    });

});

app.get('/api/trip-detail/:id(\\d+)', requireLogin, async (req, res) => {
    // console.log(req)
    const id = req.params.id
    const eachTrip = await trip.getTrip(id);
    res.json({
        result: eachTrip
    });
});


app.get('/api/trip-detail', requireLogin, async (req, res) => {
    const id = req.session.trips.id
    const eachTrip = await trip.getTrip(id);
    res.json({
        result: eachTrip
    });

});

// places

app.post('/api/create/places', requireLogin, parseJson, async (req, res) => {
    const { name, type, latitude, longitude, tripId } = req.body;
    console.log('creating place');
    console.log(req.body)
    const newPlaceId = await place.createPlace(name, type, latitude, longitude, tripId);
    console.log(newPlaceId)
    res.json({
        newPlaceId,
        success: true
    });
});

app.delete('/api/saved-places/:saved_place_id(\\d+)', requireLogin, async (req, res) => {
    const { saved_place_id } = req.params;
    const deletedRows = await place.deletePlaceById(saved_place_id)
    res.json({
        deletedRows,
        success: true
    });
});

app.get('/api/saved-places-detail/:trip_id(\\d+)', requireLogin, async (req, res) => {
    const trip_id = req.params.trip_id
    const eachSavedPlace = await place.getAllSavedPlacedByTripId(trip_id);
    res.json({
        result: eachSavedPlace
    });
});

app.get('*', (req, res) => {
    console.log("Redirecting, because no page here.");
    res.redirect('/home');
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});