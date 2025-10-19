import CheckoutModal from '../CheckoutModal';
import { useState } from 'react';

export default function CheckoutModalExample() {
  const [open, setOpen] = useState(true);

  return (
    <CheckoutModal
      open={open}
      onOpenChange={setOpen}
      total={295000}
      onComplete={() => {
        console.log('Order completed');
        setOpen(false);
      }}
    />
  );
}
