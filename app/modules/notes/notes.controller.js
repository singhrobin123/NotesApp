const {getNoteByUserIdService,saveUserNotesService} = require("./notes.service");
const {encryptNote,decryptNote,iv} = require( '../../config/utils');


/**
 * Save user notes Controller
 * @param {object} req 
 * @param {object} res 
 */

const saveUserNotesController = async (req,res) => {
    try {
        
        let db = req.app.get("db");
        let id = req.params.userId;
        let {note_text} = req.body;
        const content = encryptNote(note_text);
        let response = await saveUserNotesService(db,{user_id:parseInt(id),note_text:content});
    
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
 * Get user notes Controller
 * @param {object} req 
 * @param {object} res 
 */

const getUserNotesController = async (req,res) =>{
    try {
        let db = req.app.get("db");
        let id = req.params.userId;

        let response = await getNoteByUserIdService(db,parseInt(id));
        
        if(response.length > 0){
            response =  response.map((noteObj)=>{noteObj.note = decryptNote({content:noteObj.note,iv}); return noteObj;} );
            return res.status(200).json({
               data:response 
            })
        }else{
            return res.status(500).json({
                status: "Something went wrong"
            })
        }
    } catch (e) {
        return res.status(500).json({
            status:"Something went wrong"
        })
    }
}


module.exports = {saveUserNotesController,getUserNotesController}