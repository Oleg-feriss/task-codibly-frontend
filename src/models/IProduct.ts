interface IData {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface IProduct {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IData[]; 
}