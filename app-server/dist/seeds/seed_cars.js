"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("cars").del();
        // Inserts seed entries
        yield knex("cars").insert([
            {
                plate: "DBH-3491",
                manufacture: "Ford",
                model: "F150",
                image: "./images/car01.min.jpg",
                rentPerDay: 200000,
                capacity: 2,
                description: " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
                availableAt: "2022-03-23T15:49:05.563Z",
                transmission: "Automatic",
                available: true,
                type: "Sedan",
                year: 2022,
                options: ["Cruise Control", "Tinted Glass", "Tinted Glass", "Tinted Glass", "AM/FM Stereo"],
                specs: ["Brake assist", "Leather-wrapped shift knob", "Glove box lamp", "Air conditioning w/in-cabin microfilter", "Body color folding remote-controlled pwr mirrors", "Dual-stage front airbags w/occupant classification system"]
            },
            {
                plate: "WXB-3984",
                manufacture: "BMW",
                model: "X5",
                image: "./images/car02.min.jpg",
                rentPerDay: 800000,
                capacity: 6,
                description: " Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
                availableAt: "2022-03-23T15:49:05.563Z",
                transmission: "Automatic",
                available: false,
                type: "Convertible",
                year: 2019,
                options: ["Keyless Entry", "Power Windows", "MP3 (Single Disc)", "CD (Multi Disc)", "Navigation"],
                specs: ["Rear passenger map pockets", "Electrochromic rearview mirror", "Dual chrome exhaust tips", "Locking glove box", "Pwr front vented disc/rear drum brakes"]
            },
            {
                plate: "OSL-4224",
                manufacture: "Lincoln",
                model: "MKZ",
                image: "./images/car03.min.jpg",
                rentPerDay: 900000,
                capacity: 6,
                description: " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
                availableAt: "2022-03-23T15:49:05.563Z",
                transmission: "Automanual",
                available: true,
                type: "Sedan",
                year: 2021,
                options: ["Bucket Seats", "Airbag: Passenger", "Airbag: Driver", "Power Seats", "Airbag: Side", "Antilock Brakes", "CD (Multi Disc)"],
                specs: ["Driver & front passenger map pockets", "Direct-type tire pressure monitor system", "Cargo area lamp", "Glove box lamp", "Silver finish interior door handles", "Driver & front passenger advanced multistage airbags w/occupant sensors", "Silver accent IP trim finisher -inc: silver shifter finisher", "Fasten seat belt warning light/chime"]
            },
        ]);
    });
}
exports.seed = seed;
