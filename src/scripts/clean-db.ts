import DBInitialize from '../database/DBInitialize';

async function main() {
  console.log('Deleting all from Database...');
  await DBInitialize.deleteAll();
  console.log('Done!');
}

main();
