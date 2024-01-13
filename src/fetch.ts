import axios from 'axios';
import fs from 'fs';
import path from 'path';

const getDateString = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const getHistoryData = async (ticker: string) => {
  const today = getDateString();
  const fileName = path.join(__dirname, '..', 'cache', `${ticker}-${today}.json`);
  if (fs.existsSync(fileName)) {
    const data = fs.readFileSync(fileName, 'utf-8');
    return JSON.parse(data);
  }
  console.log(`Fetching data for ${ticker}...`);
  const r = await axios.get(
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2000-01-01/${today}?apiKey=${process.env.POLYGON_API_KEY}`,
  );

  const result = r.data.results;
  fs.writeFileSync(fileName, JSON.stringify(result, null, 2));
  return result;
};
