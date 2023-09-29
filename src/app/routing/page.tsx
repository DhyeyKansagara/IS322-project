import React, { FC, useState, useEffect } from 'react';
import { marvelHash, marvelApiKey } from '../utils/md5hash';

interface Comic {
  id: number;
  title: string;
  description: string;
}

interface Page2Props {
  comics: Comic[];
}

const Page2: FC<Page2Props> = async () => {

  const comics = await getComics();
  return (
    <div>
      <h1>Marvel Comics</h1>
      <ul>
        {comics.map((comic) => (
          <li key={comic.id}>
            {comic.title} - {comic.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page2;

async function getComics() {
  // Your Marvel API parameters
  const ts = 1;
  const apikey = marvelApiKey;
  const hash = marvelHash; // Typically md5(ts+privateKey+publicKey)

  const response = await fetch(
    `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apikey}&hash=${hash}`
  );
  const data = await response.json();
  console.log(`data: ${data}`);
  const comics = data.data.results as Comic[];

  return comics;
}



