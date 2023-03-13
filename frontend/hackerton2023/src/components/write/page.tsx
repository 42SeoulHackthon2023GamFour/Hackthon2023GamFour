import { useState } from "react";
import "../../styles/write/write.css"

const Write: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send data to server
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="body">Body</label>
        <textarea id="body" value={body} onChange={handleBodyChange} />
        <label htmlFor="image">Image</label>
        <input type="file" id="image" onChange={handleImageChange} />
        <button type="submit" className="button">
          Create
        </button>
      </form>
    </div>
  );
};

export default Write;