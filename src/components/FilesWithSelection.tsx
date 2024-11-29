import { FileWithOption } from "../types";
import { returnFileSize, returnPossibleConversions } from "../utils";

interface FilesWithSelectionProps {
  files: FileWithOption[] | undefined;
  handleOptionChange: (index: number, value: string) => void;
}
export const FilesWithSelection = ({
  files,
  handleOptionChange,
}: FilesWithSelectionProps) => {
  return (
    <ul>
      {files &&
        files.map(({ file, convertTo }, index) => (
          <li key={index}>
            <span>
              {file.name}, {returnFileSize(file.size)}
            </span>
            <select
              name="options"
              value={convertTo}
              onChange={(e) => handleOptionChange(index, e.currentTarget.value)}
            >
              {returnPossibleConversions(file.type)!.map((option) => (
                <option key={option} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </select>
          </li>
        ))}
    </ul>
  );
};
