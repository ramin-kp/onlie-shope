import { toast } from "react-hot-toast";

const customToast = (type, text) => {
  if (type === "success") {
    toast.success(text);
  } else if (type === "error") {
    toast.error(text);
  }
};

export { customToast };
