export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Sector = {
  id: string;
  description: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Supplier = {
  id: string;
  name: string;
  description: string;
};

export type Transaction = {
  id: string;
  product_id: string;
  set_id: number;
  quantity: string;
  created_at: string;
};

export type Image = {
  id: string;
  product_id: string;
  set_id: number;
  url: string;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  substitute: string;
  price: number;
  stock: number;
  min_stock: number;
  max_stock: number;
  location_id: string;
  height: number;
  width: number;
  depth: number;
  supplier_id: string;
  weight: number;
  category_id: string;
  sku_code: string;
  manufacturer: string;
  manufacturer_part_number: string;
  temporary_locked: boolean;
};

export type Products_Set = {
  id: string;
  name: string;
  description: string;
  sku_code: string;
  height: number;
  width: number;
  depth: number;
  price: number;
  stock: number;
  location_id: string;
  components: string;
  working_hours: number;
  in_development: boolean;
  possible_quantities: number;
  manufacturer: string;
  manufacturer_part_number: string;
  lead_time: number;
  safety_stock: number;
  status: string;
  category_id: string;
  temporary_locked: boolean;
};
