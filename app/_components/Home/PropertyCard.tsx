import { Property } from "@/app/types";
import { Bath, Bed, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IPropertyProps {
  property: Property;
}
const PropertyCard = ({ property }: IPropertyProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "for-sale":
        return "!bg-green-100 !text-green-800";
      case "for-rent":
        return "!bg-blue-100 !text-blue-800";
      case "sold":
        return "!bg-gray-100 !text-gray-800";
      case "rented":
        return "!bg-purple-100 !text-purple-800";
      default:
        return "!bg-gray-100 !text-gray-800";
    }
  };

  return (
    <Link href={`properties/${property._id}`}>
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
        {/* Image */}
        <div className="relative h-48 w-full">
          {property.images && property.images.length > 0 ? (
            <Image
              src={property?.images[0]}
              // src={"/assets/Imgs/text-house.jpg"}
              alt=""
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">sorry,there are no images</span>
            </div>
          )}
        </div>
        {/* status badge */}
        <div className="absolute top-4 left-4 z-9999">
          <span
            className={`p-2 capitalize rounded-md text-white ${getStatusColor(property?.status)}`}
          >
            {property?.status}
          </span>
        </div>

        {/* featured badge */}

        {property?.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-[#2b79e0]  border p-2 rounded-md text-white">
              Featured
            </span>
          </div>
        )}

        {/* main content */}

        <div className="p-4">
          {/* price */}
          <div className="my-2">
            <span className="text-2xl font-bold text-gray-900">
              {property?.price.toLocaleString("en-US")}$
            </span>
            {property?.status === "for-rent" && (
              <span className="text-gray-600">/month</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {property?.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 my-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {property?.city}, {property?.state}
            </span>
          </div>

          {/* property details */}
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span className="text-sm">{property?.bathrooms}</span>
              </div>

              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span className="text-sm">{property?.bathrooms}</span>
              </div>

              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span className="text-sm">{property?.area} sq ft</span>
              </div>

              <div className="my-2">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full capitalize">
                  {property?.propertyType.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
