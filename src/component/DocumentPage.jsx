import React, { useState, useEffect } from 'react';
import DropDownItems from './DropDownItems';
import DocumentManager from './DocumentManager';

export default function DocumentPage() {
  // 1. Read from localStorage first. If nothing is saved, default to Regular Vocabulary.
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const saved = localStorage.getItem('admin_active_category');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      api: '/sections',
      editRoute: '/english-vocab/everyday-Word/section-edit',
    };
  });

  // 2. Whenever a category is selected, save it into localStorage
  useEffect(() => {
    if (selectedCategory?.api) {
      localStorage.setItem('admin_active_category', JSON.stringify(selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#f1f5f9' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '320px',
          minWidth: '280px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          padding: '24px 16px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <DropDownItems
          onCategorySelect={(item) =>
            setSelectedCategory({
              api: item.api,
              editRoute: item.editRoute,
            })
          }
          activeApi={selectedCategory.api}
        />
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: '32px 40px',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <DocumentManager
          selectedEndpoint={selectedCategory.api}
          editRoute={selectedCategory.editRoute}
        />
      </main>
    </div>
  );
}