import * as mongodb from 'mongodb';

import encode from '@amaui/utils/encode';
import getObjectValue from '@amaui/utils/getObjectValue';
import { TObject } from '@amaui/models';

import Mongo from './Mongo';

export class AmauiMongo {
  public static Mongo_ = new Mongo();

  public static get mongo() { return this.Mongo_; }

  public static createPaginator(object: TObject, properties: string[], sort: mongodb.Sort = {}, type: 'next' | 'previous' = 'next'): string {
    const value = {};

    for (const property of properties) {
      const value_ = getObjectValue(object, property);

      if (value_ !== undefined) {
        const sortValue = sort[property];
        let operator = type === 'next' ? '$gt' : '$lt';

        if (['dsc', 'descending', -1].includes(sortValue)) operator = type === 'next' ? '$lt' : '$gt';

        value[property] = { [operator]: value_ };
      }
    }

    return encode(value);
  }
}

export default AmauiMongo;
