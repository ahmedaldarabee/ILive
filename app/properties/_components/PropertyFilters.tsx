import React from "react";
import { PropertyFilters as Filters } from "@/app/types";

interface IPropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const PropertyFilters = ({
  filters,
  onFiltersChange,
}: IPropertyFiltersProps) => {
  const handleFilterChanges = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === "" || value === "all" ? undefined : value,
    });
  };

  return (
    <div className="space-y-4">
      <form className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* property type filtering */}
        <div className="block">
          <label
            className="capitalize block text-sm font-medium text-gray-700 my-1"
            htmlFor="propertyType"
          >
            property type
          </label>

          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            name="propertyType"
            id="propertyType"
            value={filters.propertyType || "all"}
            onChange={(e) =>
              handleFilterChanges("propertyType", e.target.value)
            }
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        {/* status type filtering */}
        <div className="block">
          <label
            className="capitalize block text-sm font-medium text-gray-700 my-1"
            htmlFor="status"
          >
            status type
          </label>

          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            name="status"
            id="status"
            value={filters.status || "all"}
            onChange={(e) => handleFilterChanges("status", e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="for-sale">for-sale</option>
            <option value="for-rent">for-rent</option>
            <option value="sold">sold</option>
            <option value="rented">rented</option>
          </select>
        </div>

        {/* bedrooms type filtering */}
        <div className="block">
          <label
            className="capitalize block text-sm font-medium text-gray-700 my-1"
            htmlFor="bedrooms"
          >
            bedrooms type
          </label>

          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            name="bedrooms"
            id="bedrooms"
            value={filters.bedrooms || "all"}
            onChange={(e) =>
              handleFilterChanges("bedrooms", Number(e.target.value))
            }
          >
            <option value="">Any Types</option>
            <option value="1">+1</option>
            <option value="2">+2</option>
            <option value="3">+3</option>
            <option value="4">+4</option>
            <option value="5">+5</option>
          </select>
        </div>

        {/* bathrooms type filtering */}
        <div className="block">
          <label
            className="capitalize block text-sm font-medium text-gray-700 my-1"
            htmlFor="bathrooms"
          >
            bathrooms type
          </label>

          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            name="bathrooms"
            id="bathrooms"
            value={filters.bathrooms || "all"}
            onChange={(e) =>
              handleFilterChanges("bathrooms", Number(e.target.value))
            }
          >
            <option value="">Any Types</option>
            <option value="1">+1</option>
            <option value="2">+2</option>
            <option value="3">+3</option>
            <option value="4">+4</option>
            <option value="5">+5</option>
          </select>
        </div>

        {/* minPrice type filtering */}
        <div className="block ">
          <label
            className="capitalize block text-sm font-medium text-gray-700 my-1"
            htmlFor="minPrice"
          >
            min price type
          </label>

          <input
            type="number"
            placeholder="min price"
            className="w-full p-2 border border-gray-300 rounded-md"
            name="minPrice"
            id="minPrice"
            value={filters.minPrice || "all"}
            onChange={(e) =>
              handleFilterChanges("minPrice", Number(e.target.value))
            }
          />
        </div>

        {/* maxPrice type filtering */}
        <div className="block ">
          <label
            className="capitalize block text-sm font-medium text-gray-700 my-1"
            htmlFor="maxPrice"
          >
            max price type
          </label>

          <input
            type="number"
            placeholder="max price"
            className="w-full p-2 border border-gray-300 rounded-md"
            name="maxPrice"
            id="maxPrice"
            value={filters.maxPrice || "all"}
            onChange={(e) =>
              handleFilterChanges("maxPrice", Number(e.target.value))
            }
          />
        </div>
      </form>
    </div>
  );
};

export default PropertyFilters;
