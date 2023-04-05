const operations = require('./contacts')


const argv = require("yargs").argv;

// TODO: рефакторить
const  invokeAction = async({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const data = await operations.listContacts();
            console.log('list', data);
            break;

        case "get":
            const contact = await operations.getContactById(id);
            console.log('get', contact);
            break;

        case "add":
            await operations.addContact(name, email, phone)
            break;

        case "remove":
            await operations.removeContact(id)
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);














