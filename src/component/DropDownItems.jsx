

// import React, { useState, useEffect } from 'react';

// export const dropdownData = [
//   {
//     id: 1,
//     title: 'Courses',
//     getApi: '/all-courses',
//     editApi: '/all-courses-edit'
//   },
//   {
//     id: 2,
//     title: 'English Vocabulary',
//     children: [
//       {
//         id: '2-I',
//         title: 'Basic English vocabulary',
//         children: [
//           {
//             id: '2-I-a',
//             title: 'Everyday Conversational English',
//             children: [
//               {
//                 id: '2-1-1',
//                 title: 'Regular Vocabulary',
//                 getApi: '/sections',
//                 editApi: '/section-detail',
//               },
//               {
//                 id: '2-1-2',
//                 title: 'Extra Vocabulary',
//                 getApi: '/extra-vocab-sections',
//                 editApi: '/extra-section-detail',
//               },
//             ],
//           },
//           {
//             id: '2-I-b',
//             title: 'Daily Conversational Grammar',
//             getApi: '/all-courses',
//             editApi: '/all-courses-edit'
//           },
//           {
//             id: '2-I-c',
//             title: 'Spoken English Mastery',
//             getApi: '/all-courses',
//             editApi: '/all-courses-edit'
//           },
//           {
//             id: '2-I-d',
//             title: 'Phonetics & Pronunciation',
//             getApi: '/all-courses',
//             editApi: '/all-courses-edit'
//           },
//         ],
//       },
//       {
//         id: '2-II',
//         title: 'Advanced English vocabulary',
//         children: [
//           {
//             id: '2-II-a',
//             title: 'Essential Academic Vocabulary',
//             getApi: '/all-courses',
//             editApi: '/all-courses-edit'
//           },
//           {
//             id: '2-II-b',
//             title: 'Hard High-Yield Vocabulary',
//             getApi: '/all-courses',
//             editApi: '/all-courses-edit'
//           },
//           {
//             id: '2-II-c',
//             title: 'Advanced Elite Vocabulary',
//             getApi: '/all-courses',
//             editApi: '/all-courses-edit'
//           },
//           {
//             id: '2-II-d',
//             title: 'Admission & Job Exam Vocabulary',
//             getApi: '/all-courses',
//             editApi: '/all-courses-edit'
//           },
//           {
//             id: '2-II-e',
//             title: 'Sentence Anatomy & Syntax',
//             getApi: '/all-courses',
//             editApi: '/all-courses-edit'
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: 'Study Abroad',
//     children: [
//       {
//         id: '3-I',
//         title: 'Scholarship and Admission Info',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '3-II',
//         title: 'IELTS Resources',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '3-III',
//         title: 'GRE Info',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '3-IV',
//         title: 'Student Counselling',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: 'Computer Science & Engineering (CSE)',
//     children: [
//       {
//         id: '4-I',
//         title: 'Data Structures',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '4-II',
//         title: 'Design & Analysis of Algorithms',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '4-III',
//         title: 'Operating Systems',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '4-IV',
//         title: 'Computer Architecture & Organization',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '4-V',
//         title: 'Computer Networks',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '4-VI',
//         title: 'Database Management Systems',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '4-VII',
//         title: 'Graph Theory & Combinatorics',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '4-VIII',
//         title: 'Theory of Computation & Automata',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//     ],
//   },
//   {
//     id: 5,
//     title: 'HSC',
//     children: [
//       {
//         id: '5-I',
//         title: 'Physics',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '5-II',
//         title: 'Chemistry',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '5-III',
//         title: 'Biology',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '5-IV',
//         title: 'Higher mathematics',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//     ],
//   },
//   {
//     id: 6,
//     title: 'SSC',
//     children: [
//       {
//         id: '6-I',
//         title: 'Physics',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '6-II',
//         title: 'Chemistry',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '6-III',
//         title: 'Biology',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '6-IV',
//         title: 'General mathematics',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//       {
//         id: '6-V',
//         title: 'Higher mathematics',
//         getApi: '/all-courses',
//         editApi: '/all-courses-edit'
//       },
//     ],
//   },
// ];

// // Add this helper function below dropdownData:
// export function findCategoryById(tree, targetId) {
//   if (!targetId) return null;
//   for (const item of tree) {
//     if (String(item.id) === String(targetId)) return item;
//     if (item.children && item.children.length > 0) {
//       const found = findCategoryById(item.children, targetId);
//       if (found) return found;
//     }
//   }
//   return null;
// }

// // Helper to check if this item or any of its nested children matches active identity
// function containsActiveChild(item, activeId, activeApi) {
//   if (!activeId && !activeApi) return false;
//   if ((item.id && item.id === activeId) || (item.getApi && item.getApi === activeApi)) return true;
//   if (item.children && item.children.length > 0) {
//     return item.children.some((child) => containsActiveChild(child, activeId, activeApi));
//   }
//   return false;
// }

