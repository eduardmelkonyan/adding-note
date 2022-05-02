const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  const indexOfNote = notes.findIndex((note) => note.title === title);
  if (indexOfNote !== -1) {
    notes.splice(indexOfNote, 1);
    saveNotes(notes);
    console.log(chalk.green.inverse("Note removed"));
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

const listNote = () => {
  const notes = loadNotes();
  notes.forEach((elem) => {
    console.log(elem.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((elem) => elem.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNote,
  readNote,
};
