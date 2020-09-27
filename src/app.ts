import { assert } from 'console';
import { basename } from 'path';

import * as network from './network';
import { RootObject } from './types';
import { exists } from './fs';

const appUrls: string[] = [
  'https://apps.apple.com/us/app/altos-odyssey/id1182456409',
  'https://apps.apple.com/us/app/altos-adventure/id950812012',
  'https://apps.apple.com/us/app/stack/id1080487957',
  'https://apps.apple.com/us/app/spiral-roll/id1128000355',
  'https://apps.apple.com/us/app/valleys-between/id1348135354',
  'https://apps.apple.com/us/app/blyss/id991563953',
  'https://apps.apple.com/us/app/lit-the-torch/id1182222047',
  'https://apps.apple.com/us/app/peach-share-vividly/id1067891186',
  'https://apps.apple.com/us/app/blyss/id991563953',
  'https://apps.apple.com/us/app/livefun/id1372681079',
  'https://apps.apple.com/us/app/infinite-west-puzzle-chess/id1312336623',
  'https://apps.apple.com/us/app/picsee-add-text-over-picture/id595086167',
  'https://apps.apple.com/us/app/microsoft-word/id586447913',
  'https://apps.apple.com/us/app/ava-airborne/id1327396071',
  'https://apps.apple.com/us/app/florence/id1297430468',
  'https://apps.apple.com/us/app/edpuzzle/id919598209',
  'https://apps.apple.com/us/app/spotify-stations/id1453043471',
  'https://apps.apple.com/us/app/messenger-kids/id1285713171',
  'https://apps.apple.com/us/app/camp-america/id1373156805',
  'https://apps.apple.com/us/app/fantastical-calendar-tasks/id718043190',
  'https://apps.apple.com/us/app/my-oasis-calming-and-relaxing/id1247889896',
  'https://apps.apple.com/us/app/tasks-smart-lists-reminders/id1502903102',
  'https://apps.apple.com/us/app/sushi-bar-idle/id1438089337',
  'https://apps.apple.com/us/app/two-dots/id880178264',
  'https://apps.apple.com/us/app/jakdojade/id506795511',
  'https://apps.apple.com/us/app/jakdojade-premium/id506760190',
];

const outputDir = './output';

(async () => {
  for (const url of appUrls) {
    try {
      const idStartIndex = url.lastIndexOf('id') + 2;
      const id = url.slice(idStartIndex);
      const appStoreUrl = `http://itunes.apple.com/lookup?id=${id}`;

      const lookupResult = await network.getJSON(appStoreUrl) as RootObject;
      assert(lookupResult.resultCount == 1, 'Got more than 1 result');

      const app = lookupResult.results[0];
      const name = app.trackName;
      const artworkUrl = app.artworkUrl512;

      const outputFile = `${outputDir}/${name.replace("'", '')}-${basename(artworkUrl)}`;

      const alreadyExists = await exists(outputFile);
      if (!alreadyExists) {
        await network.downloadStream(artworkUrl, outputFile);
      }
    } catch (error) {
      console.error(error);
    }
  }
})();
