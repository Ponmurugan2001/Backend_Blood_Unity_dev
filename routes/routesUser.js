const router=require('express').Router()

const {createUser,loginUser,currentUserController,getAllUserController,deleteUserController}=require("../controllers/authUser")
const authMiddelware = require("../middlewares/authMiddelware");



http://localhost:9000/api/user/register

router.post('/register',createUser);
router.post('/login',loginUser);
router.get('/current-user',authMiddelware,currentUserController)
router.get('/get-all-user',getAllUserController);
router.post('/delete-user/:userid',deleteUserController);
module.exports=router;