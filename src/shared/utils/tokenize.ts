export default function tokenize(name) {
  const words = name.toLowerCase().replace(/[()]/g, "").split(" ");
  const tokens: string[] = [];
  tokens.push(name);
  tokens.push(...words);

  words.forEach((word) => {
    for (let i = 3; i < word.length; i++) {
      tokens.push(word.substring(0, i));
    }
  });

  words.forEach((word1) => {
    words
      .filter((word) => word !== word1)
      .forEach((word2) => {
        tokens.push(word1 + "__" + word2);
        if (word2.length > 4) {
          tokens.push(word1 + "__" + word2.substring(0, word2.length - 1));
          tokens.push(word1 + "__" + word2.substring(0, word2.length - 2));
        }
      });
  });

  return tokens;
}
