const ars = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

export const formatARS = (value: number) => `$${ars.format(value)}`;
