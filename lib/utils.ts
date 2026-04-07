/**
 * Formatea un valor numérico a un formato de moneda, por defecto Pesos Chilenos (CLP).
 *
 * @param value - El número a formatear.
 * @param currency - El código de la moneda (ISO 4217). Por defecto es 'CLP'.
 * @returns El valor formateado como cadena de texto. En caso de error, retorna un fallback simple.
 *
 * @example
 * formatCurrency(1500) // "$ 1.500" (dependiendo de la implementación de Intl en el sistema)
 * formatCurrency(25.5, 'USD') // "USD 25,50"
 *
 */
import daysjs from "dayjs";

export const formatCurrency = (
  value: number,
  currency: string = "CLP",
): string => {
  try {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: currency,
      // Los pesos chilenos normalmente no usan decimales
      minimumFractionDigits: currency === "CLP" ? 0 : 2,
      maximumFractionDigits: currency === "CLP" ? 0 : 2,
    }).format(value);
  } catch (error) {
    console.error("Error formatting currency:", error);
    // Fallback en caso de que Intl falle o la moneda no sea válida
    const formattedValue = value.toLocaleString("es-CL", {
      minimumFractionDigits: currency === "CLP" ? 0 : 2,
    });
    return `${currency} $${formattedValue}`;
  }
};

export const formatSubscriptionDateTime = (value?: string): string => {
  if (!value) return "Not provided";
  const parseDate = daysjs(value);
  return parseDate.isValid() ? parseDate.format("DD/MM/YYYY") : "Not provided";
};

export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};
