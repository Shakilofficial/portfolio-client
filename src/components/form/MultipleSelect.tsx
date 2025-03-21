/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

interface MultiSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export const MultiSelect = ({ name, label, options }: MultiSelectProps) => {
  const { control } = useFormContext();

  return (
    <div className="w-full">
      <label className="block font-medium mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValues = field.value || [];

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedValues.length > 0
                    ? options
                        .filter((opt) => selectedValues.includes(opt.value))
                        .map((opt) => opt.label)
                        .join(", ")
                    : "Select options"}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-2">
                <ScrollArea className="max-h-64 overflow-y-auto">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-xs"
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
                      />
                      <span>{option.label}</span>
                    </div>
                  ))}
                </ScrollArea>
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
};
