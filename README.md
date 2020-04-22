# REST API

# Rest API -tehtävä
Tämä on REST API -tehtävän pohja.

## Ohjeita
- Projektissa on mockup-toteutus tietokannasta `db.js` . Voi käyttää sitä kehittäessäsi palvelimen toimintoja. Mockup-tietokanta ei säilytä tietoja pysyvästi, vaan se nollautuu aina palvelinta käynnistettäessä. 
- Saat generoitua `db.js`-moduulin dokumentaation näin:
    ```console
    $ npm run docs
    ```
  Dokumentaatio luodaan hakemistoon `docs`.
- Moduuli `tokens.js` sisältää funktiot yksinkertaisen JSON Web Tokenin luomiseen (`create`) ja tarkastamiseen (`verify`). 
- JWT:n allekirjoittamiseen tarvitaan salaisuus, jonka vaatimukset riippuvat käytetystä algoritmista. Moduulissa `tokens.js` esiintyvä salaisuus on tuotettu ohjelmalla `createKey.js`.
