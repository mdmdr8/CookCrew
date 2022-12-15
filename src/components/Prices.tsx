import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  calories?: number;
  contentClass?: string;
}

const Calories: FC<PricesProps> = ({
  className = "",
  calories = 33,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2 border-green-500 rounded-lg ${contentClass}`}
      >
        <span className="text-green-500 !leading-none">
          ${calories.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Calories ;
