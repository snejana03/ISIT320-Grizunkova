var csv = require("./Csv");

var csvs = ["GameData.csv", "GameData.tsv"];

var json = csv.parse(csvs[0], 'csv');

csv.writeJson("GameData.json", json);

csv.writeHtml("GameData.html", json);