// function MenuItem({ item, level = 0, onSelect, activeCategory }) {
//   const hasChildren = Boolean(item.children && item.children.length > 0);

//   // Dynamic leaf match check
//   const isSelected = Boolean(
//     !hasChildren &&
//     ((activeCategory?.id && item.id === activeCategory.id) ||
//       (activeCategory?.getApi && item.getApi === activeCategory.getApi && item.title === activeCategory.title))
//   );

//   const isClickable = Boolean(item.getApi || hasChildren);

//   const [isOpen, setIsOpen] = useState(() =>
//     containsActiveChild(item, activeCategory?.id, activeCategory?.getApi)
//   );
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (containsActiveChild(item, activeCategory?.id, activeCategory?.getApi)) {
//       setIsOpen(true);
//     }
//   }, [activeCategory, item]);

//   const handleClick = () => {
//     if (hasChildren) {
//       setIsOpen((prev) => !prev);
//     } else if (item.getApi && typeof onSelect === 'function') {
//       onSelect(item);
//     }
//   };

//   let bgColor = 'transparent';
//   let textColor = '#475569';

//   if (isSelected) {
//     bgColor = '#e2e8f0';
//     textColor = '#0f172a';
//   } else if (isHovered) {
//     bgColor = '#f1f5f9';
//     textColor = '#0f172a';
//   }

//   if (level === 0 && !isSelected) {
//     textColor = isHovered ? '#0f172a' : '#1e293b';
//   }

//   return (
//     <li
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{ listStyle: 'none', margin: '2px 0' }}
//     >
//       <button
//         onClick={handleClick}
//         type="button"
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           width: '100%',
//           padding: '8px 12px',
//           paddingLeft: `${12 + level * 14}px`,
//           fontSize: level === 0 ? '13.5px' : '13px',
//           fontWeight: level === 0 ? 600 : isSelected ? 600 : 500,
//           color: textColor,
//           backgroundColor: bgColor,
//           border: 'none',
//           borderLeft: isSelected ? '3px solid #64748b' : '3px solid transparent',
//           borderRadius: isSelected ? '0 6px 6px 0' : '6px',
//           cursor: isClickable ? 'pointer' : 'default',
//           textAlign: 'left',
//           transition: 'background-color 0.15s ease, color 0.15s ease',
//           outline: 'none',
//         }}
//       >
//         <span
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap',
//           }}
//         >
//           {!hasChildren && item.getApi && (
//             <span
//               style={{
//                 display: 'inline-block',
//                 width: '6px',
//                 height: '6px',
//                 borderRadius: '50%',
//                 backgroundColor: isSelected ? '#475569' : isHovered ? '#94a3b8' : '#cbd5e1',
//                 transition: 'background-color 0.15s ease',
//                 flexShrink: 0,
//               }}
//             />
//           )}
//           {item.title}
//         </span>

//         {hasChildren && (
//           <span
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '18px',
//               height: '18px',
//               borderRadius: '4px',
//               backgroundColor: isHovered ? '#e2e8f0' : 'transparent',
//               transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
//               transition: 'transform 0.18s ease, background-color 0.15s ease',
//               flexShrink: 0,
//             }}
//           >
//             <svg
//               width="10"
//               height="10"
//               viewBox="0 0 10 10"
//               fill="none"
//               stroke={isSelected || isHovered ? '#0f172a' : '#94a3b8'}
//               strokeWidth="1.7"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="3 2 7 5 3 8" />
//             </svg>
//           </span>
//         )}
//       </button>

//       {hasChildren && isOpen && (
//         <ul
//           style={{
//             margin: '2px 0 2px 8px',
//             padding: 0,
//             borderLeft: '1px dashed #cbd5e1',
//           }}
//         >
//           {item.children.map((child) => (
//             <MenuItem
//               key={child.id}
//               item={child}
//               level={level + 1}
//               onSelect={onSelect}
//               activeCategory={activeCategory}
//             />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// }

// export default function DropDownItems({ onCategorySelect, onSelect, activeCategory, activeApi }) {
//   const handleSelectCallback = onCategorySelect || onSelect;
//   const currentCategory = activeCategory || (activeApi ? { getApi: activeApi } : null);

