import express from 'express';
import { promises as fs } from 'fs';
import { type } from 'os';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    account = {
      id: data.nextId++,
      ...account,
    };
    account.id = data.nextId;
    console.log(data, 1);
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    /*ESTUDO DE PARAMETRO
    remove a propriedade declarada
    delete data.nextId
    */
    req.query.id
      ? res.send(data.accounts[--req.query.id])
      : res.send(data.accounts);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  function locateIndex() {
    for (let i = 0; i < data.accounts.length; i++) {
      idArray.push(data.accounts[i].id);
    }
    return idArray;
  }
  try {
    let data = JSON.parse(await readFile(global.fileName));
    let newArray = [];
    if (req.query.id) {
      for (let i = 0; i < data.accounts.length; i++) {
        if (req.query.id != data.accounts[i].id) {
          newArray.push(data.accounts[i]);
        }
      }
      data.accounts = newArray;
      writeFile(global.fileName, JSON.stringify(data, null, 2));
      res.send('Indice apagado com sucesso');
    } else {
      res.send('Por favor selecione o indice a ser removido');
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
export default router;
