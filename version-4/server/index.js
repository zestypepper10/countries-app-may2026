import "dotenv/config";
import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();

const Pool = pg.Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Countries API Server is running!");
});

// GET newest user
app.get("/api/get-newest-user", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM users_table
      ORDER BY user_id DESC
      LIMIT 1;
      `
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to get newest user"
    });
  }
});

// POST add one user
app.post("/api/add-one-user", async (req, res) => {
  try {
    const { name, country_name, email, bio } = req.body;

    const result = await pool.query(
      `
      INSERT INTO users_table (name, country_name, email, bio)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [name, country_name, email, bio]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add user"
    });
  }
});

// GET all saved countries
app.get("/api/get-all-saved-countries", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT country_name
      FROM saved_countries;
      `
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get saved countries"
    });
  }
});

// POST save one country
app.post("/api/save-one-country", async (req, res) => {
  try {
    const { country_name } = req.body;

    const result = await pool.query(
      `
      INSERT INTO saved_countries (country_name)
      VALUES ($1)
      ON CONFLICT (country_name)
      DO NOTHING
      RETURNING *;
      `,
      [country_name]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to save country"
    });
  }
});

// POST unsave one country
app.post("/api/unsave-one-country", async (req, res) => {
  try {
    const { country_name } = req.body;

    const result = await pool.query(
      `
      DELETE FROM saved_countries
      WHERE country_name = $1
      RETURNING *;
      `,
      [country_name]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to unsave country"
    });
  }
});

// POST update country view count
app.post("/api/update-one-country-count", async (req, res) => {
  try {
    const { country_name } = req.body;

    const result = await pool.query(
      `
      INSERT INTO country_counts (country_name, count)
      VALUES ($1, 1)
      ON CONFLICT (country_name)
      DO UPDATE
      SET count = country_counts.count + 1
      RETURNING *;
      `,
      [country_name]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update country count"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});