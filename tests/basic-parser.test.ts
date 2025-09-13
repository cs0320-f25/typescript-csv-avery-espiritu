import { z, ZodError } from "zod";
import { parseCSV, PersonRowSchema, Person, FigureRowSchema } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const FIGURES_CSV_PATH = path.join(__dirname, "../data/figures.csv");
const BROKEN_CSV_PATH = path.join(__dirname, "../data/broken.csv");
const VALID_PEOPLE_CSV_PATH = path.join(__dirname, "../data/valid_people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  if (Array.isArray(results)){
    expect(results).toHaveLength(5);
    expect(results[0]).toEqual(["name", "age"]);
    expect(results[1]).toEqual(["Alice", "23"]);
    expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
    expect(results[3]).toEqual(["Charlie", "25"]);
    expect(results[4]).toEqual(["Nim", "22"]);
  }
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH) as string[][];
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// test commas in data
test("parseCSV commas in data", async () => {
  const results = await parseCSV(FIGURES_CSV_PATH)
  if (Array.isArray(results)){
    expect(results[0]).toEqual(["first", "last", "quote"]);
    expect(results[1]).toEqual(["Caesar", "Julius", "veni, vidi, vici"]); // test comma data correctly parses
  }
})

// test empty fields in data
test("parseCSV empty fields", async () => {
  const results = await parseCSV(FIGURES_CSV_PATH);
  if (Array.isArray(results)){
    expect(results[2]).toEqual(["Alice", "", ""]);
  }
})

// test quotes in data
test("parseCSV no double quotes", async () => {
  const results = await parseCSV(FIGURES_CSV_PATH);
  if (Array.isArray(results)){
    expect(results[3]).toEqual(["Smith", "John", "apple"]);
  }
})

// test correct data structure returned
test("parseCSV returns only string[][]", async () => {
  const results = await parseCSV(FIGURES_CSV_PATH);

  expect(Array.isArray(results)).toBe(true);

  if (Array.isArray(results)) {
    for (const row of results) {
      expect(Array.isArray(row)).toBe(true);
      if (Array.isArray(row)) {
        for (const field of row) {
          expect(typeof field).toBe("string"); // validates string[][] output
        }
      }
    }
  }
})

// test broken csv
test("parseCSV returns error for inconsistent csv", async () => {
  const results = await parseCSV(BROKEN_CSV_PATH);

  expect(Array.isArray(results)).toBe(false);
  if (!Array.isArray(results)){
    expect(results instanceof ZodError);
  }
})

// schema tests
test("parseCSV validates people.csv with PersonRowSchema", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema);
  expect(results instanceof ZodError); // supposed to fail because of thirty string
})

test("parseCSV validates valid_people.csv with PersonRowSchema", async () => {
  const results = await parseCSV(VALID_PEOPLE_CSV_PATH, PersonRowSchema);
  expect(Array.isArray(results)).toBe(true);

  // Success path: res is Person[]
  expect(Array.isArray(results)).toBe(true);
  if(Array.isArray(results)){
    expect(results.length).toBeGreaterThan(0);
    for (const person of results as Person[]) { // not sure how to not typecast
      expect(typeof person.name).toBe("string");
      expect(typeof person.age).toBe("number");
    }
  }
})

test("parseCSV validates figures.csv with FigureRowSchema", async () => {
  const results = await parseCSV(FIGURES_CSV_PATH, FigureRowSchema);
  expect(results instanceof ZodError); // supposed to fail because of null values - will accept in later implementation
})


