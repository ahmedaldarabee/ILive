"use client";

import { PropertyFormData } from "@/app/types";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";

// Partial That be work with data where data maybe immediately or optional
interface IPropertyProps {
  data?: Partial<PropertyFormData> | any;
  isEditing?: boolean;
  propertyId?: string;
}

const PropertyForm = ({
  data,
  isEditing = false,
  propertyId,
}: IPropertyProps) => {
  // mutations
  const createProperty = useMutation(api.properties.createProperty);
  const updateProperty = useMutation(api.properties.updatesProperty);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const [formData, setFromData] = useState<PropertyFormData>({
    title: data?.title || "",
    description: data?.description || "",
    price: data?.price || 0,
    bedrooms: data?.bedrooms || 0,
    bathrooms: data?.bathrooms || 0,
    area: data?.area || 0,
    address: data?.address || "",
    city: data?.city || "",
    state: data?.state || "",
    zipCode: data?.zipCode || "",
    propertyType: data?.propertyType || "house",
    status: data?.status || "rented",
    images: data?.images || [],
    featured: data?.featured || false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // here name about each input : name attribute with input through define input field

    const { name, value, type } = e.target;

    setFromData((prev) => ({
      ...prev,
      [name]: ["price", "area", "bedrooms", "bathrooms"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFromData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleImageUploading = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files) return;

    setIsUploading(true);
    const uploadingImages: string[] = [];

    try {
      // This function it will split data - Array.from
      // let newArray = Array.from("Hello");
      // console.log(newArray);
      // // Output: [ 'H', 'e', 'l', 'l', 'o' ]

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response) {
          throw new Error("Uploading Field!");
        }
        const { url } = await response.json();
        uploadingImages.push(url);

        setFromData((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadingImages],
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // window.location("/properties");
    try {
      if (propertyId && isEditing) {
        // Error is here
        await updateProperty({
          id: propertyId as any,
          ...formData,
        });
        toast.success("property updated successfully");
      } else {
        // also Error is here
        await createProperty(formData);
        toast.success("property created successfully");
      }
      router.push("/properties");
    } catch (error) {
      toast.error("Event has not been created");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 max-sm:px-10">
      {/* property main info */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-sky-700 cursor-pointer">
        <h3 className="capitalize font-medium text-xl">basic information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              property name
            </label>
            <input
              placeholder="property name"
              type="text"
              name="title"
              value={formData?.title}
              onChange={handleInputChange}
              required
              className="w-full py-1 px-2 border border-gray-300 rounded focus:outline-sky-700 transition-all duration-300"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              property description
            </label>

            <textarea
              placeholder="property description"
              value={formData?.description}
              onChange={handleInputChange}
              required
              className="w-full py-1 px-2 border border-gray-300 rounded focus:outline-sky-700 transition-all duration-300 resize-none"
              name="description"
              id="description"
            ></textarea>
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="price"
            >
              property price
            </label>

            <input
              type="number"
              placeholder="price"
              value={formData?.price}
              onChange={handleInputChange}
              required
              className="w-full py-1 px-2 border border-gray-300 rounded focus:outline-sky-700 transition-all duration-300 resize-none"
              name="price"
            />
          </div>
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="area"
            >
              property area
            </label>

            <input
              type="text"
              placeholder="area"
              value={formData?.area}
              onChange={handleInputChange}
              required
              className="w-full py-1 px-2 border border-gray-300 rounded focus:outline-sky-700 transition-all duration-300 resize-none"
              name="area"
            />
          </div>
        </div>
      </div>

      {/* property details */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-sky-700 cursor-pointer">
        <h3 className="capitalize font-medium text-xl">property details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="bedrooms"
            >
              bedrooms
            </label>

            <select
              className="w-full md:w-[50%]  cursor-pointer block border rounded-md px-4 py-1 border-sky-700 my-2"
              value={formData?.bedrooms}
              onChange={handleInputChange}
              name="bedrooms"
              required
              id="bedrooms"
            >
              {[1, 2, 3, 4, 5, 6].map((num, idx) => (
                <option key={idx} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="bathrooms"
            >
              bathrooms
            </label>

            <select
              className="w-full md:w-[50%]  cursor-pointer block border rounded-md px-4 py-1 border-sky-700 my-2"
              value={formData?.bathrooms}
              onChange={handleInputChange}
              name="bathrooms"
              required
              id="bathrooms"
            >
              {[1, 2, 3, 4, 5, 6].map((num, idx) => (
                <option key={idx} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="propertyType"
            >
              property type
            </label>

            <select
              className="w-full md:w-[50%]  cursor-pointer block border rounded-md px-4 py-1 border-sky-700 my-2"
              value={formData?.propertyType}
              onChange={handleInputChange}
              name="propertyType"
              required
              id="propertyType"
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="status"
            >
              property status
            </label>

            <select
              className="w-full md:w-[50%] cursor-pointer block border rounded-md px-4 py-1 border-sky-700 my-2"
              value={formData?.status}
              onChange={handleInputChange}
              name="status"
              required
              id="status"
            >
              <option value="for-sale">for sale</option>
              <option value="for-rent">for rent</option>
              <option value="sold">sold</option>
              <option value="rented">rented</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              className="capitalize block text-sm font-medium text-gray-700"
              htmlFor="featured"
            >
              is featured?
            </label>

            <div className="flex gap-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData?.featured}
                onChange={handleCheckBoxChange}
                required
                className="p-3 border border-sky-700 rounded"
              />

              <span className="text-sky-700 font-medium text-sm">
                marked as featured property{" "}
              </span>
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="address"
            >
              property address
            </label>

            <input
              id="address"
              value={formData?.address}
              name="address"
              onChange={handleInputChange}
              required
              placeholder="address"
              className="w-full md:w-[50%] cursor-pointer block border rounded-md px-4 py-1 border-sky-700 my-2"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="city"
            >
              property city
            </label>

            <input
              id="city"
              value={formData?.city}
              name="city"
              onChange={handleInputChange}
              required
              placeholder="city"
              className="w-full md:w-[50%] cursor-pointer block border rounded-md px-4 py-1 border-sky-700 my-2"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="state"
            >
              property state
            </label>

            <input
              id="state"
              value={formData?.state}
              name="state"
              onChange={handleInputChange}
              required
              placeholder="state"
              className="w-full md:w-[50%] cursor-pointer block border rounded-md px-4 py-1 border-sky-700 my-2"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="zipCode"
            >
              property zip code
            </label>

            <input
              id="zipCode"
              value={formData?.zipCode}
              name="zipCode"
              placeholder="zipCode"
              onChange={handleInputChange}
              required
              className="w-full md:w-[50%] cursor-pointer block border rounded-md px-4 py-1 border-sky-700 my-2"
            />
          </div>
        </div>
      </div>

      {/* Image Uploading */}
      <label className="w-full block">
        <div className="cursor-pointer border-2 border-dashed border-sky-300 rounded-lg p-6 text-center">
          <CloudUpload className="w-8 h-8 text-sky-400 mx-auto" />
          {isUploading ? "uploading..." : "Click to upload property images"}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUploading}
            className="hidden"
          />
        </div>
      </label>

      {formData?.images?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData?.images?.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt="Uploading property image"
              width={150}
              height={150}
              className="w-[150px] h-[150px] object-cover"
            />
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div className="w-full flex items-center justify-center">
        <Button
          type="submit"
          className={`${isUploading === true ? "bg-sky-900 pointer-events-none" : "bg-sky-600"}  hover:bg-sky-800 cursor-pointer transition-all duration-300`}
        >
          
          {isEditing ? `Edit ${formData?.title} Property`:"Create your property"}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
