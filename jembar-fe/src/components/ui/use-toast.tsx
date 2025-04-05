// This is an enhanced version with different toast types
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
};

export const toast = ({
  title,
  description,
  variant = "default",
}: ToastProps) => {
  switch (variant) {
    case "destructive":
      return sonnerToast.error(title, {
        description,
        duration: 5000,
      });
    case "success":
      return sonnerToast.success(title, {
        description,
        duration: 5000,
      });
    case "warning":
      return sonnerToast.warning(title, {
        description,
        duration: 5000,
      });
    case "info":
    case "default":
    default:
      return sonnerToast.info(title, {
        description,
        duration: 3000,
      });
  }
};
