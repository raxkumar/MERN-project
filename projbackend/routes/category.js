const express = require("express")
const router = express.Router()

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} =require("../controllers/category")
const {isSignedIn, isAdmin, isAuthenrticated} =require("../controllers/auth")
const {getUserById} =require("../controllers/user")

//parmas
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routers goes here...
router.post("/category/create/:userId", isSignedIn, isAuthenrticated, isAdmin, createCategory);

//read routues
router.get("/category/:categoryId", getCategory)
router.get("/categories/", getAllCategory)

//update routes
router.put("/category/:categoryId/:userId",isSignedIn, isAuthenrticated, isAdmin, updateCategory)

//delete routes
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenrticated, isAdmin, removeCategory);


module.exports = router;