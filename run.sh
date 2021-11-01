#!/bin/sh

DB_USER="$(cat .env | grep DB_USER | cut -c 9-)"
DB_PASS="$(cat .env | grep DB_PASS | cut -c 9-)"

rm out/result.csv
rm out/result.json

export PGPASSWORD=$DB_PASS

dropdb --if-exists -U $DB_USER or-lab
createdb -U $DB_USER or-lab

psql -U $DB_USER or-lab < schema.sql

node ./src/seed.js
node ./src/export.js