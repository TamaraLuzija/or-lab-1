# or-lab-1

## Baza podataka: Product catalog

### Verzija 1.0

### Autor: Tamara Luzija

### Jezik: engleski

### Licenca:

Prilikom kreiranja repozitorija na GitHub-u odabrala sam koristenje **MIT** licence koja omogucuje drugim osobama slobodno koristenje code-a koji se nalazi u repozitoriju. Licenca se nalazi u file-u LICENSE.

### Files

#### `out/results.json` JSON katalog proizvoda

#### `out/result.csv` CSV katalog proizvoda

### Atributi:

| Syntax                |                    Description                    |        Datatype |
| :-------------------- | :-----------------------------------------------: | --------------: |
| id                    |              Identifikator proizvoda              |             int |
| name                  |                  Naziv proizvoda                  |          string |
| short_description     |         Kratki opis ispod slike proizvoda         |          string |
| images                |               Lista slika proizvoda               |        string[] |
| description           |              Detaljan opis proizvoda              |          string |
| price                 |                 Cijena proizvoda                  |             int |
| stock                 |            Dostupna kolicina proizvoda            |             int |
| rating                |                 Ocijena proizvoda                 |           float |
| created_at            |   Vrijeme i datum kreiranja proizvoda u tablici   | datetime string |
| shop_id               | Identifikator trgovine u kojoj se nalazi proizvod |             int |
| shop_slug             |              Skraceni naziv trgovine              |          string |
| shop_name             |                Puni naziv trgovine                |          string |
| shop_description      |                  Generalni opis                   |          string |
| shop_background_image |             Pozadinska slika trgovine             |          string |
| shop_address          |                      Adresa                       |          string |
| shop_contact          |                      Kontakt                      |          string |
| shop_rating           |                      Ocijena                      |           float |
| shop_timezone         |     Vremenska zona u kojoj se nalazi trgovina     |          string |
| shop_created_at       |     Vrijeme i datum dodavanja trgovine u bazu     | datetime string |

## Running

### Pre-Requirement

Copy `.env.example` into `.env` and add your database credentials

### Simple shell script

```
./run.sh
```

### Manual running

#### Setup database

```sh
dropdb --if-exists or-lab
createdb or-lab

psql or-lab < schema.sql
```

#### Setup node

```sh
yarn
```

#### Seed database

```sh
node ./src/seed.js
```

#### Export database

```sh
node ./src/export.js
```
