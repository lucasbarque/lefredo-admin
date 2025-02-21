export type FormEditorProps = {
  setUpdateHtmlContent(html: string): void;
  htmlContentInitial?: string;
  dataTestid?: string;
  label?: string;
  error?: string;
  name?: string;
  height?: string;
  maxLength?: number;
  placeholder?: string;
};

export type FormEditorRefProps = {
  cleanEditor(): void;
};
