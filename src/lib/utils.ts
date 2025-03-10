import toast from "react-hot-toast";

export function handleErrors(error: unknown) {
  if (error instanceof Error) toast.error(error.message);
  else if (typeof error === "string") toast.error(error);
  else toast.error("An error occurred");
}
