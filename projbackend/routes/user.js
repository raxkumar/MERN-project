const express = require("express");
const router = express.Router();

const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user");
const {isSignedIn,isAuthenrticated, isAdmin } = require("../controllers/auth");

router.param("userId",getUserById);

router.get("/user/:userId", isSignedIn, isAuthenrticated, getUser);

// router.get("/users",getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenrticated, updateUser);

router.put("orders/user/:userId", isSignedIn, isAuthenrticated, userPurchaseList);

module.exports = router;
