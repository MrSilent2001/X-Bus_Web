import {DataSource} from 'typeorm';
import {DB_PORT, DB_HOST, DB_PASSWORD, DB_NAME, DB_USERNAME} from "../constants/env"
import {User} from "../models/user.model";
import {UserVerification} from "../models/userVerification.model";
import {Bus} from "../models/bus.model";
import {Feedback} from "../models/feedback.model";
import {BusSchedule} from "../models/schedule.model";
import {LostnFound} from "../models/lostnfound.model";
import {Reservation} from "../models/reservation.model";
import {Payment} from "../models/payment.model";
import {Location} from "../models/location.model";
import {Refund} from "../models/refund.model";
import {Expense} from "../models/expense.model";


const AppDataSource = new DataSource({
    type: "postgres",
    // host: DB_HOST,
    // port: parseInt(DB_PORT, 10),
    // username: DB_USERNAME,
    // password: DB_PASSWORD,
    // database: DB_NAME,
    url: process.env.DATABASE_URL,
    entities: [
        User, UserVerification, Bus, BusSchedule, Feedback, LostnFound, Reservation, Payment, Location, Refund, Expense
    ],
    synchronize: true,
    logging: false
});

export default AppDataSource;

