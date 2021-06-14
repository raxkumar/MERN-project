const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenrticated , isAdmin} = require("../controllers/auth")
const {getUserById, pushOrderInPurchaseList, getUser } = require("../controllers/user")
const {updateStock} = require("../controllers/product")
const {getOrderById, createOrder, getAllOrders, getOrderStatus ,updateStatus} = require("../controllers/order")

//params
router.param("userId", getUserById)
router.param("orderId", getOrderById)


//actual routes
//create
router.post(
    "/order/create/:userId", 
    isSignedIn, 
    isAuthenrticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
);

//read
router.get("/order/all/:userId", isSignedIn, isAuthenrticated, isAdmin, getAllOrders)

//status of order
router.get("/order/status/:userId", isSignedIn, isAuthenrticated, isAdmin, getOrderStatus )
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenrticated, isAdmin, updateStatus)



module.exports = router;