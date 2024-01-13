import { getHistoryData } from './fetch';

const main = async () => {
  const data = await getHistoryData('TSLA');
  console.log(JSON.stringify(data, null, 2));
};
main();
