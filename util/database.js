import * as SQLite from "expo-sqlite";

import { Place } from "../models/place";

const database = SQLite.openDatabaseAsync("places.db");

export async function init() {
  try {
    const db = await database;
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function insertPlace(place) {
  try {
    const db = await database;
    const result = await db.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
  } catch (error) {
    console.error("Error inserting place:", error);
    throw error;
  }
}

export async function fetchPlaces() {
  try {
    const db = await database;
    const result = await db.getAllAsync(`SELECT * FROM places;`);
    const places = [];

    // Loop para transformar cada objeto em uma instância de Place
    for (let i = 0; i < result.length; i++) {
      const dp = result[i];

      // Cria uma nova instância de Place com os dados do objeto
      const placeInstance = new Place(dp.id, dp.title, dp.imageUri, {
        address: dp.address,
        lat: dp.lat,
        lng: dp.lng,
      });

      // Adiciona a instância ao array de instâncias
      places.push(placeInstance);
    }

    return places;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}
export async function fetchPlaceById(id) {
  try {
    const db = await database;
    const result = await db.getAllAsync(`SELECT * FROM places WHERE id = ?;`, [id]);

    if (!result) {
      return null;
    }

    const place = new Place(result[0].id, result[0].title, result[0].imageUri, {
      address: result[0].address,
      lat: result[0].lat,
      lng: result[0].lng,
    });

    return place;
  } catch (error) {
    console.error("Error fetching place by id:", error);
    throw error;
  }
}
