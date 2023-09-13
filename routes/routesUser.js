const router=require('express').Router()

const {createUser,loginUser,currentUserController}=require("../controllers/authUser")
const authMiddelware = require("../middlewares/authMiddelware");



http://localhost:9000/api/user/register

router.post('/register',createUser);
router.post('/login',loginUser);
router.get('/current-user',authMiddelware,currentUserController)


module.exports=router;