import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./EditItemPage.scss";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function EditItemPage() {
  const pieceId = useParams().id;
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const [deleteState, setDeleteState] = useState(false);

  useEffect(() => {
    getPiece();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDeleteState(true);
  };

  async function getPiece() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/pieces/${pieceId}`
      );
      console.log(response.data);
      setInitialValues(response.data);
    } catch (error) {
      console.error(`Could not fetch piece data, ${error}`);
    }
  }

  async function handleSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("clay_type", values.clay_type);
    formData.append("stage", values.stage);
    formData.append("description", values.description);
    formData.append("glaze", values.glaze);
    formData.append("user_id", 1);
    formData.append("piece_id", values.piece_id);
    formData.append("images", selectedFile);

    if (deleteState) {
      formData.append("delimages", values.img_id);
    }

    await axios.patch(
      `${import.meta.env.VITE_LOCALHOST}/api/pieces/${pieceId}`,
      formData
    );

    navigate(`/piece/${pieceId}`);
  }

  const handleCancel = () => {
    navigate(`/piece/${pieceId}`);
  };

  return (
    <>
      <Header />
      <div className="edit-page">
        <h2 className="edit-page__heading">Edit Piece</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("This field is required"),
            clay_type: Yup.string().required("This field is required"),
            stage: Yup.string().required("This field is required"),
            description: Yup.string().required("This field is required"),
            glaze: Yup.string().required("This field is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="edit-form">
              <label htmlFor="title" className="edit-form__label">
                Title
              </label>
              <Field type="text" name="title" className="edit-form__input" />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
              <label htmlFor="clay_type" className="edit-form__label">
                Clay Type
              </label>
              <Field
                type="text"
                name="clay_type"
                className="edit-form__input"
              />
              {errors.clay_type && touched.clay_type ? (
                <div>{errors.clay_type}</div>
              ) : null}
              <div className="input-group">
                <Field
                  name="upimages"
                  id="image"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e)}
                  className="edit-form__upload"
                />
                {values.images && values.images.length > 0 && (
                  <div>
                    <span className="edit-form__existing-title">
                      Existing File
                    </span>
                    <img
                      src={`${import.meta.env.VITE_LOCALHOST}/images/${
                        values.images
                      }`}
                      alt="piece image"
                      className="edit-form__existing-img"
                    />
                  </div>
                )}
              </div>
              <div
                role="group"
                aria-labelledby="checkbox-group"
                className="add-form__radio-group"
              >
                <p className="edit-form__label">Select stage completed:</p>
                <div className="edit-form__radio-buttons">
                  <label className="edit-form__radio-label">
                    <Field
                      type="radio"
                      name="stage"
                      value="thrown"
                      className="edit-form__radio"
                    />
                    thrown
                  </label>
                  <label className="edit-form__radio-label">
                    <Field
                      type="radio"
                      name="stage"
                      value="trimmed"
                      className="edit-form__radio"
                    />
                    trimmed
                  </label>
                  <label className="edit-form__radio-label">
                    <Field
                      type="radio"
                      name="stage"
                      value="bisque"
                      className="edit-form__radio"
                    />
                    bisque
                  </label>
                  <label className="edit-form__radio-label">
                    <Field
                      type="radio"
                      name="stage"
                      value="glazed"
                      className="edit-form__radio"
                    />
                    glazed
                  </label>
                  {errors.stage && touched.stage ? (
                    <div>{errors.stage}</div>
                  ) : null}
                </div>
              </div>
              <label htmlFor="description" className="edit-form__label">
                Description:
              </label>
              <Field
                name="description"
                as="textarea"
                className="edit-form__textarea"
              />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
              <label htmlFor="glaze" className="edit-form__label">
                Glaze description
              </label>
              <Field
                name="glaze"
                as="textarea"
                className="edit-form__textarea"
              />
              {errors.glaze && touched.glaze ? <div>{errors.glaze}</div> : null}
              <div className="edit-form__actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="edit-form__cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="edit-form__update">
                  Update Piece
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
}
