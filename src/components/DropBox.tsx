import { DragEvent } from "react";
import "./DropBox.css";
interface Props {
  setFiles: (value: FileList | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}
export const DropBox = ({ setFiles, inputRef }: Props) => {
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles(e.dataTransfer.files);
  };
  const handleOnDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleOnClick = () => {
    inputRef.current?.click();
  };
  return (
    <div
      className="dropbox"
      onClick={handleOnClick}
      onDrop={handleOnDrop}
      onDragEnter={handleOnDragEnter}
      onDragOver={handleOnDragOver}
    >
      <span>Drop files here</span>
      <span>or</span>
      <span>Click here to upload</span>
    </div>
  );
};

export default DropBox;
