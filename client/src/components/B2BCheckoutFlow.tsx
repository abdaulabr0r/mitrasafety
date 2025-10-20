import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Building2, CreditCard, Truck, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface B2BCheckoutFlowProps {
  cartItems: any[];
  subtotal: number;
  onComplete: (orderData: any) => void;
}

interface CompanyInfo {
  companyName: string;
  taxId: string;
  purchaseOrderNumber: string;
  department: string;
  approverName: string;
  approverEmail: string;
}

interface EmployeeSubsidy {
  employeeId: string;
  employeeName: string;
  allowanceBalance: number;
  maxAllowance: number;
}

export default function B2BCheckoutFlow({ cartItems, subtotal, onComplete }: B2BCheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "",
    taxId: "",
    purchaseOrderNumber: "",
    department: "",
    approverName: "",
    approverEmail: ""
  });

  // Mock employee subsidy data - in real app, this would come from API
  const [employeeSubsidy] = useState<EmployeeSubsidy>({
    employeeId: "EMP001",
    employeeName: "Ahmad Wijaya",
    allowanceBalance: 750000,
    maxAllowance: 1000000
  });

  const steps = [
    { id: 1, title: "Informasi Perusahaan", icon: Building2 },
    { id: 2, title: "Verifikasi Subsidi", icon: CreditCard },
    { id: 3, title: "Pengiriman & PO", icon: Truck },
    { id: 4, title: "Konfirmasi Pesanan", icon: FileText }
  ];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const subsidyUsage = ((employeeSubsidy.maxAllowance - employeeSubsidy.allowanceBalance) / employeeSubsidy.maxAllowance) * 100;
  const canUseSubsidy = subtotal <= employeeSubsidy.allowanceBalance;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Informasi Perusahaan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-sm font-medium">
                  Nama Perusahaan <span className="text-red-500" aria-label="wajib diisi">*</span>
                </Label>
                <Input
                  id="company-name"
                  value={companyInfo.companyName}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="PT. Contoh Perusahaan"
                  required
                  aria-required="true"
                  aria-describedby="company-name-help"
                />
                <p id="company-name-help" className="text-xs text-muted-foreground">
                  Nama perusahaan sesuai dengan dokumen resmi
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-id" className="text-sm font-medium">
                  NPWP Perusahaan <span className="text-red-500" aria-label="wajib diisi">*</span>
                </Label>
                <Input
                  id="tax-id"
                  value={companyInfo.taxId}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, taxId: e.target.value }))}
                  placeholder="00.000.000.0-000.000"
                  required
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-sm font-medium">
                  Departemen
                </Label>
                <Select onValueChange={(value) => setCompanyInfo(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Pilih departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">Keselamatan Kerja</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="po-number" className="text-sm font-medium">
                  Nomor Purchase Order
                </Label>
                <Input
                  id="po-number"
                  value={companyInfo.purchaseOrderNumber}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, purchaseOrderNumber: e.target.value }))}
                  placeholder="PO-2024-001"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Verifikasi Subsidi Karyawan</h3>
            
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">Informasi Subsidi</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Karyawan: {employeeSubsidy.employeeName} (ID: {employeeSubsidy.employeeId})
                  </p>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Saldo Subsidi Tersisa:</span>
                      <span className="font-medium">{formatPrice(employeeSubsidy.allowanceBalance)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Pesanan:</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    
                    {/* Subsidy usage progress bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Penggunaan Subsidi</span>
                        <span>{subsidyUsage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${subsidyUsage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {canUseSubsidy ? (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Subsidi dapat digunakan untuk pesanan ini
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">
                  Saldo subsidi tidak mencukupi. Kekurangan: {formatPrice(subtotal - employeeSubsidy.allowanceBalance)}
                </span>
              </div>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Informasi Pengiriman & Approval</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="approver-name" className="text-sm font-medium">
                  Nama Penyetuju <span className="text-red-500" aria-label="wajib diisi">*</span>
                </Label>
                <Input
                  id="approver-name"
                  value={companyInfo.approverName}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, approverName: e.target.value }))}
                  placeholder="Nama manager/supervisor"
                  required
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="approver-email" className="text-sm font-medium">
                  Email Penyetuju <span className="text-red-500" aria-label="wajib diisi">*</span>
                </Label>
                <Input
                  id="approver-email"
                  type="email"
                  value={companyInfo.approverEmail}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, approverEmail: e.target.value }))}
                  placeholder="manager@perusahaan.com"
                  required
                  aria-required="true"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Pesanan B2B</h3>
            
            <Card className="p-4">
              <h4 className="font-medium mb-3">Ringkasan Pesanan</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Perusahaan:</span>
                  <span>{companyInfo.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span>NPWP:</span>
                  <span>{companyInfo.taxId}</span>
                </div>
                {companyInfo.purchaseOrderNumber && (
                  <div className="flex justify-between">
                    <span>PO Number:</span>
                    <span>{companyInfo.purchaseOrderNumber}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Penyetuju:</span>
                  <span>{companyInfo.approverName}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total Pesanan:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {canUseSubsidy && (
                  <div className="flex justify-between text-green-600">
                    <span>Menggunakan Subsidi:</span>
                    <span>Ya</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return companyInfo.companyName && companyInfo.taxId;
      case 2:
        return true; // Subsidy verification is automatic
      case 3:
        return companyInfo.approverName && companyInfo.approverEmail;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-muted-foreground text-muted-foreground'
              }`}>
                <step.icon className="h-4 w-4" />
              </div>
              <div className="ml-3 hidden md:block">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-6 mb-6">
        {renderStepContent()}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          Sebelumnya
        </Button>

        {currentStep < steps.length ? (
          <Button
            onClick={() => setCurrentStep(prev => prev + 1)}
            disabled={!canProceedToNext()}
          >
            Selanjutnya
          </Button>
        ) : (
          <Button
            onClick={() => onComplete({
              companyInfo,
              employeeSubsidy,
              cartItems,
              subtotal,
              useSubsidy: canUseSubsidy
            })}
            className="bg-green-600 hover:bg-green-700"
          >
            Konfirmasi Pesanan B2B
          </Button>
        )}
      </div>
    </div>
  );
}