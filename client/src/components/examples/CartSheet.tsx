import CartSheet from '../CartSheet';
import { useState } from 'react';
import helmetImage from "@assets/generated_images/Red_safety_helmet_product_photo_b5570fe7.png";
import glovesImage from "@assets/generated_images/Yellow_safety_gloves_product_photo_58de2dd7.png";

export default function CartSheetExample() {
  const [open, setOpen] = useState(true);
  
  const mockItems = [
    {
      id: "1",
      productId: "prod-1",
      name: "Helm Safety Proyek MSA V-Gard",
      price: 125000,
      quantity: 2,
      imageUrl: helmetImage,
    },
    {
      id: "2",
      productId: "prod-2",
      name: "Sarung Tangan Safety Premium",
      price: 45000,
      quantity: 1,
      imageUrl: glovesImage,
    },
  ];

  return (
    <CartSheet
      open={open}
      onOpenChange={setOpen}
      items={mockItems}
      onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
      onRemoveItem={(id) => console.log('Remove item:', id)}
      onCheckout={() => console.log('Checkout clicked')}
    />
  );
}
