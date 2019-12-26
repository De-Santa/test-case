export const funcString = 'function func(s, a, b) {\n' +
  '  if (s.match(/^$/)) {\n' +
  '    return -1;\n' +
  '  }\n' +
  '\n' +
  '  var i = s.length -1;\n' +
  '  var aIndex =     -1;\n' +
  '  var bIndex =     -1;\n' +
  '\n' +
  '  while ((aIndex == -1) && (bIndex == -1) && (i > 0)) {\n' +
  '    if (s.substring(i, i +1) == a) {\n' +
  '      aIndex = i;\n' +
  '    }\n' +
  '    if (s.substring(i, i +1) == b) {\n' +
  '      bIndex = i;\n' +
  '    }\n' +
  '    i = i - 1;\n' +
  '  }\n' +
  '\n' +
  '  if (aIndex != -1) {\n' +
  '    if (bIndex == -1) {\n' +
  '      return aIndex;\n' +
  '    }\n' +
  '    else {\n' +
  '      return Math.max(aIndex, bIndex);\n' +
  '    }\n' +
  '  }\n' +
  '\n' +
  '  if (bIndex != -1) {\n' +
  '    return bIndex;\n' +
  '  }\n' +
  '  else {\n' +
  '    return -1;\n' +
  '  }\n' +
  '}';

export const funcRefactorString = 'function funcRefactored(s:string, a:string, b:string) {\n' +
  '  if (!s.length) return -1;\n' +
  '\n' +
  '  for (let i = s.length - 1; i > 0; i--) {\n' +
  '    const char = s.substring(i, i + 1);\n' +
  '    if (char === a || char === b) return i;\n' +
  '  }\n' +
  '\n' +
  '  return -1;\n' +
  '}';

// @ts-ignore
export function func(s, a, b) {
  if (s.match(/^$/)) {
    return -1;
  }

  var i = s.length -1;
  var aIndex =     -1;
  var bIndex =     -1;

  while ((aIndex == -1) && (bIndex == -1) && (i > 0)) {
    if (s.substring(i, i +1) == a) {
      aIndex = i;
    }
    if (s.substring(i, i +1) == b) {
      bIndex = i;
    }
    i = i - 1;
  }

  if (aIndex != -1) {
    if (bIndex == -1) {
      return aIndex;
    }
    else {
      return Math.max(aIndex, bIndex);
    }
  }

  if (bIndex != -1) {
    return bIndex;
  }
  else {
    return -1;
  }
}

export function funcRefactored(s:string, a:string, b:string) {
  if (!s.length) return -1;

  for (let i = s.length - 1; i > 0; i--) {
    const char = s.substring(i, i + 1);
    if (char === a || char === b) return i;
  }

  return -1;
}

export const benchTests = (() => {
  const args = [];
  for (let i = 0; i < 1e5; i++) {
    args.push(['ABCDEFG', 'F', 'D']);
  }
  return args
})();

export const tests:Array<{args:Array<string>, expected: number}> = [
  {
    args: ['ABCDEFGHIJ', 'F', 'D'],
    expected: 5
  },
  {
    args: ['ABCDEFGHIJ', 'D', 'F'],
    expected: 5
  },
  {
    args: ['ABCDEFGHIJ', 'K', 'B'],
    expected: 1
  },
  {
    args: ['ABCDEFGHIJ', 'K', 'A'],
    expected: -1
  },
  {
    args: ['ABCDEFGHIJ', 'K', 'J'],
    expected: 9
  },
  {
    args: ['ABCDEFGHIJ', 'B', 'K'],
    expected: 1
  },
  {
    args: ['ABCDEFGHIJ', 'A', 'K'],
    expected: -1
  },
  {
    args: ['ABCDEFGHIJ', 'J', 'K'],
    expected: 9
  },
  {
    args: ['ABCDEFGHIJ', 'F', 'F'],
    expected: 5
  },
  {
    args: ['ABCDEFGHIJ', 'B', 'I'],
    expected: 8
  },
  {
    args: ['ABCDEFGHIJ', 'K', 'K'],
    expected: -1
  }
];
