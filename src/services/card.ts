
import { AutoWired, Singleton } from 'typescript-ioc';
import * as YAML from 'yamljs';
import * as FuzzySet from 'fuzzyset.js';

import { BaseService } from '../base/BaseService';
import { ICard } from '../interfaces';

@Singleton
@AutoWired
export class CardService extends BaseService {

  private cardsByName: { [key: string]: ICard } = {};
  private set: FuzzySet = new FuzzySet();

  public async init(client) {
    super.init(client);

    this.loadCards();
  }

  public getCard(name: string): ICard {
    const res = this.set.get(name);
    if (!res) { return null; }

    return this.cardsByName[res[0][1]];
  }

  private loadCards() {
    const cards = YAML.load('content/cards.yml');

    cards.forEach((card) => {
      this.cardsByName[card.name] = card;
      this.set.add(card.name);
    });
  }

}
