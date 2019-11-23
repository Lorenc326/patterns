import React from 'react';
import { Formik, Form as LibraryForm, Field, FieldProps } from 'formik';
import { Boi, Validator } from './Boi';

// Director class
// completes builder steps to get concrete products
class FormValidations {
  // construct methods:
  name(builder: Boi) {
    builder.required().string().max(15).min(3).idiot();
  }
  email(builder: Boi) {
    builder.required().string().email();
  }
  bio(builder: Boi) {
    builder.string().max(250);
  }
  age(builder: Boi) {
    builder.number().min(18);
  }
}

// ha-ha! Factory class
class ValidationsFactory {
  createValidation(method: keyof FormValidations): Validator {
    const director = new FormValidations();
    if (director[method]) {
      const builder = new Boi();
      director[method](builder);
      return builder.getResult();
    }
    // empty validator
    return new Validator();
  }
}

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

const fields: Array<keyof FormValidations> = ["name", "email", "bio", "age"];

export const Form: React.FC = () => {
  const [name, email, bio, age] = React.useMemo(() => {
    const factory = new ValidationsFactory();
    return fields.map((f => factory.createValidation(f)));
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