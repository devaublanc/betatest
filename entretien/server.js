const axios = require("axios");
const https = require("https");
const express = require("express");
/**
 * Format de la réponse JSON
 * [
 *   {
 *     "nom": "Nom 1",
 *   },
 *   {
 *     "nom": "Nom 2",
 *   }
 * ]
 */
(async function () {
  const app = express();

  app.get("/data", async (req, res) => {
    let organismes = getOrnanismes();

    const formations = await getFormations();

    let apprentis = null;
    getData3(data => {
      apprentis = data;
    });

    getData3(data => {
      console.log("getData3", data);
    });

    return res.json({
      organismes,
      formations: formations,
      apprentis,
    });
  });

  app.get("/formations", async (req, res) => {
    const formations = await getFormations();

    return res.json(formations);
  });

  app.get("/organismes", async (req, res) => {
    const organismes = await getOrnanismes();

    return res.json(organismes);
  });

  app.listen(4000, () =>
    console.log(`Server ready and listening on port ${4000}`)
  );
})();

async function getOrnanismes() {
  let response = await axios.get(
    "https://mocki.io/v1/cbbd831b-199c-4e48-b426-1ce8ddbf1aa5"
  );
  let organismes = response.data;

  console.log("====================================", organismes);
  for (let i = 0; i < organismes.length; i++) {
    // organismes[i].nom = organismes[i].raison_sociale;
    delete organismes[i].raison_sociale;
  }

  return organismes.map(org => {
    return {
      nom: org.nom,
    };
  });
}

async function getFormations() {
  try {
    return axios
      .get("https://mocki.io/v1/cbbd831b-199c-4e48-b426-1ce8ddbf1aa5")
      .then(response => response.data);
  } catch (e) {
    console.error(e);
  }
}

const getData3 = callback => {
  https
    .get("https://mocki.io/v1/cbbd831b-199c-4e48-b426-1ce8ddbf1aa5", resp => {
      let data = "";

      resp.on("data", chunk => {
        data += chunk;
      });

      resp.on("end", () => {
        return callback(data);
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
};
