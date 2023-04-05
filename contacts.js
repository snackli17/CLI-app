const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');
const contactsDir = path.dirname('./contacts.js');
const contactsPath = path.join(contactsDir, 'db/contacts.json')


const listContacts = async () => {
    const dataString = await fs.readFile(contactsPath);
    const data = JSON.parse(dataString);
    return data;
}

const getContactById = async (contactId) => {
    const allContacts = await listContacts();
    const index = allContacts.find(contact => contact.contactId === contactId);
    return index ? index : null;
}



const removeContact = async (contactId) => {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === contactId);
    const DeletedContact = allContacts[index];
    if (index != -1) {
        allContacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    }
    return DeletedContact ? DeletedContact : null;
}


const addContact = async (name, email, phone) => {
    const newContact = {
        id: uuid.v4(),
        email: email,
        name: name,
        phone: phone,
    };
    const allContacts = await listContacts();
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
}


module.exports = {
    listContacts, getContactById, removeContact, addContact
}