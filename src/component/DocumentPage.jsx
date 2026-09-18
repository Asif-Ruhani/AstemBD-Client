// import React, { useState, useEffect } from 'react';
// import DropDownItems from './DropDownItems';
// import DocumentManager from './DocumentManager';

// export default function DocumentPage() {
//   // 1. Read from localStorage first. If nothing is saved, default to Regular Vocabulary.
//   const [selectedCategory, setSelectedCategory] = useState(() => {
//     const saved = localStorage.getItem('admin_active_category');
//     if (saved) {
//       try {
//         return JSON.parse(saved);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//     return {
//       getApi: '/sections',
//       editApi: '/english-vocab/everyday-Word/section-edit',
//     };
//   });

//   // 2. Whenever a category is selected, save it into localStorage
//   useEffect(() => {
//     if (selectedCategory?.getApi) {
//       localStorage.setItem('admin_active_category', JSON.stringify(selectedCategory));
//     }
//   }, [selectedCategory]);

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#f1f5f9', }}>
//       {/* Sidebar */}
//       <aside
//         style={{
//           width: '320px',
//           minWidth: '280px',
//           backgroundColor: '#ffffff',
//           borderRight: '1px solid #e2e8f0',
//           padding: '24px 16px',
//           position: 'sticky',
//           top: 0,
//           height: '100vh',
//           overflowY: 'auto',
//           boxSizing: 'border-box',
//         }}
//       >
//         <DropDownItems
//           onCategorySelect={(item) =>
//             setSelectedCategory({
//               getApi: item.getApi,
//               editApi: item.editApi,
//             })
//           }
//           activeApi={selectedCategory.getApi}
//         />
//       </aside>

//       {/* Main Content */}
//       <main
//         style={{
//           flex: 1,
//           minWidth: 0,
//           padding: '32px 40px',
//           overflowY: 'auto',
//           boxSizing: 'border-box',
//         }}
//       >
//         <DocumentManager
//           selectedEndpoint={selectedCategory.getApi}
//           editApi={selectedCategory.editApi}
//         />
//       </main>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import DropDownItems, { dropdownData, findCategoryById } from './DropDownItems';
// import DocumentManager from './DocumentManager';

// // Safe default category
// const DEFAULT_CATEGORY = {
//   id: 0,
//   title: 'Courses',
//   getApi: '/all-courses',
//   editApi: '/all-courses-edit'
// };

// export default function DocumentPage() {
//   // 1. Read ONLY the safe ID from localStorage, then lookup from verified dropdownData
//   const [selectedCategory, setSelectedCategory] = useState(() => {
//     const savedId = localStorage.getItem('admin_active_category_id');
//     if (savedId) {
//       const verified = findCategoryById(dropdownData, savedId);
//       if (verified) return verified;
//     }
//     return DEFAULT_CATEGORY;
//   });

//   // 2. Only store the ID into localStorage, NEVER the API URLs
//   useEffect(() => {
//     if (selectedCategory?.id) {
//       localStorage.setItem('admin_active_category_id', String(selectedCategory.id));
//     }
//   }, [selectedCategory]);

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#f1f5f9' }}>
//       {/* Sidebar */}
//       <aside
//         style={{
//           width: '320px',
//           minWidth: '280px',
//           backgroundColor: '#ffffff',
//           borderRight: '1px solid #e2e8f0',
//           padding: '24px 16px',
//           position: 'sticky',
//           top: 0,
//           height: '100vh',
//           overflowY: 'auto',
//           boxSizing: 'border-box',
//         }}
//       >
//         <DropDownItems
//           onCategorySelect={(item) => setSelectedCategory(item)}
//           activeCategory={selectedCategory}
//         />
//       </aside>

//       {/* Main Content */}
//       <main
//         style={{
//           flex: 1,
//           minWidth: 0,
//           padding: '32px 40px',
//           overflowY: 'auto',
//           boxSizing: 'border-box',
//         }}
//       >
//         <DocumentManager
//           selectedEndpoint={selectedCategory.getApi}
//           editApi={selectedCategory.editApi}
//           activeCategory={selectedCategory}
//         />
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import DropDownItems, { dropdownData, findCategoryById } from './DropDownItems';
import DocumentManager from './DocumentManager';

// 1. Set Courses as the default fallback
const DEFAULT_CATEGORY = {
  id: 1,
  title: 'Courses',
  getApi: '/all-courses',
  editApi: '/all-courses-edit',
};

export default function DocumentPage() {
  // 2. Load the stored category ID if present; otherwise default to Courses
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const savedId = localStorage.getItem('admin_active_category_id');
    if (savedId) {
      const verified = findCategoryById(dropdownData, savedId);
      if (verified) return verified;
    }
    return DEFAULT_CATEGORY;
  });

  // 3. Keep localStorage updated when user picks a different item
  useEffect(() => {
    if (selectedCategory?.id !== undefined) {
      localStorage.setItem('admin_active_category_id', String(selectedCategory.id));
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
          onCategorySelect={(item) => setSelectedCategory(item)}
          activeCategory={selectedCategory}
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
          selectedEndpoint={selectedCategory.getApi}
          editApi={selectedCategory.editApi}
          activeCategory={selectedCategory}
        />
      </main>
    </div>
  );
}