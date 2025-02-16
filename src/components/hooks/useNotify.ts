import { useSnackbar, VariantType } from "notistack";

const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();

  const getNotified = (message: string, variant: VariantType = "success") => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  return getNotified;
};

export default useNotify;
