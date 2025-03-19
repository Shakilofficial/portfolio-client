"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?page=${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?page=${currentPage + 1}`);
    }
  };

  return (
    <div className="flex items-center gap-2 my-5 justify-center">
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center"
      >
        <ArrowLeft />
      </Button>
      {[...Array(totalPage)].map((_, index) => (
        <Button
          onClick={() => {
            setCurrentPage(index + 1);
            router.push(`${pathname}?page=${index + 1}`);
          }}
          key={index}
          variant={currentPage === index + 1 ? "default" : "outline"}
          size="sm"
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
