const SQL_QUERIES = {
  
    CREATE_USER: "insert into users (username,password) values (?,?)",
    GET_USER_BY_USERNAME : "select * from users where username = ?",

}

/**
 * Service to register user
 * @param {onject} db 
 * @param {object} user 
 */

const registerUserService = (db,user) => {
    let params = Object.keys(user).map(key => user[key]);
    return db.query(SQL_QUERIES.CREATE_USER,params);
}

/**
 * Service to fetch user by username
 * @param {onject} db 
 * @param {string} username 
 */
const getUserByUserNameService = (db,username) =>{
  
    return db.query(SQL_QUERIES.GET_USER_BY_USERNAME,[username]);
}

module.exports = {registerUserService,getUserByUserNameService};