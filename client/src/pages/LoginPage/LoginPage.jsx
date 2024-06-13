import "./LoginPage.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
            sessionStorage.setItem("login", "true")
            navigate("/");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <form noValidate onSubmit={handleSubmit} className="login__form">
              <h2 className="login__heading">Login</h2>
              <label htmlFor="email" className="login__label">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter email id / username"
                className="login__input"
                id="email"
              />
              <p className="login__error">
                {errors.email && touched.email && errors.email}
              </p>
              <label htmlFor="password" className="login__label">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter password"
                className="login__input"
              />

              <p className="login__error">
                {errors.password && touched.password && errors.password}
              </p>

              <button type="submit" className="login__button">
                Login
              </button>
            </form>
          </div>
        )}
      </Formik>
      <Footer />.
    </>
  );
}
