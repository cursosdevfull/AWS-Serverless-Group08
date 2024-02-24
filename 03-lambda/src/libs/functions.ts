export function handlerPath(contexto: string): string {
  const dir = process.cwd();

  const pathController = contexto
    .split(dir)[1]
    .substring(1)
    .replace(/\\/g, "/");
  return pathController;
}
