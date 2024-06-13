import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./AddItemPage.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";


export default function AddItemPage() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState({});

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function handleSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("clay_type", values.clay_type);
    formData.append("stage", values.stage);
    formData.append("description", values.description);
    formData.append("glaze", values.glaze);
    formData.append("user_id", 1);
    formData.append("images", selectedFile);

    await axios.post(`${import.meta.env.VITE_LOCALHOST}/api/pieces/`, formData);

    navigate("/");
  }

  const handleCancel = () => {
    navigate(`/`);
  };

  return (
    <>
      <Header />
      <div className="main-content">
      <div className="add-page">
        <h2 className="add-page__heading">Add Piece</h2>
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
          {({ errors, touched, setFieldValue }) => (
            <Form className="add-form">
              <label className="add-form__label" htmlFor="title">
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="add-form__input"
                placeholder="Title"
              />
              {errors.title && touched.title ? (
                <div className="add-form__error">{errors.title}</div>
              ) : null}
              <label className="add-form__label" htmlFor="clay_type">
                Clay Type
              </label>
              <Field
                type="text"
                name="clay_type"
                className="add-form__input"
                placeholder="Clay Type"
              />
              {errors.clay_type && touched.clay_type ? (
                <div className="add-form__error">{errors.clay_type}</div>
              ) : null}
              <label htmlFor="images" className="add-form__custom-upload">
                <Field
                  name="images"
                  id="image"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e)}
                  className="add-form__upload"
                />
              </label>
              <div
                role="group"
                aria-labelledby="checkbox-group"
                className="add-form__radio-group"
              >
                <p className="add-form__label">Select stage completed:</p>
                <label className="add-form__label">
                  <Field
                    type="radio"
                    name="stage"
                    value="thrown"
                    className="add-form__radio"
                  />
                  thrown
                </label>
                <label className="add-form__label">
                  <Field
                    type="radio"
                    name="stage"
                    value="trimmed"
                    className="add-form__radio"
                  />
                  trimmed
                </label>
                <label className="add-form__label">
                  <Field
                    type="radio"
                    name="stage"
                    value="bisque"
                    className="add-form__radio"
                  />
                  bisque
                </label>
                <label className="add-form__label">
                  <Field
                    type="radio"
                    name="stage"
                    value="glazed"
                    className="add-form__radio"
                  />
                  glazed
                </label>
                {errors.stage && touched.stage ? (
                  <div className="add-form__error">{errors.stage}</div>
                ) : null}
              </div>
              <label className="add-form__label" htmlFor="description">
                Description:
              </label>
              <Field
                name="description"
                as="textarea"
                className="add-form__textarea"
                placeholder="Write any techniques or relevant details here."
              />
              {errors.description && touched.description ? (
                <div className="add-form__error">{errors.description}</div>
              ) : null}
              <label className="add-form__label" htmlFor="glaze">
                Glaze description
              </label>
              <Field
                name="glaze"
                as="textarea"
                className="add-form__textarea"
                placeholder="Write details about the glaze here."
              />
              {errors.glaze && touched.glaze ? (
                <div className="add-form__error">{errors.glaze}</div>
              ) : null}
              <div className="add-form__actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="add-form__cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="add-form__add">
                  Add Piece
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>        
      </div>

      <Footer />
    </>
  );
}