//   return (
//     <nav
//       style={{
//         width: '100%',
//         fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//         userSelect: 'none',
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '0 8px 12px 10px',
//           borderBottom: '1px solid #e2e8f0',
//           marginBottom: '10px',
//         }}
//       >
//         <span
//           style={{
//             fontSize: '11px',
//             fontWeight: 700,
//             textTransform: 'uppercase',
//             letterSpacing: '0.08em',
//             color: '#64748b',
//           }}
//         >
//           Navigation
//         </span>
//         <span
//           style={{
//             fontSize: '10px',
//             fontWeight: 600,
//             padding: '2px 6px',
//             borderRadius: '9999px',
//             backgroundColor: '#f1f5f9',
//             color: '#475569',
//           }}
//         >
//           Catalog
//         </span>
//       </div>

//       <ul style={{ margin: 0, padding: 0 }}>
//         {dropdownData.map((item) => (
//           <MenuItem
//             key={item.id}
//             item={item}
//             onSelect={handleSelectCallback}
//             activeCategory={currentCategory}
//           />
//         ))}
//       </ul>
//     </nav>
//   );
// }


import React, { useState, useEffect } from 'react';

// Navigation catalog tree containing unified route definitions, identifiers & filter parameters
export const dropdownData = [
  {
    id: '1',
    title: 'Courses (All)',
    getApi: '/all-courses',
    editApi: '/all-courses-edit',
    isCourseCollection: true,
  },
  {
    id: '2',
    title: 'English Vocabulary',
    children: [
      {
        id: '2-I',
        title: 'Basic English vocabulary',
        children: [
          {
            id: '2-I-a',
            title: 'Everyday Conversational English',
            children: [
              {
                id: '2-1-1',
                title: 'Regular Vocabulary',
                getApi: '/english-vocab-sections',
                editApi: '/english-vocab-details',
                courseId: 'CRS_BEV_CONV_01',
                filterQuery: { status: 'regular' }
              },
              {
                id: '2-1-2',
                title: 'Extra Vocabulary',
                getApi: '/english-vocab-sections',
                editApi: '/english-vocab-details',
                courseId: 'CRS_BEV_CONV_01',
                filterQuery: { status: 'extra' }
              },
            ],
          },
          {
            id: '2-I-b',
            title: 'Daily Conversational Grammar',
            getApi: '/english-vocab-sections',
            editApi: '/english-vocab-details',
            filterQuery: { status: 'regular' }
          },
          {
            id: '2-I-c',
            title: 'Spoken English Mastery',
            getApi: '/all-courses',
            editApi: '/all-courses-edit',
            filterQuery: { category: 'spoken-english' },
            isCourseCollection: true,
          },
          {
            id: '2-I-d',
            title: 'Phonetics & Pronunciation',
            getApi: '/all-courses',
            editApi: '/all-courses-edit',
            filterQuery: { category: 'phonetics' },
            isCourseCollection: true,
          },
        ],
      },
      {
        id: '2-II',
        title: 'Advanced English vocabulary',
        children: [
          {
            id: '2-II-a',
            title: 'Essential Academic Vocabulary',
            getApi: '/all-courses',
            editApi: '/all-courses-edit',
            filterQuery: { category: 'academic-vocab' },
            isCourseCollection: true,
          },
          {
            id: '2-II-b',
            title: 'Hard High-Yield Vocabulary',
            getApi: '/all-courses',
            editApi: '/all-courses-edit',
            filterQuery: { category: 'high-yield-vocab' },
            isCourseCollection: true,
          },
          {
            id: '2-II-c',
            title: 'Advanced Elite Vocabulary',
            getApi: '/all-courses',
            editApi: '/all-courses-edit',
            filterQuery: { category: 'elite-vocab' },
            isCourseCollection: true,
          },
          {
            id: '2-II-d',
            title: 'Admission & Job Exam Vocabulary',
            getApi: '/all-courses',
            editApi: '/all-courses-edit',
            filterQuery: { category: 'job-vocab' },
            isCourseCollection: true,
          },
          {
            id: '2-II-e',
            title: 'Sentence Anatomy & Syntax',
            getApi: '/all-courses',
            editApi: '/all-courses-edit',
            filterQuery: { category: 'sentence-syntax' },
            isCourseCollection: true,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Study Abroad',
    children: [
      {
        id: '3-I',
        title: 'Scholarship and Admission Info',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { category: 'overall-courses', track: 'GLOBAL PATHWAY' },
        isCourseCollection: true,
      },
      {
        id: '3-II',
        title: 'IELTS Resources',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { category: 'ielts-prep' },
        isCourseCollection: true,
      },
      {
        id: '3-III',
        title: 'GRE Info',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { category: 'gre-prep' },
        isCourseCollection: true,
      },
      {
        id: '3-IV',
        title: 'Student Counselling',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { category: 'counselling' },
        isCourseCollection: true,
      },
    ],
  },
  {
    id: '4',
    title: 'Computer Science & Engineering (CSE)',
    children: [
      {
        id: '4-I',
        title: 'Data Structures',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'CSE', subject: 'data-structures' },
        isCourseCollection: true,
      },
      {
        id: '4-II',
        title: 'Design & Analysis of Algorithms',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'CSE', subject: 'algorithms' },
        isCourseCollection: true,
      },
      {
        id: '4-III',
        title: 'Operating Systems',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'CSE', subject: 'operating-systems' },
        isCourseCollection: true,
      },
      {
        id: '4-IV',
        title: 'Computer Architecture & Organization',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'CSE', subject: 'architecture' },
        isCourseCollection: true,
      },
      {
        id: '4-V',
        title: 'Computer Networks',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'CSE', subject: 'networks' },
        isCourseCollection: true,
      },
      {
        id: '4-VI',
        title: 'Database Management Systems',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'CSE', subject: 'dbms' },
        isCourseCollection: true,
      },
      {
        id: '4-VII',
        title: 'Graph Theory & Combinatorics',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'CSE', subject: 'graph-theory' },
        isCourseCollection: true,
      },
      {
        id: '4-VIII',
        title: 'Theory of Computation & Automata',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'CSE', subject: 'automata' },
        isCourseCollection: true,
      },
    ],
  },
  {
    id: '5',
    title: 'HSC',
    children: [
      {
        id: '5-I',
        title: 'Physics',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'HSC', subject: 'physics' },
        isCourseCollection: true,
      },
      {
        id: '5-II',
        title: 'Chemistry',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'HSC', subject: 'chemistry' },
        isCourseCollection: true,
      },
      {
        id: '5-III',
        title: 'Biology',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'HSC', subject: 'biology' },
        isCourseCollection: true,
      },
      {
        id: '5-IV',
        title: 'Higher mathematics',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'HSC', subject: 'higher-math' },
        isCourseCollection: true,
      },
    ],
  },
  {
    id: '6',
    title: 'SSC',
    children: [
      {
        id: '6-I',
        title: 'Physics',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'SSC', subject: 'physics' },
        isCourseCollection: true,
      },
      {
        id: '6-II',
        title: 'Chemistry',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'SSC', subject: 'chemistry' },
        isCourseCollection: true,
      },
      {
        id: '6-III',
        title: 'Biology',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'SSC', subject: 'biology' },
        isCourseCollection: true,
      },
      {
        id: '6-IV',
        title: 'General mathematics',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'SSC', subject: 'general-math' },
        isCourseCollection: true,
      },
      {
        id: '6-V',
        title: 'Higher mathematics',
        getApi: '/all-courses',
        editApi: '/all-courses-edit',
        filterQuery: { track: 'SSC', subject: 'higher-math' },
        isCourseCollection: true,
      },
    ],
  },
];

