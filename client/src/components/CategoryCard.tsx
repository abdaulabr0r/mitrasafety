import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: string;
  productCount?: number;
  onClick?: () => void;
}

export default function CategoryCard({ name, icon, productCount, onClick }: CategoryCardProps) {
  return (
    <Card
      className="hover-elevate active-elevate-2 cursor-pointer overflow-hidden transition-shadow"
      onClick={onClick}
      data-testid={`card-category-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10 text-4xl">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground" data-testid="text-category-name">
            {name}
          </h3>
          {productCount !== undefined && (
            <p className="text-sm text-muted-foreground" data-testid="text-product-count">
              {productCount} produk
            </p>
          )}
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Card>
  );
}
