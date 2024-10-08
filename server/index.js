let con = require("./connection.js");
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let app = express();
const path = require('path');
const { log } = require("console");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images'))); // use imgage...

app.post("/searchHotel", (req, res) => {

    let check_In = req.body.checkIn;
    let check_Out = req.body.checkOut;
    let avlRoom = req.body.numberofRoom;
    let Adult = req.body.numberofAdult;
    let children = req.body.numberofChildren;

    const query = `
        SELECT h.name AS hotel_name, h.hotel_id AS hotel_id, h.image, r.room_type, r.price_per_night, ra.available_rooms
        FROM Hotels h
        JOIN Rooms r ON h.hotel_id = r.hotel_id
        JOIN Room_Availability ra ON r.room_id = ra.room_id
        WHERE ra.date BETWEEN ? AND ?
        AND ra.available_rooms >= 1
        AND r.max_adults >= ?
        AND r.max_children >= ?;
    `;

    let value = [check_In, check_Out, avlRoom, Adult, children || '0'];

    con.query(query, value, async (err, result) => {
        if (!err) {
            if (result.length === 0) {
                // If the data is empty, return "No records found"
                res.send({ message: "No records found", status: 200, data: [] });
            } else {
                // If data is available, return the data
                res.send({ message: "Data Fetched", status: 200, data: result });
            }
        } else {
            // If there was an error during the query execution
            res.send({ message: "Error", status: 400, data: err });
        }
    });
});


app.get("/fetch_hotelsByHotelId/:id", (req, res) => {
    let hotel_id = req.params.id;
    console.log(hotel_id);

    const query = `
         SELECT h.name AS hotel_name, r.room_id, r.room_type, r.price_per_night,r.image, ra.date, ra.available_rooms
        FROM Hotels h
        JOIN Rooms r ON h.hotel_id = r.hotel_id
        JOIN Room_Availability ra ON r.room_id = ra.room_id
        WHERE h.hotel_id = ?;
    `;
    con.query(query, [hotel_id], (error, result) => {
        if (!error) {
            if (result.length > 0) {

                let obj = {};
                for (let item of result) {

                    if (!obj[item.hotel_id]) {
                        obj[item.hotel_id] = {
                            "hotel_name": item.hotel_name,
                            hotel_id: item.hotel_id,
                            room_image: item.image,
                            room: []
                        }

                        obj[item.hotel_id].room.push({
                            room_id: item.room_id,
                            room_type: item.room_type,
                            price_per_night: item.price_per_night,
                            date: item.date,
                            available_rooms: item.available_rooms

                        })

                    } else {
                        obj[item.hotel_id].room.push({
                            room_id: item.room_id,
                            room_type: item.room_type,
                            price_per_night: item.price_per_night,
                            date: item.date,
                            available_rooms: item.available_rooms

                        })

                    }

                }

                let maniuplatedData = Object.values(obj)
                res.send({ message: "Success", status: 200, data: maniuplatedData });
            }


        } else {
            res.send({ message: "Error", status: 400, data: error })
        }
    })
});


app.get("/room/:room_id", (req, res) => {
    let room_id = req.params.room_id;
    const query = `SELECT r.room_id, r.room_type, r.price_per_night, h.hotel_id, h.name AS hotel_name, ra.date, ra.available_rooms FROM Rooms r JOIN Hotels h ON r.hotel_id = h.hotel_id JOIN Room_Availability ra ON r.room_id = ra.room_id WHERE r.room_id = ?;`;

    con.query(query, [room_id], (error, result) => {
        if (!error) {

            res.send({ message: "roomData Fetched", status: 200, data: result });
        } else {
            res.send({ message: "Error", status: 400, data: error })
        }
    })


});

/*--- Insert data to bookings table  */

app.post("/postguestdata", (req, res) => {
    console.log(req.body);
    // let booking_id = req.body.booking_id;
    let user_id = req.body.user_id;
    let hotel_id = req.body.hotel_id;
    let room_id = req.body.room_id;
    let check_in_date = req.body.check_in_date;
    let check_out_date = req.body.check_out_date;
    let adults = req.body.adults;
    let children = req.body.children;
    let total_price = req.body.total_price;
    let booking_status = req.body.booking_status;
    let guest_details = req.body.guest_details;
    let payment_mode = req.body.payment_mode;




    let sql = ("INSERT INTO bookings (user_id , hotel_id , room_id , check_in_date , check_out_date , adults , children , total_price , booking_status , guest_details , payment_mode ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)");
    let value = [user_id, hotel_id, room_id, check_in_date, check_out_date, adults, children, total_price, booking_status, guest_details, payment_mode];
    con.query(sql, value, (error, result) => {
        if (!error) {
            // console.log(result);
            console.log(error);


            res.send({ message: "Data Inserted Successfully", status: 200, data: result });
        }
        else {
            res.send({ message: "Error", status: 400, data: error })
        }
    });
});

