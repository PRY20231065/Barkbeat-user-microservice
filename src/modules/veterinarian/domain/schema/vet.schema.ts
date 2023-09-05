import { Schema } from "dynamoose";
import { IndexType } from "dynamoose/dist/Schema";

export const VetSchema = new Schema({
    id: {
        type: String,
        hashKey: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    lastname: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        index: {
            name: 'email-index',
            type: IndexType.global
        }
    },
    clinic_name: {
        type: String,
    },
    disponibility_start: {
        type: String,
    },
    disponibility_end: {
        type: String,
    },


});