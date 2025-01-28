import toast from "react-hot-toast";

export function handleErrors(error: unknown) {
  if (error instanceof Error) toast.error(error.message);
  else if (typeof error === "string") toast.error(error);
  else toast.error("An error occurred");
}

export function capitalizeWords(str: string) {
  return str
    .split(" ") // Divide a string em palavras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza a primeira letra e transforma o resto em minúsculo
    .join(" "); // Junta as palavras novamente
}
