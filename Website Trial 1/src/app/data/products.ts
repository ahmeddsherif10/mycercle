import kidsBodysuit from "../../assets/538a5bd1e747f5c69e5653f2a1d01c23bfe36721.png";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  size: string;
  condition: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Elegant Black Dress",
    brand: "Valentino",
    price: 8999.99,
    originalPrice: 15000.00,
    size: "M",
    condition: "Excellent",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1761574028262-6d834741bfd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGRyZXNzJTIwZmFzaGlvbiUyMGVsZWdhbnR8ZW58MXx8fHwxNzcwMDc4NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "2",
    name: "Classic White Blouse",
    brand: "Theory",
    price: 950.00,
    originalPrice: 1200.00,
    size: "S",
    condition: "Like New",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1763346757162-52d7f30f33ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJsb3VzZSUyMHNoaXJ0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzAwNzg0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "3",
    name: "Designer Denim Jeans",
    brand: "AG Jeans",
    price: 4500.00,
    originalPrice: 8000.00,
    size: "28",
    condition: "Very Good",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1602585198422-d795fa9bfd6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzAwMTAwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "4",
    name: "Luxury Leather Handbag",
    brand: "Gucci",
    price: 9500.00,
    originalPrice: 16000.00,
    size: "One Size",
    condition: "Excellent",
    category: "Designer",
    image:
      "https://images.unsplash.com/photo-1758171692659-024183c2c272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWclMjBsdXh1cnl8ZW58MXx8fHwxNzcwMDI2Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "5",
    name: "Premium Leather Jacket",
    brand: "AllSaints",
    price: 3000.00,
    originalPrice: 5000.00,
    size: "M",
    condition: "Like New",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NzAwMzE0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "6",
    name: "Kids Pants",
    brand: "Bonpoint",
    price: 1000.00,
    originalPrice: 1500.00,
    size: "6Y",
    condition: "Very Good",
    category: "Kids",
    image: "/products/kids-pants.jpg",
  },
  {
    id: "9",
    name: "Kids Cotton Bodysuit Set",
    brand: "Kiabi",
    price: 500.00,
    originalPrice: 750.00,
    size: "12M",
    condition: "Excellent",
    category: "Kids",
    image: kidsBodysuit,
  },
  {
    id: "7",
    name: "Silk Evening Gown",
    brand: "Oscar de la Renta",
    price: 895.00,
    originalPrice: 2000.00,
    size: "S",
    condition: "Excellent",
    category: "Designer",
    image:
      "https://images.unsplash.com/photo-1761574028262-6d834741bfd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGRyZXNzJTIwZmFzaGlvbiUyMGVsZWdhbnR8ZW58MXx8fHwxNzcwMDc4NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "8",
    name: "Cashmere Cardigan",
    brand: "360 Cashmere",
    price: 1000.00,

    size: "M",
    condition: "Very Good",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1763346757162-52d7f30f33ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJsb3VzZSUyMHNoaXJ0JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzAwNzg0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];