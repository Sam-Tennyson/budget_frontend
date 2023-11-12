/* eslint-disable import/no-anonymous-default-export */
import { useSnackbar } from "notistack";

let useSnackbarRef;

export const SnackbarUtilConfig = () => {
    useSnackbarRef = useSnackbar();
    return null;
};

export default {
    success(msg) {
        this.toast(msg, "success");
    },
    warning(msg) {
        this.toast(msg, "warning");
    },
    info(msg) {
        this.toast(msg, "info");
    },
    error(msg) {
        this.toast(msg, "error");
    },
    toast(msg, variant = "default") {
        useSnackbarRef.enqueueSnackbar(msg, { variant });
    },
};
