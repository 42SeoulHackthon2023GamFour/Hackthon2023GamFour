import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { apiRequest } from "../../lib/apiRequest";
import "./write.css";

const Write: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState<string>(
    "https://via.placeholder.com/150x150"
  );
  const history = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || body === "") {
      setErrorMsg(" fill title & Description ");
      return;
    }
    try {
      const response = await apiRequest.postWrite(title, image, body);
      console.log(response);
    } catch (e: any) {
      console.log(e);
      window.alert("fail to write");
    }
    history("/home");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actionImgCompress(e.target.files ? e.target.files[0] : null);
  };

  const handleGoBack = () => {
    history("/home");
  };

  const actionImgCompress = async (fileSrc: any) => {
    const options = {
      maxSizeMb: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(fileSrc, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);

      reader.onloadend = () => {
        const base64data = reader.result;
        if (base64data) {
          setImage(base64data.toString());
        }
      };
    } catch (error: any) {
      window.alert("fail to get Image try again.");
    }
  };

  return (
    <div className="write-container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          maxLength={20}
          onChange={handleTitleChange}
        />
        <label htmlFor="body">Description</label>
        <textarea id="body" value={body} onChange={handleBodyChange} />
        <label htmlFor="image">Image</label>
        <img src={image} className="product-card__image"></img>
        <input
          accept={"image/jpg,image/png,image/jpeg"}
          type="file"
          id="image"
          ref={fileRef}
          onChange={handleImageChange}
        />
        {errorMsg ? <p className="errorMsg">{errorMsg}</p> : null}
        <button type="submit" className="button">
          Create
        </button>
        <button className="button" onClick={handleGoBack}>
          Back
        </button>
      </form>
    </div>
  );
};

export default Write;
