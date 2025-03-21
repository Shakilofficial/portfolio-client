/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

export const formatISODate = (date: any): string | undefined => {
  if (!date) return undefined;
  return date instanceof Date ? date.toISOString() : date;
};

export const handleFieldChange = ({
  field,
  value,
  setValue,
  getValues,
}: {
  field: string;
  value: any;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}) => {
  setValue(field, value);

  console.log("Updated Field:", field, "Value:", getValues(field));
};
