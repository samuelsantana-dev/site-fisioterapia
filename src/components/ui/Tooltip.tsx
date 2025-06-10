import React, { useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          className={`absolute z-10 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg ${positionClasses[position]}`}
          role="tooltip"
        >
          {content}
          <div className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
            position === 'top' ? 'bottom-[-2px] left-1/2 -translate-x-1/2' :
            position === 'right' ? 'left-[-2px] top-1/2 -translate-y-1/2' :
            position === 'bottom' ? 'top-[-2px] left-1/2 -translate-x-1/2' :
            'right-[-2px] top-1/2 -translate-y-1/2'
          }`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;