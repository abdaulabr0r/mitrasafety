import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onComplete?: () => void;
}

export default function CheckoutModal({
  open,
  onOpenChange,
  total,
  onComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    province: "",
    city: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("transfer");

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete?.();
    setStep(1);
    setShippingData({
      name: "",
      phone: "",
      email: "",
      address: "",
      province: "",
      city: "",
      postalCode: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="text-checkout-title">Checkout</DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-1 items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                      step >= s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                    data-testid={`step-indicator-${s}`}
                  >
                    {step > s ? <Check className="h-4 w-4" /> : s}
                  </div>
                  <span
                    className={`hidden text-sm sm:inline ${
                      step >= s ? "font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s === 1 && "Pengiriman"}
                    {s === 2 && "Pembayaran"}
                    {s === 3 && "Konfirmasi"}
                  </span>
                </div>
                {s < 3 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      step > s ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Informasi Pengiriman</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    value={shippingData.name}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, name: e.target.value })
                    }
                    placeholder="Masukkan nama lengkap"
                    data-testid="input-name"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingData.phone}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, phone: e.target.value })
                      }
                      placeholder="08xxxxxxxxxx"
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingData.email}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, email: e.target.value })
                      }
                      placeholder="email@example.com"
                      data-testid="input-email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat Lengkap *</Label>
                  <Textarea
                    id="address"
                    value={shippingData.address}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, address: e.target.value })
                    }
                    placeholder="Jalan, nomor rumah, RT/RW, kelurahan"
                    rows={3}
                    data-testid="input-address"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="province">Provinsi *</Label>
                    <Select
                      value={shippingData.province}
                      onValueChange={(value) =>
                        setShippingData({ ...shippingData, province: value })
                      }
                    >
                      <SelectTrigger id="province" data-testid="select-province">
                        <SelectValue placeholder="Pilih provinsi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                        <SelectItem value="jabar">Jawa Barat</SelectItem>
                        <SelectItem value="jateng">Jawa Tengah</SelectItem>
                        <SelectItem value="jatim">Jawa Timur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Kota/Kabupaten *</Label>
                    <Select
                      value={shippingData.city}
                      onValueChange={(value) =>
                        setShippingData({ ...shippingData, city: value })
                      }
                    >
                      <SelectTrigger id="city" data-testid="select-city">
                        <SelectValue placeholder="Pilih kota" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem>
                        <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
                        <SelectItem value="bandung">Bandung</SelectItem>
                        <SelectItem value="surabaya">Surabaya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Kode Pos *</Label>
                    <Input
                      id="postalCode"
                      value={shippingData.postalCode}
                      onChange={(e) =>
                        setShippingData({ ...shippingData, postalCode: e.target.value })
                      }
                      placeholder="12345"
                      data-testid="input-postal-code"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Metode Pembayaran</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 rounded-md border p-4 hover-elevate">
                    <RadioGroupItem value="transfer" id="transfer" data-testid="radio-transfer" />
                    <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Transfer Bank</div>
                      <div className="text-sm text-muted-foreground">
                        BCA, Mandiri, BNI, BRI
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 rounded-md border p-4 hover-elevate">
                    <RadioGroupItem value="ewallet" id="ewallet" data-testid="radio-ewallet" />
                    <Label htmlFor="ewallet" className="flex-1 cursor-pointer">
                      <div className="font-semibold">E-Wallet</div>
                      <div className="text-sm text-muted-foreground">
                        GoPay, OVO, Dana, ShopeePay
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 rounded-md border p-4 hover-elevate">
                    <RadioGroupItem value="cod" id="cod" data-testid="radio-cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-semibold">COD (Cash on Delivery)</div>
                      <div className="text-sm text-muted-foreground">
                        Bayar saat barang diterima
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Konfirmasi Pesanan</h3>
              <div className="space-y-4 rounded-md border p-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Informasi Pengiriman</h4>
                  <dl className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Nama:</dt>
                      <dd className="font-medium" data-testid="text-confirm-name">{shippingData.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Telepon:</dt>
                      <dd className="font-medium" data-testid="text-confirm-phone">{shippingData.phone}</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="text-muted-foreground">Alamat:</dt>
                      <dd className="font-medium" data-testid="text-confirm-address">
                        {shippingData.address}, {shippingData.city}, {shippingData.province}{" "}
                        {shippingData.postalCode}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-foreground mb-2">Metode Pembayaran</h4>
                  <p className="text-sm" data-testid="text-confirm-payment">
                    {paymentMethod === "transfer" && "Transfer Bank"}
                    {paymentMethod === "ewallet" && "E-Wallet"}
                    {paymentMethod === "cod" && "COD (Cash on Delivery)"}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Pembayaran:</span>
                    <span className="text-primary" data-testid="text-confirm-total">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            data-testid="button-back"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
          {step < 3 ? (
            <Button onClick={handleNext} data-testid="button-next">
              Lanjut
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleComplete} data-testid="button-complete-order">
              Selesaikan Pesanan
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