/*--------------- Insert name ,  email ,  password and phone_number from user table  */

app.post("/signupdata", (req, res) => {
    // console.log(req.body);
    // let booking_id = req.body.booking_id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let phone_number = req.body.phone_number;

    let sql = ("INSERT INTO users (name , email , password , phone_number , role ) VALUES (? , ? , ? , ? , ? )");

    let value = [name, email, password, phone_number, 'user'];
    con.query(sql, value, (error, result) => {
        if (!error) {
            // console.log(result);
            console.log(error);


            res.send({ message: "User Registered !, Please Login", status: 200 });
        }
        else {
            res.send({ message: "Fields are Empty", status: 400, data: error })
        }
    });
});

/* get email and password from user table  */

app.post("/login", (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);



    let sql = "SELECT * FROM users WHERE email = ?";
    let values = [email];

    con.query(sql, values, (error, result) => {
        if (!error) {
            if (result.length > 0) {
                console.log(result);
                if (result[0].password == password) {
                    res.send({ message: "Login successful", status: 200, data: result[0] });
                } else {
                    res.send({ message: "Invalid credential", status: 400 })
                }
            } else {
                res.send({ message: "Fields are Empty", status: 400, data: error })
            }
        }
    });
});


/* get data from bookings table  */

app.get("/getbookingData", (req, res) => {
    con.query("SELECT * from bookings", (error, result) => {
        if (error) throw error;
        const parsedResult = result.map(booking => {
            return {
                ...booking,
                guest_details: JSON.parse(booking.guest_details)
            }
        });

        res.send(parsedResult);
    })
});


/* get coupan code and diccount from discounts table */


app.get("/roomdiscount/:room_id", (req, res) => {
    let room_id = req.params.room_id;

    const query = `
        SELECT 
            r.room_id, 
            r.room_type, 
            d.discount_percentage, 
            d.discount_season
        FROM 
            Rooms r
        JOIN 
            Discounts d ON r.room_id = d.room_id
        WHERE 
          
    CASE
        WHEN MONTH(CURDATE()) BETWEEN 3 AND 5 THEN d.discount_season = 'Spring'
        WHEN MONTH(CURDATE()) BETWEEN 6 AND 8 THEN d.discount_season = 'Summer'
        WHEN MONTH(CURDATE()) BETWEEN 9 AND 11 THEN d.discount_season = 'Fall'
        ELSE d.discount_season = 'Winter'
    END AND
      r.room_id = ?


    `;

    con.query(query, [room_id], (error, result) => {
        if (!error) {
            if (result.length > 0) {
                res.send({ message: "Data Fetched", status: 200, data: result });
            } else {
                res.send({ message: "No data found", status: 404 });
            }
        } else {
            res.send({ message: "Error", status: 400, data: error });
        }
    });
});


/* Get Hotel List From Hotel Table In Admin Navbar COmponent */

app.get("/gethoteldata", (req, res) => {

    con.query("SELECT * from hotels", function (error, result) {
        if (!error) {
            if (result.length > 0) {
                res.send({ message: "Hotel List Fetched", status: 200, data: result });
            } else {
                res.send({ message: "No data found", status: 404 });
            }
        } else {
            res.send({ message: "Error", status: 400, data: error });
        }
    });


});






/*--- Admin Insert data to hotel table  */

app.post("/createhotel", (req, res) => {
    console.log(req.body);
    // let booking_id = req.body.booking_id;
    let name = req.body.name;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let zipcode = req.body.zipcode;
    let phonenumber = req.body.phonenumber;
    let email = req.body.email;
    let description = req.body.description;
    let rating = req.body.rating;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let image = req.body.image;
    let password = req.body.password;


    let sql = ("INSERT INTO hotels (name , address , city , state , country , zip_code , phone_number , email , description , star_rating , longitude , latitude , image , password ) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )");
    let value = [name, address, city, state, country, zipcode, phonenumber, email, description, rating, longitude, latitude, image, password];
    con.query(sql, value, (error, result) => {
        if (!error) {
            // console.log(result);
            console.log(error);


            res.send({ message: "Data Inserted Successfully", status: 200, data: result });
        }
        else {
            res.send({ message: "Error", status: 400, data: error })
        }
    });
});



