import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as styles from "./RichTextEditorStyles";

function RichTextEditor(props) {
  function handleInputChanges(event, editor) {
    const data = editor.getData();
    console.log({ data });
    props.onChange && props.onChange(data)
  }
  return (
    <styles.Container>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {
          handleInputChanges(event, editor);
        }}
      />
    </styles.Container>
  );
}

export default RichTextEditor;
