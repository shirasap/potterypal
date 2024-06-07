import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AddItemPage.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function AddItemPage() {
  const navigate = useNavigate();

  async function handleSubmit(values) {
    values.user_id = 1;

    await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/pieces/`, values);
    console.log("Piece added successfully");
    navigate("/");
  }

  const handleCancel = () => {
    navigate(`/`);
  };

  return (
    <>
      <Header />
      <div>
        <h2>Add Piece</h2>
        <Formik
          enableReinitialize
          initialValues={{
            title: "",
            clay_type: "",
            stage: "",
            description: "",
            glaze: "",
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("This field is required"),
            clay_type: Yup.string().required("This field is required"),
            stage: Yup.string().required("This field is required"),
            description: Yup.string().required("This field is required"),
            glaze: Yup.string().required("This field is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
              <label htmlFor="clay_type">Clay Type</label>
              <Field type="text" name="clay_type" />
              {errors.clay_type && touched.clay_type ? (
                <div>{errors.clay_type}</div>
              ) : null}
              <div role="group" aria-labelledby="checkbox-group">
                <p>Stages completed:</p>
                <label>
                  <Field type="radio" name="stage" value="thrown" />
                  thrown
                </label>
                <label>
                  <Field type="radio" name="stage" value="trimmed" />
                  trimmed
                </label>
                <label>
                  <Field type="radio" name="stage" value="bisque" />
                  bisque
                </label>
                <label>
                  <Field type="radio" name="stage" value="glazed" />
                  glazed
                </label>
                {errors.stage && touched.stage ? (
                <div>{errors.stage}</div>
              ) : null}
              </div>
              <label htmlFor="description">Description:</label>
              <Field name="description" as="textarea" />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
              <label htmlFor="glaze">Glaze description</label>
              <Field name="glaze" as="textarea" />
              {errors.glaze && touched.glaze ? <div>{errors.glaze}</div> : null}
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit">Add Piece</button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
}
