import React, { ChangeEventHandler } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import styles from "./customInputStyle";

const useStyles = makeStyles(styles);

type CustomInputType = {
  labelText?: React.ReactNode;
  labelProps?: Record<string, any>;
  id?: string;
  type?: string;
  inputProps?: Record<string, any>;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  formControlProps?: Record<string, any>;
  inputRootCustomClasses?: string;
  error?: boolean;
  success?: boolean;
  white?: boolean;
  value?: any;
  onKeyDown?: (event: any) => void;
};

export default function CustomInput(props: CustomInputType) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses = "",
    success,
    handleChange,
    type,
  } = props;

  const labelClasses = clsx({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = clsx({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = clsx({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });
  const inputClasses = clsx({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  let formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = clsx(formControlProps.className, classes.formControl);
  } else {
    formControlClasses = classes.formControl;
  }
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        onChange={handleChange}
        {...inputProps}
        type={type}
      />
    </FormControl>
  );
}
