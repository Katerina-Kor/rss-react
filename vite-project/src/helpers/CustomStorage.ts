class CustomStorage {
  private value: string | null;
  private key: string;

  constructor(key: string) {
    this.key = key;
    this.value = localStorage.getItem(key);
  }

  public getValue(): string | null {
    return this.value;
  }

  public setValue(newValue: string): void {
    localStorage.setItem(this.key, newValue);
    this.value = newValue;
  }
}

const searchStringStorage = new CustomStorage('savedSearchText');

export default searchStringStorage;
