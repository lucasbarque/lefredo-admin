export interface UpdateCategoryPageParams {
  params: Promise<{
    id: string;
  }>;
}

export interface FormUpdateCategoryProps {
  initialData: {
    id: string;
    title: string;
    description: string | null;
  };
}
