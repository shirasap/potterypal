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
  const [deleteState, setDeleteState] = useState(false)

  useEffect(() => {
    getPiece();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDeleteState(true) 
  };

  async function getPiece() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/pieces/${pieceId}`
      );
      console.log(response.data)
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

    if(deleteState){
      formData.append("delimages", values.img_id)
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
      <div className="edit">
        <h2>Edit Piece</h2>
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
            <Form className="form">
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
              <label htmlFor="clay_type">Clay Type</label>
              <Field type="text" name="clay_type" />
              {errors.clay_type && touched.clay_type ? (
                <div>{errors.clay_type}</div>
              ) : null}
              <div className="input-group">
                <label>Add New Image</label>
                <Field
                  name="upimages"
                  id="image"
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e)}
                />
                {values.images && values.images.length > 0 && (
                  <div>
                    <h3>Existing Files:</h3>
                    <img src={`${import.meta.env.VITE_LOCALHOST}/images/${values.images}`} alt="piece image" className="edit__existing-img"/>
                  </div>
                )}
              </div>
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
              <button type="submit">Update Piece</button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
}
