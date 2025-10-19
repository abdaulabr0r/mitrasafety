import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemoveItem?: (productId: string) => void;
  onCheckout?: () => void;
}

export default function CartSheet({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSheetProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 500000 ? 0 : 25000;
  const total = subtotal + shipping;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle data-testid="text-cart-title">
            Keranjang Belanja ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground" data-testid="text-empty-cart">
              Keranjang belanja Anda kosong
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-md border p-3"
                    data-testid={`cart-item-${item.productId}`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                      data-testid="img-cart-item"
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <h4 className="text-sm font-semibold line-clamp-2 text-foreground" data-testid="text-cart-item-name">
                        {item.name}
                      </h4>
                      <p className="text-sm font-bold text-foreground" data-testid="text-cart-item-price">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity?.(item.productId, Math.max(1, item.quantity - 1))}
                          data-testid="button-decrease-quantity"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-semibold" data-testid="text-quantity">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity?.(item.productId, item.quantity + 1)}
                          data-testid="button-increase-quantity"
                          aria-label="Tambah jumlah"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-8 w-8 text-destructive"
                          onClick={() => onRemoveItem?.(item.productId)}
                          data-testid="button-remove-item"
                          aria-label="Hapus dari keranjang"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="flex-col gap-4">
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold" data-testid="text-subtotal">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ongkos Kirim:</span>
                  <span className="font-semibold" data-testid="text-shipping">
                    {shipping === 0 ? "GRATIS" : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 500000 && (
                  <p className="text-xs text-muted-foreground">
                    Belanja {formatPrice(500000 - subtotal)} lagi untuk gratis ongkir!
                  </p>
                )}
                <div className="flex justify-between border-t pt-2 text-base font-bold">
                  <span>Total:</span>
                  <span className="text-primary" data-testid="text-total">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={onCheckout}
                data-testid="button-checkout"
              >
                Checkout
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
