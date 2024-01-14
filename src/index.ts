import { getHistoryData } from './fetch';
import { findHammers } from './hammer';

const main = async () => {
  const data = await getHistoryData('TSLA');
  // console.log(JSON.stringify(data, null, 2));

  let hammerData = findHammers(data); // last 100 days
  hammerData = hammerData.map((hd) => {
    hd.t = new Date(hd.t) as any;
    return hd;
  });
  console.log(JSON.stringify(hammerData, null, 2));
  console.log(hammerData.length);
};

main();
