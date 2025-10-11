CREATE DATABASE food_picker_db;

CREATE TABLE Foods(
    id int PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    eat_time VARCHAR(255),
    rate INT,
    min_price MONEY,
    max_price MONEY,
    healthy INT,
    difficulty INT,
    approximate_preparation_time VARCHAR(50)
)

CREATE TABLE Recipes(
    id int PRIMARY KEY,
    procedures VARCHAR(max),
    food_id INT,
    FOREIGN KEY(food_id) REFERENCES Foods(id)
)

CREATE TABLE Recipe_ingredients(
    id INT PRIMARY KEY,
    quantity INT NOT NULL,
    is_optional BIT DEFAULT 0,
    id_recipie INT,
    id_ingredient INT,
    unit VARCHAR(50),
    FOREIGN KEY(id_recipie) REFERENCES Recipes(id),
    FOREIGN KEY(id_ingredient) REFERENCES Ingredients(id),
    UNIQUE(id_recipie, id_ingredient)
)

CREATE TABLE Ingredients(
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    unit VARCHAR(50) NOT NULL --Unidad de medida del ingrediente
)