import yup from "yup";

export default yup
  .object()
  .shape({
    name: yup
      .string()
      .min(2, "Too short (name)")
      .max(100, "Too long (name)")
      .required("Required (name)"),
    description: yup
      .string()
      .min(10, "Too short (description)")
      .max(500, "Too long (description)")
      .required("Required (description)"),
    price: yup
      .number()
      .positive("Must be positive (price)")
      .required("Required (price)"),
    stock: yup
      .number()
      .min(0, "Cannot be negative (stock)")
      .required("Required (stock)"),
    category: yup
      .string()
      .min(2, "Too short (category)")
      .max(50, "Too long (category)")
      .required("Required (category)"),
  }); 