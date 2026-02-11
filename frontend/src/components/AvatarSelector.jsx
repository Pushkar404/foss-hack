import React from "react";

const AVATARS = [
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Alex",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Jordan",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Taylor",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Riley",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Casey",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Sam",
];

const AvatarSelector = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-300">Choose an avatar</p>

      <div
        role="radiogroup"
        aria-label="Choose an avatar"
        className="flex flex-wrap gap-3"
      >
        {AVATARS.map((url) => {
          const selected = value === url;

          return (
            <button
              key={url}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(url)}
              className={`inline-flex items-center justify-center rounded-full px-1.5 py-1 border transition-all duration-200 focus:outline-none
                ${
                  selected
                    ? "border-indigo-400 bg-slate-900 shadow-[0_0_0_1px_rgba(129,140,248,0.8)]"
                    : "border-slate-700 bg-slate-950 hover:border-slate-500"
                }`}
            >
              <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-800">
                <img
                  src={url}
                  alt="avatar option"
                  className="h-full w-full object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AvatarSelector;
