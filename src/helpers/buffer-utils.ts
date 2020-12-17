export class BufferUtits {
  static btoa(value: string) {
    return Buffer.from(value, "binary").toString("base64");
  }

  static atob(value: string) {
    return Buffer.from(value, "base64").toString("binary");
  }
}
