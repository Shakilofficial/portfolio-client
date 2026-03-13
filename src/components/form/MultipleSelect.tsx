/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Badge } from "../ui/badge";

interface MultiSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export const MultiSelect = ({ name, label, options }: MultiSelectProps) => {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1.5 text-foreground/80">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValues = field.value || [];

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between h-auto min-h-[40px] py-2 px-3 border-input hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-wrap gap-1 items-center overflow-hidden">
                    {selectedValues.length > 0 ? (
                      options
                        .filter((opt) => selectedValues.includes(opt.value))
                        .map((opt) => (
                          <Badge 
                            key={opt.value} 
                            variant="secondary" 
                            className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-1.5 py-0 text-[10px]"
                          >
                            {opt.label}
                            <X 
                              className="w-2.5 h-2.5 ml-1 cursor-pointer" 
                              onClick={(e) => {
                                e.stopPropagation();
                                field.onChange(selectedValues.filter((v: any) => v !== opt.value));
                              }}
                            />
                          </Badge>
                        ))
                    ) : (
                      <span className="text-muted-foreground text-sm font-normal">Select technologies...</span>
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-8 h-9 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <ScrollArea className="max-h-64 h-full">
                  <div className="p-1">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-accent transition-colors text-sm"
                          onClick={() => {
                            const newValue = selectedValues.includes(option.value)
                              ? selectedValues.filter(
                                  (val: any) => val !== option.value
                                )
                              : [...selectedValues, option.value];

                            field.onChange(newValue);
                          }}
                        >
                          <Checkbox
                            checked={selectedValues.includes(option.value)}
                            className="h-4 w-4"
                          />
                          <span className="flex-1 truncate">{option.label}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No results found.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
};