// Helper to recursively locate a category item by unique ID
export function findCategoryById(tree, targetId) {
  if (!targetId) return null;
  for (const item of tree) {
    if (String(item.id) === String(targetId)) return item;
    if (item.children && item.children.length > 0) {
      const found = findCategoryById(item.children, targetId);
      if (found) return found;
    }
  }
  return null;
}

// Helper to check if a menu subtree contains the current active leaf item
function containsActiveChild(item, activeId) {
  if (!activeId) return false;
  if (item.id && String(item.id) === String(activeId)) return true;
  if (item.children && item.children.length > 0) {
    return item.children.some((child) => containsActiveChild(child, activeId));
  }
  return false;
}

function MenuItem({ item, level = 0, onSelect, activeCategory }) {
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Exact unique ID match: ensures Regular ('2-1-1') and Extra ('2-1-2') never conflict
  const isSelected = Boolean(
    !hasChildren &&
    activeCategory?.id &&
    String(item.id) === String(activeCategory.id)
  );

  const isClickable = Boolean(item.getApi || hasChildren);
  const [isOpen, setIsOpen] = useState(() =>
    containsActiveChild(item, activeCategory?.id)
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (containsActiveChild(item, activeCategory?.id)) {
      setIsOpen(true);
    }
  }, [activeCategory, item]);

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    } else if (item.getApi && typeof onSelect === 'function') {
      onSelect(item);
    }
  };

  let bgColor = 'transparent';
  let textColor = '#475569';

  if (isSelected) {
    bgColor = '#e2e8f0';
    textColor = '#0f172a';
  } else if (isHovered) {
    bgColor = '#f1f5f9';
    textColor = '#0f172a';
  }

  if (level === 0 && !isSelected) {
    textColor = isHovered ? '#0f172a' : '#1e293b';
  }

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          cursor: isClickable ? 'pointer' : 'default',
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
          {!hasChildren && item.getApi && (
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
              activeCategory={activeCategory}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function DropDownItems({ onCategorySelect, onSelect, activeCategory }) {
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
            activeCategory={activeCategory}
          />
        ))}
      </ul>
    </nav>
  );
}