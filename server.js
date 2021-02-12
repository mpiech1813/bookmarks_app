const express = require('express');
const pg = require('pg');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');
const { STRING, TEXT } = Sequelize;

const db = new Sequelize('postgres://localhost:5432/bookmark');

const run = async () => {
  await db.authenticate();

  await db.close();
};

run();
