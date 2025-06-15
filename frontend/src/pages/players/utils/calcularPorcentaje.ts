export const calcularPuntaje = (statsArray: any, pesos: any) => {
  if (!statsArray || statsArray.length === 0 || !pesos) return 0;

  let total = 0;
  let pesoAcumulado = 0;

  for (const { label, value } of statsArray) {
    const peso = pesos[label] ?? 1;
    total += peso * value;
    pesoAcumulado += peso;
  }

  if (pesoAcumulado === 0) return 0;

  return Math.round(total / pesoAcumulado);
};