export function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export function readingTime(body: string): number {
  const chineseCharacters = body.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latinWords = body.replace(/[\u3400-\u9fff]/g, ' ').match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(chineseCharacters / 300 + latinWords / 200));
}
