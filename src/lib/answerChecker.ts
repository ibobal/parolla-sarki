export function getLevenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

export function getSimilarityScore(str1: string, str2: string): number {
  const distance = getLevenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 100;
  return Math.round(((maxLength - distance) / maxLength) * 100);
}

export function checkAnswer(
  userAnswer: string,
  correctAnswer: string,
  minSimilarity: number = 75
): {
  isCorrect: boolean;
  isSimilar: boolean;
  similarity: number;
} {

  if (userAnswer === correctAnswer) {
    return { isCorrect: true, isSimilar: false, similarity: 100 };
  }

  if (userAnswer.length === 0) {
    return { isCorrect: false, isSimilar: false, similarity: 0 };
  }

  const similarity = getSimilarityScore(userAnswer, correctAnswer);
  const isSimilar = similarity >= minSimilarity;

  return { isCorrect: false, isSimilar, similarity };
}
