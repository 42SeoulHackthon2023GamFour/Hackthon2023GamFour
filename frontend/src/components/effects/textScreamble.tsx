export default class Scrambler {
  private static readonly CHARACTERS = {
    DEFAULT: ["@", "#", "$", "%", "£", "&", "*", "§", "+", "_"],
    ALPHABET: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
  };

  private characters: string[] = [];
  private maxCounter = 12;

  private targetText = "";
  private scrambledText = "";
  private encodingCounters: number[] = [];
  private decodingCounters: number[] = [];
  private onScramble: ((text: string) => void) | null = null;

  private frameId: number | null = null;
  private frameIndex = 0;

  public scramble(
    text: string,
    onScramble: (text: string) => void,
    option: { characters?: string[] } | null = null
  ): void {
    if (option?.characters) {
      this.characters = [...option.characters];
    } else {
      this.characters = [...Scrambler.CHARACTERS.DEFAULT];
    }

    this.targetText = text;
    this.scrambledText = "";
    this.encodingCounters = this.generateCounters(this.scrambledText);
    this.decodingCounters = this.generateCounters(this.targetText);
    this.onScramble = onScramble;

    this.frameId = null;
    this.frameIndex = 0;

    this.frameId = requestAnimationFrame(() => this.encode());
  }

  private randomText(length: number): string {
    let text = "";
    for (let i = 0; i < length; i += 1) {
      text +=
        this.characters[Math.floor(Math.random() * this.characters.length)];
    }
    return text;
  }

  private generateCounters(text: string): number[] {
    return new Array(text.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * this.maxCounter) + 1);
  }

  private encode(): void {
    if (this.frameIndex === 0) {
      const finished =
        this.encodingCounters.reduce((acc, crr) => acc + crr, 0) === 0;
      if (finished) {
        this.frameId = requestAnimationFrame(() => this.fill());
        return;
      }

      for (let i = 0; i < this.encodingCounters.length; i += 1) {
        if (this.encodingCounters[i] === 0) {
          const temp = this.scrambledText.split("");
          temp[i] = this.randomText(1);
          this.scrambledText = temp.join("");
          continue;
        }
        this.encodingCounters[i] -= 1;
        this.onScramble?.(this.scrambledText);
      }
    }

    this.frameIndex = (this.frameIndex + 1) % 3;
    this.frameId = requestAnimationFrame(() => this.encode());
  }

  private fill(): void {
    if (this.frameIndex === 0) {
      const finished = this.scrambledText.length === this.targetText.length;
      if (finished) {
        this.frameId = requestAnimationFrame(() => this.decode());
        return;
      }

      const increase =
        this.scrambledText.length < this.targetText.length ? 1 : -1;
      this.scrambledText = this.randomText(
        this.scrambledText.length + increase
      );
      if (this.onScramble) this.onScramble(this.scrambledText);
    }

    this.frameIndex = (this.frameIndex + 1) % 2;
    this.frameId = requestAnimationFrame(() => this.fill());
  }

  private decode(): void {
    const finished = this.scrambledText === this.targetText;
    if (finished) {
      if (this.frameId) cancelAnimationFrame(this.frameId);
      return;
    }

    if (this.frameIndex === 0) {
      let decodingText = "";
      for (let i = 0; i < this.decodingCounters.length; i += 1) {
        if (this.decodingCounters[i] === 0) {
          decodingText += this.targetText[i];
          continue;
        }
        decodingText +=
          this.characters[Math.floor(Math.random() * this.characters.length)];
        this.decodingCounters[i] -= 1;
      }
      this.scrambledText = decodingText;
      if (this.onScramble) this.onScramble(this.scrambledText);
    }

    this.frameIndex = (this.frameIndex + 1) % 4;
    this.frameId = requestAnimationFrame(() => this.decode());
  }
}

