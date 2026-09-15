import React, { useState } from 'react';

const dropdownData = [
  {
    id: 1,
    title: 'English Vocabulary',
    children: [
      {
        id: '1-1',
        title: 'Everyday conversational english',
        children: [
          {
            id: '1-1-1',
            title: 'Regular vocabulary',
            api: '/sections',
            editRoute: '/english-vocab/everyday-Word/section-edit',
          },
          {
            id: '1-1-2',
            title: 'Extra vocabulary',
            api: '/extra-vocab/sections',
            editRoute: '/english-vocab/everyday-Word/extra-section-edit',
          },
        ],
      },
      { id: '1-2', title: 'Essential academic vocabulary' },
      { id: '1-3', title: 'Hard high yield vocabulary' },
      { id: '1-4', title: 'Advanced elite vocabulary' },
      { id: '1-5', title: 'Admission & job exam vocabulary' },
      { id: '1-6', title: 'Daily conversational grammar' },
      { id: '1-7', title: 'Sentence anatomy & syntax' },
    ],
  },
  {
    id: 2,
    title: 'Study Abroad',
    children: [
      { id: '2-1', title: 'Scholarship and admission info' },
      { id: '2-2', title: 'IELTS resources' },
      { id: '2-3', title: 'GRE info' },
      { id: '2-4', title: 'Student counselling' },
    ],
  },
  { id: 3, title: 'Computer Science & Engineering (CSE)' },
  { id: 4, title: 'HSC' },
  { id: 5, title: 'SSC' },
];

function MenuItem({ item, level = 0, onSelect, activeApi }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isSelected = Boolean(item.api && item.api === activeApi);
  const isClickable = Boolean(item.api);

  // Hover handlers for revealing sub-menus
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hasChildren) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hasChildren) {
      setIsOpen(false);
    }
  };

  const handleClick = () => {
    if (item.api && typeof onSelect === 'function') {
      onSelect(item);
    }
  };

  // Background and text colors with light-gray hover
  let bgColor = 'transparent';
  let textColor = '#475569'; // Slate 600

  if (isSelected) {
    bgColor = '#e2e8f0';      // Medium slate-gray for selected item
    textColor = '#0f172a';    // Dark text
  } else if (isHovered) {
    bgColor = '#f1f5f9';      // Clean light gray hover
    textColor = '#0f172a';    // Slate 900
  }

  if (level === 0 && !isSelected) {
    textColor = isHovered ? '#0f172a' : '#1e293b';
  }

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ listStyle: 'none', margin: '2px 0' }}
    >
      <button
        onClick={handleClick}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '8px 12px',
          paddingLeft: `${12 + level * 14}px`,
          fontSize: level === 0 ? '13.5px' : '13px',
          fontWeight: level === 0 ? 600 : isSelected ? 600 : 500,
          color: textColor,
          backgroundColor: bgColor,
          border: 'none',
          borderLeft: isSelected ? '3px solid #64748b' : '3px solid transparent',
          borderRadius: isSelected ? '0 6px 6px 0' : '6px',
          cursor: isClickable || hasChildren ? 'pointer' : 'default',
          textAlign: 'left',
          transition: 'background-color 0.15s ease, color 0.15s ease',
          outline: 'none',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.api && (
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isSelected ? '#475569' : isHovered ? '#94a3b8' : '#cbd5e1',
                transition: 'background-color 0.15s ease',
                flexShrink: 0,
              }}
            />
          )}
          {item.title}
        </span>

        {hasChildren && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '18px',
              height: '18px',
              borderRadius: '4px',
              backgroundColor: isHovered ? '#e2e8f0' : 'transparent',
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.18s ease, background-color 0.15s ease',
              flexShrink: 0,
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke={isSelected || isHovered ? '#0f172a' : '#94a3b8'}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 2 7 5 3 8" />
            </svg>
          </span>
        )}
      </button>

      {/* Submenu opens automatically when hovered */}
      {hasChildren && isOpen && (
        <ul
          style={{
            margin: '2px 0 2px 8px',
            padding: 0,
            borderLeft: '1px dashed #cbd5e1',
          }}
        >
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              activeApi={activeApi}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function DropDownItems({ onCategorySelect, onSelect, activeApi }) {
  const handleSelectCallback = onCategorySelect || onSelect;

  return (
    <nav
      style={{
        width: '100%',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px 12px 10px',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '10px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#64748b',
          }}
        >
          Navigation
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            padding: '2px 6px',
            borderRadius: '9999px',
            backgroundColor: '#f1f5f9',
            color: '#475569',
          }}
        >
          Catalog
        </span>
      </div>

      <ul style={{ margin: 0, padding: 0 }}>
        {dropdownData.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onSelect={handleSelectCallback}
            activeApi={activeApi}
          />
        ))}
      </ul>
    </nav>
  );
}