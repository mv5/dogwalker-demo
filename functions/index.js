const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const cors = require("cors")({
  origin: true
});
const tlvDogParkUrl = `https://www.artza.org.il/%D7%92%D7%99%D7%A0%D7%95%D7%AA-
%D7%9B%D7%9C%D7%91%D7%99%D7%9D/%D7%92%D7%99%D7%A0%D7%95%D7%AA-%D7%9B%D7%9C%D7%91%D7%99%D7%9D-
%D7%91%D7%AA%D7%9C-%D7%90%D7%91%D7%99%D7%91/`;

const runtimeOpts = {
  timeoutSeconds: 120,
  memory: "1GB"
};

exports.scrapedogparks = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    cors(req, res, async () => {
      try {
        const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
        const page = await browser.newPage();
        await page.goto(tlvDogParkUrl);
        const data = await page.evaluate(() => {
          let addresses = [];
          let elements = document.querySelectorAll(
            "table tr td:nth-child(3) a"
          );
          elements.forEach(element =>
            addresses.push(element.getAttribute("href"))
          );
          return addresses;
        });
        await browser.close();
        res.status(200).send(data);
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    });
  });
