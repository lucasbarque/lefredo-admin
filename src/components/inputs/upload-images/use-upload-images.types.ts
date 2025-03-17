type Media = {
  id: string;
  title: string;
  url: string;
};

export interface UseUploadImagesProps {
  parentId: string;
  medias: Media[];
  fnDeleteImages: any;
  fnUploadImages: any;
  keyPrefix: string;
}
