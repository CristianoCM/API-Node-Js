global.SALT_KEY = process.env.SALT_KEY;
global.SALT_TOKEN = process.env.SALT_TOKEN;
global.EMAIL_TMPL = `Olá, <strong>{0}</strong>. Seja bem-vindo a API teste do Cristiano.`;

module.exports = {
    connectionString: 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@primeironode-xizxt.azure.mongodb.net/test?retryWrites=true',
    emailAddress: process.env.EMAIL_MASTER,
    emailPasswd: process.env.PWD_EMAIL
}