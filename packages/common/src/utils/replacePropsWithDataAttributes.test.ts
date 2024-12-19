import { JSONValue } from '~types/common';
import { dataAttributes } from '~constants';
import { replacePropsWithDataAttributes } from './replacePropsWithDataAttributes';

describe('Replace attributes', () => {
  it('Simple object', () => {
    const obj = {
      lol: 'kek',
      $id: 2,
    };

    const result = {
      lol: 'kek',
      [dataAttributes.id]: 2,
    };

    expect(replacePropsWithDataAttributes(obj)).toEqual(result);
  });

  it('Nested object', () => {
    const obj = {
      lol: 'kek',
      value: {
        $id: 2,
      },
    };

    const result = {
      lol: 'kek',
      value: {
        [dataAttributes.id]: 2,
      },
    };

    expect(replacePropsWithDataAttributes(obj)).toEqual(result);
  });

  it('Nested object inside array', () => {
    const obj: JSONValue = {
      lol: 'kek',
      value: [
        {
          kek: 'lol',
          $id: 2,
        },
        {
          some: 'thing',
        },
      ],
    };

    const result = {
      lol: 'kek',
      value: [
        {
          kek: 'lol',
          [dataAttributes.id]: 2,
        },
        {
          some: 'thing',
        },
      ],
    };

    expect(replacePropsWithDataAttributes(obj)).toEqual(result);
  });

  it('Even more nested object inside array inside object', () => {
    const obj: JSONValue = {
      lol: 'kek',
      value: {
        value: [
          {
            kek: 'lol',
            $id: 2,
          },
          {
            some: 'thing',
          },
        ],
      },
    };

    const result = {
      lol: 'kek',
      value: {
        value: [
          {
            kek: 'lol',
            [dataAttributes.id]: 2,
          },
          {
            some: 'thing',
          },
        ],
      },
    };

    expect(replacePropsWithDataAttributes(obj)).toEqual(result);
  });
});
