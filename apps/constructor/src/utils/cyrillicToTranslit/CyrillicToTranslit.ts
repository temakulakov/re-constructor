/* eslint-disable no-continue */
import invert from 'lodash/invert';

// More info here: https://github.com/greybax/cyrillic-to-translit-js/blob/master/CyrillicToTranslit.js
export function CyrillicToTranslit() {
  /*
  ASSOCIATIONS FOR INITIAL POSITION
  */
  const _firstLetters = {
    а: 'a',
    б: 'b',
    в: 'v',
    д: 'd',
    з: 'z',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    ь: '',
    // Russian preset
    г: 'g',
    и: 'i',
    ъ: '',
    ы: 'i',
    э: 'e',
  };

  const _reversedFirstLetters = Object.assign(invert(_firstLetters), {
    i: 'и',
    '': '',
  });

  // digraphs appearing only in initial position
  const _initialDigraphs = { е: 'ye' };

  // digraphs appearing in all positions
  const _regularDigraphs = {
    ё: 'yo',
    ж: 'zh',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ю: 'yu',
    я: 'ya',
  };

  const _firstDigraphs = { ..._regularDigraphs, ..._initialDigraphs };

  const _reversedFirstDigraphs = Object.assign(invert(_firstDigraphs));

  const _firstAssociations: Record<string, string> = Object.assign(
    _firstLetters,
    _firstDigraphs
  );

  /*
  ASSOCIATIONS FOR NON-INITIAL POSITION
  */

  const _nonFirstLetters = { ..._firstLetters, й: 'i', е: 'e' };

  const _reversedNonFirstLetters = Object.assign(invert(_firstLetters), {
    i: 'и',
    y: 'ы',
    e: 'е',
    '': '',
  });

  const _nonFirstDigraphs = _regularDigraphs;

  const _reversedNonFirstDigraphs = Object.assign(invert(_nonFirstDigraphs));

  const _nonFirstAssociations: Record<string, string> = Object.assign(
    _nonFirstLetters,
    _nonFirstDigraphs
  );

  function transform(input: string, spaceReplacement?: string) {
    if (!input) {
      return '';
    }

    // We must normalize string for transform all unicode chars to uniform form
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
    const normalizedInput = input.normalize();

    let newStr = '';
    let isWordBoundary = false;

    for (let i = 0; i < normalizedInput.length; i += 1) {
      const isUpperCaseOrWhatever =
        normalizedInput[i] === normalizedInput[i].toUpperCase();
      const strLowerCase = normalizedInput[i].toLowerCase();

      if (strLowerCase === ' ') {
        newStr += spaceReplacement || ' ';
        isWordBoundary = true;
        continue;
      }

      let newLetter: string | undefined;

      if (i === 0 || isWordBoundary) {
        newLetter = _firstAssociations[strLowerCase];
        isWordBoundary = false;
      } else {
        newLetter = _nonFirstAssociations[strLowerCase];
      }

      if (typeof newLetter === 'undefined') {
        newStr += isUpperCaseOrWhatever
          ? strLowerCase.toUpperCase()
          : strLowerCase;
      } else if (isUpperCaseOrWhatever) {
        // handle multi-symbol letters
        newLetter.length > 1
          ? (newStr += newLetter[0].toUpperCase() + newLetter.slice(1))
          : (newStr += newLetter.toUpperCase());
      } else {
        newStr += newLetter;
      }
    }
    return newStr;
  }

  function reverse(input: string, spaceReplacement?: string) {
    if (!input) {
      return '';
    }

    const normalizedInput = input.normalize();

    let newStr = '';
    let isWordBoundary = false;
    let i = 0;

    while (i < normalizedInput.length) {
      const isUpperCaseOrWhatever =
        normalizedInput[i] === normalizedInput[i].toUpperCase();
      const strLowerCase = normalizedInput[i].toLowerCase();
      const currentIndex = i;

      if (strLowerCase === ' ' || strLowerCase === spaceReplacement) {
        newStr += ' ';
        isWordBoundary = true;
        i += 1;
        continue;
      }

      let newLetter;

      const digraph = normalizedInput.slice(i, i + 2).toLowerCase();

      if (i === 0 || isWordBoundary) {
        newLetter = _reversedFirstDigraphs[digraph];
        if (newLetter) {
          i += 2;
        } else {
          newLetter = _reversedFirstLetters[strLowerCase];
          i += 1;
        }
        isWordBoundary = false;
      } else {
        newLetter = _reversedNonFirstDigraphs[digraph];
        if (newLetter) {
          i += 2;
        } else {
          newLetter = _reversedNonFirstLetters[strLowerCase];
          i += 1;
        }
      }

      // special cases: щ and зг
      if (
        normalizedInput.slice(currentIndex, currentIndex + 4).toLowerCase() ===
        'shch'
      ) {
        newLetter = 'щ';
        i = currentIndex + 4;
      } else if (
        normalizedInput
          .slice(currentIndex - 1, currentIndex + 2)
          .toLowerCase() === 'zgh'
      ) {
        newLetter = 'г';
        i = currentIndex + 2;
      }

      if (typeof newLetter === 'undefined') {
        newStr += isUpperCaseOrWhatever
          ? strLowerCase.toUpperCase()
          : strLowerCase;
      } else if (isUpperCaseOrWhatever) {
        // handle multi-symbol letters
        newLetter.length > 1
          ? (newStr += newLetter[0].toUpperCase() + newLetter.slice(1))
          : (newStr += newLetter.toUpperCase());
      } else {
        newStr += newLetter;
      }
    }

    return newStr;
  }

  return {
    transform,
    reverse,
  };
}
