const SQL_QUERIES = {
    SAVE_NOTE: "insert into notes (user_id,note_text) values (?,?)",
    GET_NOTES_BY_USER_ID : "select user_id,note_text As note from notes where user_id = ?",

}

/**
 * Service to save user note
 * @param {object} db 
 * @param {object} user 
 */
const saveUserNotesService = (db,user) => {
     let params = Object.keys(user).map(key => user[key]);
    return db.query(SQL_QUERIES.SAVE_NOTE,params);
}

/**
 * Service to get user note
 * @param {object} db 
 * @param {Number} user_d
 */

const getNoteByUserIdService = (db,user_id) =>{
    return db.query(SQL_QUERIES.GET_NOTES_BY_USER_ID,[user_id]);
}


module.exports = {saveUserNotesService,getNoteByUserIdService};