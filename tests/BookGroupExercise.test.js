const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');

const app = require('../index');
const { userUserIdBookGroupExercisePOST } = require('../service/BookGroupExerciseService');

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: "json", prefixUrl: t.context.prefixUrl });
});


test.after((t) => {
    t.context.server.close();
});

const UserId = 1;

// Έγκυρα δεδομένα για κρατηση σε ομαδική άσκηση
const validBookingRequest = {
    name: "TRX",
    date: "2024-12-16",
    time: "08:00"
};

// Υποθέτουμε ότι η συγκεκριμένη ώρα είναι πλήρης.
const invalidBookingRequest = {
    name: "Yoga",
    date: "2024-12-16",
    time: "09:00"
}; 

//Ελειπής δεδομένα κράτησης σε ομαδική άσκηση
const incompleteBookingRequest = {
    name: "Yoga Class",
    date: undefined,
    time: "Pilates"
}; 

//Μη έγκυρα δεδομένα κράτησης σε ομαδική άσκηση
const WrongBookingRequest = {
    name: "Yoga Class",
    date: "2026-12-16",
    time: "Pilates"
};

// Δημιουργησα μια συναρτηση που ελεγχει το availability 
// και δεν εχω availability true ή αν δεν βρισκει σωστη ημερομηνια επιστρεφει 400


test('POST Book Group Exercise - Successful booking', async (t) => {
    const response = await t.context.got.post(`user/${UserId}/BookGroupExercise`, {
        json: validBookingRequest
    });

    // ελεχω πρωτα αν ειναι οκαυ τα δεδομενα που εδωσε ο χρηστης 
    t.is(response.statusCode, 200, 'Should return 200');
    t.truthy(response.body.name);
    t.truthy(response.body.date);
    t.truthy(response.body.time);

    
});



test('POST Book Group Exercise - Unsuccessful booking (full schedule)', async (t) => {
    const response = await t.context.got.post(`user/${UserId}/BookGroupExercise`, {
        json: invalidBookingRequest
    });

    t.is(response.statusCode, 400, 'Should return 400 for fully booked schedule');
    t.false(response.body.BookGroupExercise, 'Booking should not be successful');
    t.is(response.body.message, "Choose another group exercise", 'Should return failure message');
});



test('POST Book Group Exercise - Invalid data (missing date)', async (t) => {
    const response = await t.context.got.post(`user/${UserId}/BookGroupExercise`, {
        json: incompleteBookingRequest
    });

    t.is(response.statusCode, 400, 'Should return 400 for incomplete data');
    
});


test('POST Book Group Exercise - Invalid data (wrong date)', async (t) => {
    const response = await t.context.got.post(`user/${UserId}/BookGroupExercise`, {
        json: WrongBookingRequest
    });

    t.is(response.statusCode, 400, 'Should return 400 for incomplete data');
});



test("Post / function returns user details", async (t) => {
     const newUserID = 158;
     // Ελέγχω την συνάρτηση που καλώ 
    const BookExerciseReq = await userUserIdBookGroupExercisePOST(validBookingRequest,newUserID);

    t.truthy(BookExerciseReq.name);
    t.truthy(BookExerciseReq.date);
    t.truthy(BookExerciseReq.time);

    t.is(BookExerciseReq.name, "Yoga");
    t.is(BookExerciseReq.date , "2024-12-20");
    t.is(BookExerciseReq.time , "10:00");

});