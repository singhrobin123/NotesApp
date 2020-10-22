const {registerUserService,getUserByUserNameService} = require("./users.service");
const { hash,compare } = require("bcrypt");


/**
 * Registration controller
 * @param {Object} req 
 * @param {Object} res 
 */
const registerUserController = async (req,res) => {
    try {
        console.log(req.body);
        let db = req.app.get("db");
        let {username,password} = req.body;

        let hashedPassword = await hash(password,10);
        password = hashedPassword;

        let response = await registerUserService(db,{username:username,password:password});

        if(response.insertId){
            return res.status(200).json({
                'status': 'account created'
            })
        }else{
            return res.status(500).json({
                status: "Something went wrong"
            })
        }

    } catch (e) {
        return res.status(500).json({

            status: "Something went wrong"
        })
    }
}


/**
 * Login controller
 * @param {Object} req 
 * @param {Object} res 
 */
const loginUserController = async (req,res) =>{
    try {
        let db = req.app.get("db");

        let {username,password} = req.body;
      
        let fetchedUser = await getUserByUserNameService(db,username);
       
        // If user don't exists
        if(fetchedUser.length == 0){
            return res.json({
                status:"User don't exist"
            })
        }else{
            // When user exists
            let isPasswordValid = await compare(password,fetchedUser[0].password);

            if(!isPasswordValid){
                return res.status(200).json({
                    status:"Invalid username or password"
                })
            }else{
        
                return res.status(200).json({
                    'status': 'success',
                    'userId': fetchedUser[0].id
                })
            }
        }
    } catch (e) {
        return res.status(500).json({
              status:"Something went wrong"
        })
    }
}


module.exports = {registerUserController,loginUserController}