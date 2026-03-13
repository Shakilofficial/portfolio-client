"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createQueryString = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return params.toString();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      router.push(`${pathname}?${createQueryString(page)}`);
    }
  };

  if (totalPage <= 1) return null;

  return (
    <div className="flex items-center gap-2 my-5 justify-center">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center p-0 transition-all hover:bg-primary hover:text-primary-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      {[...Array(totalPage)].map((_, index) => {
        const pageNumber = index + 1;
        // Logic to show fewer page buttons if there are too many
        if (
          totalPage > 7 &&
          pageNumber !== 1 &&
          pageNumber !== totalPage &&
          Math.abs(pageNumber - currentPage) > 1
        ) {
          if (pageNumber === 2 || pageNumber === totalPage - 1) {
            return <span key={index} className="text-muted-foreground">...</span>;
          }
          return null;
        }

        return (
          <Button
            key={index}
            onClick={() => handlePageChange(pageNumber)}
            variant={currentPage === pageNumber ? "default" : "outline"}
            size="sm"
            className="w-8 h-8 rounded-full flex items-center justify-center p-0 transition-all"
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center p-0 transition-all hover:bg-primary hover:text-primary-foreground"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
