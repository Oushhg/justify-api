// src/services/justificationService.ts

export function justifyText(text: string, lineWidth: number = 80): string {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine: string[] = [];
    let currentLength = 0;
  
    for (const word of words) {
      if (currentLength + word.length + currentLine.length > lineWidth) {
        lines.push(justifyLine(currentLine, lineWidth));
        currentLine = [];
        currentLength = 0;
      }
      currentLine.push(word);
      currentLength += word.length;
    }
  
    if (currentLine.length > 0) {
      lines.push(currentLine.join(' ').padEnd(lineWidth, ' '));
    }
  
    return lines.join('\n');
  }
  
  function justifyLine(words: string[], lineWidth: number): string {
    if (words.length === 1) {
      return words[0].padEnd(lineWidth, ' ');
    }
  
    const totalWordsLength = words.reduce((acc, word) => acc + word.length, 0);
    const totalSpaces = lineWidth - totalWordsLength;
    const spaceBetweenWords = Math.floor(totalSpaces / (words.length - 1));
    const extraSpaces = totalSpaces % (words.length - 1);
  
    let justifiedLine = '';
  
    words.forEach((word, index) => {
      justifiedLine += word;
      if (index < words.length - 1) {
        justifiedLine += ' '.repeat(spaceBetweenWords + (index < extraSpaces ? 1 : 0));
      }
    });
  
    return justifiedLine;
  }
  