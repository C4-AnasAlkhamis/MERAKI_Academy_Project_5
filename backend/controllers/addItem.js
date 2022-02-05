const connection = require("../database/db");
const puppeteer = require("puppeteer");
// this urls for category 1
const url1 = [
  "https://www.its.co.uk/Hand-Tools/Files.htm",
  "https://www.its.co.uk/Hand-Tools/Hand-Tool-Sets.htm",
  "https://www.its.co.uk/Hand-Tools/Hex-Keys.htm",
  "https://www.its.co.uk/Hand-Tools/Dry-Lining-Tools.htm",
];

// this urls for category 2
const url2 = [
  "https://www.its.co.uk/Power-Tools/Air-Tools.htm",
  "https://www.its.co.uk/Power-Tools/Grinders.htm",
  "https://www.its.co.uk/Power-Tools/Multi-Tools.htm",
  "https://www.its.co.uk/Power-Tools/SDS--Drills.htm",
];

// this urls for category 3
const url3 = [
  "https://www.its.co.uk/SafetyWork-Wear/Work-Boots.htm",
  "https://www.its.co.uk/SafetyWork-Wear/Helmets.htm",
  "https://www.its.co.uk/SafetyWork-Wear/Hi-Vis-Clothing.htm",
  "https://www.its.co.uk/SafetyWork-Wear/Hi-Vis-Clothing.htm#?pi=2",
];

// this urls for category 4
const url4 = [
  "https://www.its.co.uk/Tool-Storage--Pouches/Tool-Boxes.htm",
  "https://www.its.co.uk/Tool-Storage--Pouches/Storage-Cases.htm",
  "https://www.its.co.uk/Tool-Storage--Pouches/Tool-Boxes.htm#?pi=2",
  "https://www.its.co.uk/Tool-Storage--Pouches/Storage-Cases.htm#?pi=3",
];

// this urls for category 5
const url5 = [
  "https://www.its.co.uk/Plumbing/Plumbing-Tools.htm#?pi=3",
  "https://www.its.co.uk/Plumbing/Plastic-Fittings/",
  "https://www.its.co.uk/Plumbing/Plumbing-Consumables.htm",
  "https://www.its.co.uk/Plumbing/Plumbing-Tools.htm",
];
const pushItem = async (req, res) => {
  url4.forEach(async (url, i) => {
    const arr = [];

    // open browser
    const browser = await puppeteer.launch();
    // open page
    const page = await browser.newPage();
    // go to url
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    const el = await page.evaluate(() => {
      return [
        Array.from(document.querySelectorAll("img.imgMain")).map((x) => x.src),
        Array.from(document.querySelectorAll("span.desc")).map(
          (x) => x.textContent
        ),
        Array.from(document.querySelectorAll("span.div")).map(
          (x) => x.textContent
        ),
      ];
    });
    console.log(el, i);
    const [x, y, z] = await [...el];
    for (let i = 0; i < x.length; i++) {
      arr.push(
        await {
          img: x[i],
          title: y[i],
          price: z[i].substr(1, z[i].length - 1),
          description: "this is a Safety Work Wear",
          category: 4,
        }
      );
    }
    if (arr.length > 0) {
      await arr.map((obj) => {
        const query = `INSERT INTO items (img, title, descriptions, category_id, price) VALUE (?,?,?,?,?)`;
        connection.query(
          query,
          [obj.img, obj.title, obj.description, obj.category, obj.price],
          (err, result) => {
            if (err) {
              throw err;
            }
          }
        );
      });
    }
    await browser.close();
  });
};

module.exports = pushItem;
