import React from "react";
import { CheckCircle } from "lucide-react";
function SuccessMessage({ progress, showSuccess }) {
  return (
    <div>
      {showSuccess && (
        <div className="absolute top-4 left-[40%] transform -translate-x-1/2 w-auto max-w-xs">
          <div className="bg-green-50 border border-green-100 rounded-lg p-3 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500 h-4 w-4 flex-shrink-0" />
              <span className="text-green-700 text-sm font-medium">
                Customer saved successfully
              </span>
            </div>
            <div className="mt-2 h-0.5 w-full bg-green-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all duration-[3000ms] ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuccessMessage;
