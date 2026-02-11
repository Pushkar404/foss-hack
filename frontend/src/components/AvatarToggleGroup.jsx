import React, { useState } from 'react';
import AvatarToggle from './AvatarToggle';

/**
 * AvatarToggleGroup
 *
 * Radio-style group of AvatarToggle items.
 * - Only one avatar can be ON at a time.
 */
const AvatarToggleGroup = ({ users, initialActiveId = null, onChange, label }) => {
  const [activeId, setActiveId] = useState(
    initialActiveId !== null ? initialActiveId : users?.[0]?.id ?? null
  );

  const handleSelect = (id) => {
    setActiveId(id);
    onChange?.(id);
  };

  return (
    <div className="space-y-2">
      {label && <p className="text-xs text-slate-300">{label}</p>}
      <div role="radiogroup" className="space-y-2">
        {users?.map((user) => (
          <AvatarToggle
            key={user.id}
            avatarUrl={user.avatarUrl}
            name={user.name}
            isActive={activeId === user.id}
            onSelect={() => handleSelect(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarToggleGroup;