app.put("/updatehotel/:hotelid", (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let zipcode = req.body.zipcode;
    let phonenumber = req.body.phonenumber;
    let email = req.body.email;
    let description = req.body.description;
    let rating = req.body.rating;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let image = req.body.image;
    let password = req.body.password;
    let hotel_id = req.body.hotelid;

    let sql = "UPDATE hotels SET name = ?, address = ?, city = ? , state = ?, country = ?, zip_code = ?, phone_number = ?, email = ?, description = ?, star_rating = ?, longitude = ?, latitude = ?, image = ?, password = ? WHERE hotel_id = ?";

    con.query(sql, [name, address, city, state, country, zipcode, phonenumber, email, description, rating, longitude, latitude, image, password, hotel_id], (error, result) => {
        if (error) throw error;
        // console.log(error);
        res.send({ message: "Updated Successfully" });
    });
});


app.delete("/delete/:deleteid", (req, res) => {
    let id = req.params.deleteid;

    let sql = ("DELETE FROM hotels WHERE hotel_id = ? ");
    con.query(sql, id, (error, result) => {
        if (!error) {
            res.send({ message: "Selected Hotel Deleted Successfully", status: 200, data: result });
        }
        else {
            res.send({ message: "Error", status: 400, data: error })
        }
    })
})



/* get email and password from hotel for hotel login table  */

app.post("/hotellogin", (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);



    let sql = "SELECT * FROM hotels WHERE email = ? AND password = ?";

    let values = [email, password];

    con.query(sql, values, (error, result) => {
        if (!error) {
            if (result.length > 0) {
                console.log(result, "RESULT");
                if (result[0].email == email && result[0].password == password) {
                    res.send({ message: "Login successful", status: 200, data: result[0] });
                } else {
                    res.send({ message: "Invalid credential", status: 400 })
                }
            } else {
                res.send({ message: "Fields are Empty", status: 400, data: error })
            }
        }
    });
});


/* Get particular room List From room Table using particular hotel_id  */

app.post("/roomlistbyusinghotelid", (req, res) => {
    let hotel_id = req.body.hotel_id;
    console.log(req.body);



    let sql = "SELECT * FROM rooms WHERE hotel_id = ? ";
    values = [hotel_id];

    con.query(sql, values, (error, result) => {
        if (!error) {
            if (result.length > 0) {
                res.send({ message: "rooms List Fetched", status: 200, data: result });
            } else {
                res.send({ message: "No data found", status: 404 });
            }
        } else {
            res.send({ message: "Error", status: 400, data: error });
        }
    });


});


/*--- Hotel Insert data to Rooms table  */

app.post("/createrooms", (req, res) => {
    console.log(req.body);
    let hotel_id = req.body.hotel_id;
    let roomname = req.body.roomname;
    let adults = req.body.adults;
    let children = req.body.children;
    let price = req.body.price;
    let availabilitycount = req.body.availabilitycount;
    let roomimage = req.body.roomimage;
    let date = req.body.createdate;



    let sql = ("INSERT INTO rooms (hotel_id , room_type , max_adults , max_children , price_per_night , availability_count , image , createdate ) VALUES (? , ? , ? , ? , ? , ? , ? , ? )");
    let value = [hotel_id, roomname, adults, children, price, availabilitycount, roomimage, date];
    con.query(sql, value, (error, result) => {
        if (!error) {
            // console.log(result);
            console.log(error);


            res.send({ message: "Data Inserted Successfully", status: 200, data: result });
        }
        else {
            res.send({ message: "Error", status: 400, data: error })
        }
    });
});


/* ----- This api is used to updaate the rooms data by hotel level */

app.put("/updateroom/:id", (req, res) => {

    let roomId = req.params.id;
    let roomname = req.body.roomname;
    let adults = req.body.adults;
    let children = req.body.children;
    let price = req.body.price;
    let availabilitycount = req.body.availabilitycount;
    let roomimage = req.body.roomimage;
    let date = req.body.createdate;



    let sql = "UPDATE rooms SET room_type = ?, max_adults = ?, max_children = ?, price_per_night = ?, availability_count = ?, image = ?, createdate = ? WHERE room_id = ?";

    con.query(sql, [roomname, adults, children, price, availabilitycount, roomimage, date, roomId], (error, result) => {
        if (error) throw error;
        res.send({ message: "Updated Successfully" });
    });
});


/* -- Delete the room by hotel --  */

app.delete("/deleteroom/:deleteid", (req, res) => {
    let id = req.params.deleteid;

    let sql = ("DELETE FROM rooms WHERE room_id = ? ");
    con.query(sql, id, (error, result) => {
        if (!error) {
            res.send({ message: "Selected Room Deleted Successfully", status: 200, data: result });
        }
        else {
            res.send({ message: "Error", status: 400, data: error })
        }
    })
});






app.listen(3000);

