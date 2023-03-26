import * as Yup from "yup";

export const formValues = {
  firstname: "",
  lastname: "",
  phoneNumber: "",
  rentDue: "",
  rentPaid: "",
  location: "",
};

export const validation = () =>
  Yup.object({
    firstname: Yup.string().required("Sorry the firstname is required"),
    lastname: Yup.string().required("Sorry the lastname is required"),
    phoneNumber: Yup.string().required("Sorry the phoneNumber is required"),
    rentDue: Yup.number().required("Sorry the rentDue is required"),
    location: Yup.string().required("Sorry the location is required"),
  });
