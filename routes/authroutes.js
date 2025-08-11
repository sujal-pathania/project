const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "navbar.html"));
});
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "signup.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "login.html"));
});
router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "about.html"));
});
router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "contact.html"));
});
router.get("/trialform", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "trialform.html"));
});
router.get("/features", (req, res) => {
  if (req.session && req.session.IsLoggedIn) {
    res.sendFile(path.join(__dirname, "../view", "features.html"));
  } else {
    res.redirect("/login");
  }
});
router.get("/discoverc", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "discoverc.html"));
});
router.get("/discoverh", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "discoverh.html"));
});
router.get("/discoveri", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "discoveri.html"));
});
router.get("/navbar", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "navbar.html"));
});

router.get("/standard", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "standard.html"));
});
router.get("/classic", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "classic.html"));
});
router.get("/hunter", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "hunter.html"));
});
router.get("/super", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "super.html"));
});
router.get("/himalayan", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "himalayan.html"));
});
router.get("/meteor", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "meteor.html"));
});
router.get("/gt", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "gt.html"));
});
router.get("/interceptor", (req, res) => {
  res.sendFile(path.join(__dirname, "../view", "interceptor.html"));
});

router.post("/signup", (req, res) => {
  try {
    fs.readFile(path.join(__dirname, "../data.json"), "utf-8", (err, data) => {
      data = JSON.parse(data);
      
      let userdata = data.find((ele) => ele.name === req.body.name);
      if (req.body.password !== req.body.confirm) {
        return res.json({ message: "password do not match" });
      }
      if (userdata) {
        res.sendFile(path.join(__dirname,"../view","login.html"))
      } else {
        data.push(req.body);
        fs.writeFile(path.join(__dirname, "../data.json"),JSON.stringify(data, null, 2),(err) => {
            if (!err) {
              res.json({ messege: "user created " });
            }
          }
        );
      }
    });
  } catch (error) {
    res.json({ messege: "server error " });
  }

});
router.post("/login", (req, res) => {
  try {
    fs.readFile(path.join(__dirname, "../data.json"), "utf-8", (err, data) => {
      if (err) {
        console.log("File read error:", err);
        return res.json({ message: "server error" });
      }
      data = JSON.parse(data);
      let user = data.find((ele) => ele.name === req.body.name);
      if (user) {
        if (user.password === req.body.password) {
          req.session.IsLoggedIn = true;
          res.redirect("/features");
        } else {
          res.send("invalid password");
        }
      } else {
        res.redirect("/signup");
      }
    });
  } catch (error) {
    console.log("Catch error:", error);
    res.json({ message: "server error" });
  }
});
router.post("/contact", (req, res) => {
  console.log("req.body:", req.body);
  try {
    fs.readFile(path.join(__dirname, "../contact.json"),"utf-8",(err, fileData) => {
        if (err) {
          return res.status(500).json({ message: "Read error" });
        }

        let data = JSON.parse(fileData || "[]");

        let name = data.find(
          (ele) =>
            ele.email === req.body.email && ele.message === req.body.message
        );

        if (name) {
          return res.json({ message: "Message already submitted" });
        }

        data.push(req.body);
        fs.writeFile(
          path.join(__dirname, "../contact.json"),
          JSON.stringify(data, null, 2),
          (err) => {
            if (err) {
              return res.status(500).json({ message: "Write error" });
            }
            res.json({ message: "Message received" });
          }
        );
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.post('/contact',(req,res)=>{
//     const {name,email,message}=req.body;
//     console.log("contact",{name,email,message});
//     res.send("messege sent")
// })

router.post("/trial", (req, res) => {
  try {
    const {
      bikeModel,
      firstName,
      lastName,
      email,
      phone,
      // address,city,state,pincode,preferredDate,preferredTime
    } = req.body;
    console.log("ride data", req.body);
    res.send(`<h1> thank you${firstName} ${lastName}</h1> 
            <p>
            test drive for bike  <h3> ${
              bikeModel || "Royal Enfield"
            }</h3> has received </p>
            <p>soon we will contact you <h3>${phone}</h3> or <h3>${email}</h3></p>`);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});
module.exports = router;
