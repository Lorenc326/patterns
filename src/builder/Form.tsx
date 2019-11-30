import React from 'react';
import { Formik, Form as LibraryForm, Field, FieldProps } from 'formik';

import { FormValidations } from './director';
import { ValidationsFactory } from './factory';

const fields: Array<keyof FormValidations> = ["name", "email", "bio", "age"];

const Input: React.FC<FieldProps<any> & { label: string, type: string }> =
  ({ field, form: { errors, touched, }, label, type }) => {
    const { name } = field;
    return (
      <div>
        <p>
          {label}
          {errors[name] && touched[name] && (
            <span style={{ color: "red", paddingLeft: 10 }}>{errors[name]}</span>
          )}
        </p>
        <input type={type} {...field} />
      </div>
    )
  };

export const Form: React.FC = () => {
  const [name, email, bio, age] = React.useMemo(() => {
    const factory = new ValidationsFactory();
    const director = new FormValidations();
    return fields.map((field => factory.createValidation(field, director)));
  }, []);

  return (
    <Formik
      initialValues={fields.reduce((a, f) => ({ ...a, [f]: undefined }), {})}
      onSubmit={v => alert("Thank you for submitting your PornHub subscription!")}
    >
      <LibraryForm>
        <Field
          name="name"
          type="text"
          label="Enter your name"
          component={Input}
          validate={(v: string) => name.validate(v)}
        />
        <Field
          name="email"
          type="email"
          label="Enter your email"
          component={Input}
          validate={(v: string) => email.validate(v)}
        />
        <Field
          name="age"
          type="number"
          label="Enter your age"
          component={Input}
          validate={(v: string) => age.validate(v)}
        />
        <Field
          name="bio"
          type="text"
          label="Enter your bio"
          component={Input}
          validate={(v: string) => bio.validate(v)}
        />
        <button type="submit">Submit</button>
      </LibraryForm>
    </Formik>
  )
};