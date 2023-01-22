export function convertDateDBToClient(dateDBType: string): string {
  return new Date(dateDBType).toISOString().split("T")[0];
}

export function createDateDB(): string {
  const TIME_ZONE = 3240 * 10000;
  const date = new Date();
  return new Date(+date + TIME_ZONE)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");
}
