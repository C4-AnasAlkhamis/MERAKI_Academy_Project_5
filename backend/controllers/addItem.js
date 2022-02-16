const connection = require("../database/db");
const puppeteer = require("puppeteer");
// this urls for category 1
// const url1 = [
//   "https://www.its.co.uk/Hand-Tools/Hand-Tool-Sets.htm",
//   "https://www.its.co.uk/Hand-Tools/Sockets.htm",
//   "https://www.its.co.uk/Hand-Tools/Files.htm",
//   "https://www.its.co.uk/Hand-Tools/Bolt-Cutters.htm",
//   "https://www.its.co.uk/Hand-Tools/Hex-Keys.htm",
//   "https://www.its.co.uk/Hand-Tools/Dry-Lining-Tools.htm",
// ];

// // this urls for category 2
// const url2 = [
//   // "https://www.its.co.uk/Power-Tools/Air-Tools.htm",
//   "https://www.its.co.uk/Power-Tools/Mitre-Saws.htm",
//   "https://www.its.co.uk/Power-Tools/Grinders.htm",
//   "https://www.its.co.uk/Power-Tools/Multi-Tools.htm",
//   "https://www.its.co.uk/Power-Tools/SDS--Drills.htm",
// ];

// // this urls for category 3
// const url3 = [
//   "https://www.its.co.uk/SafetyWork-Wear/Helmets.htm",
//   "https://www.its.co.uk/SafetyWork-Wear/Work-Boots.htm",
//   "https://www.its.co.uk/SafetyWork-Wear/Vests--Bodywarmers.htm",
//   "https://www.its.co.uk/SafetyWork-Wear/Hi-Vis-Clothing.htm",
//   "https://www.its.co.uk/SafetyWork-Wear/Overalls--Rain-Suits.htm",
//   "https://www.its.co.uk/SafetyWork-Wear/Hi-Vis-Clothing.htm#?pi=2",
// ];
// // this urls for category 4

// const url4 = [
//   // "https://www.its.co.uk/Tool-Storage--Pouches/Tool-Boxes.htm",
//   // "https://www.its.co.uk/Tool-Storage--Pouches/Tool-Bags.htm",
//   "https://www.its.co.uk/Tool-Storage--Pouches/Tool-Holders.htm",
//   "https://www.its.co.uk/Tool-Storage--Pouches/Tool-Pouches--Belts.htm",
//   "https://www.its.co.uk/Tool-Storage--Pouches/Tool-Boxes.htm#?pi=4",
//   "https://www.its.co.uk/Tool-Storage--Pouches/Load-Carrying.htm",
// ];

// const pushItem = async (req, res) => {
//   url2.forEach(async (url, i) => {
//     const arr = [];

//     // open browser
//     const browser = await puppeteer.launch();
//     // open page
//     const page = await browser.newPage();
//     // go to url
//     await page.setDefaultNavigationTimeout(0);
//     await page.goto(url);
//     const el = await page.evaluate(() => {
//       return [
//         Array.from(document.querySelectorAll("img.imgMain")).map((x) => x.src),
//         Array.from(document.querySelectorAll("span.desc")).map(
//           (x) => x.textContent
//         ),
//         Array.from(document.querySelectorAll("span.div")).map(
//           (x) => x.textContent
//         ),
//       ];
//     });
//     console.log(el, i);
//     const [x, y, z] = await [...el];
//     for (let i = 0; i < x.length; i++) {
//       arr.push(
//         await {
//           img: x[i],
//           title: y[i],
//           price: z[i].substr(1, z[i].length - 1),
//           description: "IN STOCK",
//           category: 2,
//         }
//       );
//     }

//     if (arr.length > 0) {
//       await arr.map((obj, i) => {
//         const query = `INSERT INTO items (img, title, descriptions, category_id, price) VALUE (?,?,?,?,?)`;
//         connection.query(
//           query,
//           [obj.img, obj.title, obj.description, obj.category, obj.price],
//           (err, result) => {
//             if (err) {
//               throw err;
//             }
//             return res.status(200).json({
//               success: true,
//               message: `The carts with user `,
//             });
//           }
//         );
//       });
//     }
//     await browser.close();
//   });
// };

const pushItem = async (req, res) => {
  const { url, category } = req.body;

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
  const [x, y, z] = await [...el];
  for (let i = 0; i < x.length; i++) {
    arr.push(
      await {
        img: x[i],
        title: y[i],
        price: z[i].substr(1, z[i].length - 1),
        description: "IN STOCK",
        category: category,
      }
    );
  }

  if (arr.length > 0) {
    arr.map((obj, i) => {
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
  return res.status(200).json({
    success: true,
    message: `items pushed successfully `,
  });
};
module.exports = pushItem;
