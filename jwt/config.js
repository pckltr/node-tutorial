module.exports = {
	'secret' : process.env.NODE_TOKEN_JWT_SECRET,
	'database' : 'mongodb://' +process.env.NODE_TOKEN_JWT_DB_USER+':' +process.env.NODE_TOKEN_JWT_DB_PW+'@olympia.modulusmongo.net:27017/jobo4geR'
}