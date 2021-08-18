const express = require("express");
const path = require("path");
const router = express.Router();

//sending my portfolio other pages
router.use(
  "/firm_landing_page",
  express.static(
    path.join(
      __dirname,
      "portfolio",
      "portfolio",
      "LandingPage_FirmLanding",
      "public"
    )
  )
);

router.use(
  "/welcome_landing_page",
  express.static(
    path.join(
      __dirname,
      "portfolio",
      "portfolio",
      "LandingPage_Welcome",
      "public"
    )
  )
);

router.use(
  "/book_landing_page",
  express.static(
    path.join(
      __dirname,
      "portfolio",
      "portfolio",
      "LandingPage_myBook",
      "public"
    )
  )
);

router.use(
  "/presentation_landing_page",
  express.static(
    path.join(
      __dirname,
      "portfolio",
      "portfolio",
      "LandingPage_Present",
      "public"
    )
  )
);

router.use("*", (req, res) => {
  res.status(404).send("portfolio item is not found");
});

module.exports = router;
