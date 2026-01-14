// components/loader/SimpleSkeleton.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoader({ type = "card", count = 1 }) {
  // Dark-mode skeleton colors
  const baseColor = "#374151";       // Dark gray background
  const highlightColor = "#4b5563";  // Slightly lighter highlight

  // Reusable card skeleton (dark mode)
  const CardSkeleton = () => (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <Skeleton height={200} baseColor={baseColor} highlightColor={highlightColor} className="mb-2" />
      <Skeleton height={20} baseColor={baseColor} highlightColor={highlightColor} width="80%" className="mb-1" />
      <Skeleton height={15} baseColor={baseColor} highlightColor={highlightColor} width="60%" />
    </div>
  );

  // Reusable details skeleton (dark mode)
  const DetailsSkeleton = () => (
    <div className="bg-gray-800 shadow-lg rounded-lg md:flex overflow-hidden p-4 mb-4">
      <div className="md:w-1/3 p-2 bg-gray-700 flex justify-center items-center">
        <Skeleton height={250} width={150} baseColor={baseColor} highlightColor={highlightColor} />
      </div>
      <div className="md:w-2/3 p-4">
        <Skeleton height={30} width="70%" baseColor={baseColor} highlightColor={highlightColor} className="mb-3" />
        <Skeleton height={20} width="50%" baseColor={baseColor} highlightColor={highlightColor} className="mb-2" />
        <Skeleton height={15} width="60%" baseColor={baseColor} highlightColor={highlightColor} />
      </div>
    </div>
  );

  // Landing / Home page skeleton
  const LandingSkeleton = () => (
    <div className="space-y-6">
      {/* Hero section */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-md">
        <Skeleton height={40} width="60%" baseColor={baseColor} highlightColor={highlightColor} className="mb-4" />
        <Skeleton height={20} width="80%" baseColor={baseColor} highlightColor={highlightColor} className="mb-2" />
        <Skeleton height={20} width="70%" baseColor={baseColor} highlightColor={highlightColor} />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-lg shadow">
            <Skeleton circle height={60} width={60} baseColor={baseColor} highlightColor={highlightColor} className="mb-4" />
            <Skeleton height={20} width="70%" baseColor={baseColor} highlightColor={highlightColor} className="mb-2" />
            <Skeleton height={15} width="90%" baseColor={baseColor} highlightColor={highlightColor} />
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "card") {
    return (
      <>
        {Array.from({ length: count }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (type === "details") {
    return <DetailsSkeleton />;
  }

  if (type === "landing") {
    return <LandingSkeleton />;
  }

  // Default simple line skeleton
  return <Skeleton height={20} baseColor={baseColor} highlightColor={highlightColor} />;
}
