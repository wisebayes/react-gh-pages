// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';
// import logo from './logo.svg';

// // TimelineNode component represents each career/education milestone
// const TimelineNode = ({ year, title, description, image, position, visible, onClick }) => {
//   return (
//     <div 
//       className={`timeline-node ${visible ? 'visible' : ''}`} 
//       style={{ left: `${position}%` }}
//       onClick={onClick}
//     >
//       <div className="timeline-year">{year}</div>
//       <div className="timeline-content">
//         <img src={image || logo} alt={title} className="timeline-image" />
//         <h3>{title}</h3>
//         <p className="timeline-description">{description}</p>
//       </div>
//     </div>
//   );
// };

// // NodeConnection component draws SVG lines between nodes
// const NodeConnection = ({ startX, startY, endX, endY, visible }) => {
//   return (
//     <svg className={`node-connection ${visible ? 'visible' : ''}`} style={{
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: -1
//     }}>
//       <line 
//         x1={startX} 
//         y1={startY} 
//         x2={endX} 
//         y2={endY} 
//         stroke="#4a90e2" 
//         strokeWidth="2"
//         strokeDasharray="5,5"
//       />
//     </svg>
//   );
// };

// // DetailModal component for showing more information when clicking a node
// const DetailModal = ({ node, onClose }) => {
//   if (!node) return null;
  
//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <button className="modal-close" onClick={onClose}>×</button>
//         <div className="modal-header">
//           <h2>{node.title} ({node.year})</h2>
//         </div>
//         <div className="modal-body">
//           <img src={node.image || logo} alt={node.title} className="modal-image" />
//           <div className="modal-description">
//             <p>{node.fullDescription}</p>
//             {node.skills && (
//               <div className="skills-section">
//                 <h3>Skills</h3>
//                 <div className="skills-container">
//                   {node.skills.map((skill, index) => (
//                     <span key={index} className="skill-tag">{skill}</span>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {node.projects && (
//               <div className="projects-section">
//                 <h3>Notable Projects</h3>
//                 <ul>
//                   {node.projects.map((project, index) => (
//                     <li key={index}>
//                       <strong>{project.name}</strong>: {project.description}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Current Bio component that appears at the end of the timeline
// const CurrentBio = ({ data, visible }) => {
//   return (
//     <div className={`current-bio ${visible ? 'visible' : ''}`}>
//       <div className="bio-container">
//         <div className="bio-header">
//           <img src={data.image || logo} alt="Profile" className="bio-image" />
//           <div className="bio-title-section">
//             <h1>{data.name}</h1>
//             <h2>{data.title}</h2>
//           </div>
//         </div>
//         <div className="bio-content">
//           <p className="bio-description">{data.bio}</p>
          
//           <div className="bio-section">
//             <h3>Skills</h3>
//             <div className="skills-grid">
//               {data.skills.map((category, idx) => (
//                 <div key={idx} className="skill-category">
//                   <h4>{category.category}</h4>
//                   <ul>
//                     {category.items.map((skill, skillIdx) => (
//                       <li key={skillIdx}>{skill}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div className="bio-section">
//             <h3>Contact</h3>
//             <div className="contact-info">
//               <p><strong>Email:</strong> {data.contact.email}</p>
//               <p><strong>GitHub:</strong> <a href={data.contact.github} target="_blank" rel="noopener noreferrer">{data.contact.github.replace('https://github.com/', '')}</a></p>
//               <p><strong>LinkedIn:</strong> <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">{data.contact.linkedin.replace('https://www.linkedin.com/in/', '')}</a></p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// function App() {
//   // Sample portfolio data
//   const timelineData = [
//     {
//       id: 1,
//       year: '2016',
//       title: 'Computer Science Degree',
//       description: 'Started my journey at University',
//       fullDescription: 'Began my Bachelor of Science in Computer Science at XYZ University. Focused on core programming concepts, data structures, and algorithms. Participated in coding competitions and joined the Computer Science club.',
//       position: 15,
//       visibleAt: 0.1,
//       image: logo,
//       skills: ['Java', 'Python', 'Data Structures', 'Algorithms'],
//       projects: [
//         { name: 'Maze Solver', description: 'Implemented A* and BFS algorithms to solve mazes' },
//         { name: 'Simple Compiler', description: 'Built a basic compiler for a subset of C' }
//       ]
//     },
//     {
//       id: 2,
//       year: '2018',
//       title: 'First Internship',
//       description: 'Software developer intern at TechCorp',
//       fullDescription: 'Completed a summer internship at TechCorp working on their web application platform. Contributed to the frontend team and learned modern JavaScript frameworks. Implemented new features and fixed bugs in the production codebase.',
//       position: 40,
//       visibleAt: 0.3,
//       image: logo,
//       skills: ['JavaScript', 'React', 'CSS', 'Git'],
//       projects: [
//         { name: 'User Dashboard', description: 'Implemented interactive data visualization components' },
//         { name: 'Performance Optimization', description: 'Improved load times by 30% through code splitting' }
//       ]
//     },
//     {
//       id: 3,
//       year: '2020',
//       title: 'Graduation',
//       description: 'Graduated with honors in CS',
//       fullDescription: 'Graduated with a Bachelor of Science in Computer Science with honors. Senior thesis focused on applying machine learning techniques to natural language processing. Received the Outstanding CS Student award.',
//       position: 60,
//       visibleAt: 0.5,
//       image: logo,
//       skills: ['Machine Learning', 'NLP', 'Python', 'TensorFlow'],
//       projects: [
//         { name: 'Sentiment Analysis Tool', description: 'Built an NLP system for analyzing customer feedback' },
//         { name: 'Research Paper', description: 'Published "Improving Text Classification with Semi-Supervised Learning"' }
//       ]
//     },
//     {
//       id: 4,
//       year: '2021',
//       title: 'First Developer Role',
//       description: 'Full-stack developer at StartupX',
//       fullDescription: 'Joined StartupX as a full-stack developer working on their SaaS platform. Responsible for implementing new features, improving the user experience, and ensuring code quality. Worked in an agile environment with two-week sprints.',
//       position: 75,
//       visibleAt: 0.7,
//       image: logo,
//       skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
//       projects: [
//         { name: 'Authentication System', description: 'Implemented OAuth and MFA for the platform' },
//         { name: 'API Gateway', description: 'Built a unified API gateway for microservices architecture' }
//       ]
//     },
//   ];

//   const currentBioData = {
//     name: 'Jamie Smith',
//     title: 'Senior Software Engineer',
//     image: logo,
//     bio: 'Passionate software engineer with 5+ years of experience building web applications and distributed systems. Focused on creating clean, maintainable code and solving complex technical challenges. Enthusiastic about open source and mentoring junior developers.',
//     skills: [
//       {
//         category: 'Languages',
//         items: ['JavaScript/TypeScript', 'Python', 'Go', 'SQL']
//       },
//       {
//         category: 'Frontend',
//         items: ['React', 'Redux', 'HTML/CSS', 'Webpack', 'Jest']
//       },
//       {
//         category: 'Backend',
//         items: ['Node.js', 'Express', 'Django', 'GraphQL', 'REST API Design']
//       },
//       {
//         category: 'DevOps',
//         items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform']
//       }
//     ],
//     contact: {
//       email: 'jamie.smith@example.com',
//       github: 'https://github.com/jamiesmith',
//       linkedin: 'https://www.linkedin.com/in/jamiesmith'
//     }
//   };

//   const [visibleNodes, setVisibleNodes] = useState([]);
//   const [visibleConnections, setVisibleConnections] = useState([]);
//   const [nodeRefs, setNodeRefs] = useState({});
//   const [showCurrentBio, setShowCurrentBio] = useState(false);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const timelineRef = useRef(null);

//   // Initialize node refs
//   useEffect(() => {
//     const refs = {};
//     timelineData.forEach(node => {
//       refs[node.id] = React.createRef();
//     });
//     setNodeRefs(refs);
//   }, []);

//   // Handle scroll events to reveal nodes and connections
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight;
//       const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
      
//       // Show nodes based on scroll position
//       const newVisibleNodes = timelineData
//         .filter(node => scrollPercentage >= node.visibleAt)
//         .map(node => node.id);
      
//       setVisibleNodes(newVisibleNodes);
      
//       // Calculate connections between visible nodes
//       if (newVisibleNodes.length > 1) {
//         const connections = [];
//         for (let i = 1; i < newVisibleNodes.length; i++) {
//           connections.push({
//             id: `${newVisibleNodes[i-1]}-${newVisibleNodes[i]}`,
//             start: newVisibleNodes[i-1],
//             end: newVisibleNodes[i],
//           });
//         }
//         setVisibleConnections(connections);
//       }
      
//       // Show current bio at the end
//       setShowCurrentBio(scrollPercentage > 0.85);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [timelineData]);
  
//   // Calculate connection coordinates
//   const getConnectionCoordinates = (startId, endId) => {
//     if (!nodeRefs[startId]?.current || !nodeRefs[endId]?.current) {
//       return { startX: 0, startY: 0, endX: 0, endY: 0 };
//     }
    
//     const startRect = nodeRefs[startId].current.getBoundingClientRect();
//     const endRect = nodeRefs[endId].current.getBoundingClientRect();
//     const timelineRect = timelineRef.current.getBoundingClientRect();
    
//     return {
//       startX: startRect.left + startRect.width/2 - timelineRect.left,
//       startY: startRect.top + startRect.height/2 - timelineRect.top,
//       endX: endRect.left + endRect.width/2 - timelineRect.left,
//       endY: endRect.top + endRect.height/2 - timelineRect.top,
//     };
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>My CS Journey</h1>
//         <p>Scroll down to explore my career path and experience</p>
//       </header>
      
//       <div className="timeline-container" ref={timelineRef}>
//         {timelineData.map(node => (
//           <div ref={nodeRefs[node.id]} key={node.id}>
//             <TimelineNode
//               {...node}
//               visible={visibleNodes.includes(node.id)}
//               onClick={() => setSelectedNode(node)}
//             />
//           </div>
//         ))}
        
//         {visibleConnections.map(connection => {
//           const coords = getConnectionCoordinates(connection.start, connection.end);
//           return (
//             <NodeConnection
//               key={connection.id}
//               {...coords}
//               visible={true}
//             />
//           );
//         })}
//       </div>
      
//       <CurrentBio 
//         data={currentBioData}
//         visible={showCurrentBio}
//       />
      
//       {selectedNode && (
//         <DetailModal
//           node={selectedNode}
//           onClose={() => setSelectedNode(null)}
//         />
//       )}
      
//       <div className="scroll-spacer"></div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './logo.svg';

// TimelineNode component represents each career/education milestone
const TimelineNode = ({ year, title, description, image, position, visible, onClick }) => {
  return (
    <div 
      className={`timeline-node ${visible ? 'visible' : ''}`} 
      style={{ left: `${position}%` }}
      onClick={onClick}
    >
      <div className="timeline-year">{year}</div>
      <div className="timeline-content">
        <img src={image || logo} alt={title} className="timeline-image" />
        <h3>{title}</h3>
        <p className="timeline-description">{description}</p>
      </div>
    </div>
  );
};

// NodeConnection component draws SVG lines between nodes
const NodeConnection = ({ startX, startY, endX, endY, visible }) => {
  return (
    <svg className={`node-connection ${visible ? 'visible' : ''}`} style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1
    }}>
      <line 
        x1={startX} 
        y1={startY} 
        x2={endX} 
        y2={endY} 
        stroke="#4a90e2" 
        strokeWidth="2"
        strokeDasharray="5,5"
      />
    </svg>
  );
};

// DetailModal component for showing more information when clicking a node
const DetailModal = ({ node, onClose }) => {
  if (!node) return null;
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2>{node.title} ({node.year})</h2>
        </div>
        <div className="modal-body">
          <img src={node.image || logo} alt={node.title} className="modal-image" />
          <div className="modal-description">
            <p>{node.fullDescription}</p>
            {node.skills && (
              <div className="skills-section">
                <h3>Skills</h3>
                <div className="skills-container">
                  {node.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {node.projects && (
              <div className="projects-section">
                <h3>Notable Projects</h3>
                <ul>
                  {node.projects.map((project, index) => (
                    <li key={index}>
                      <strong>{project.name}</strong>: {project.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Current Bio component that appears at the end of the timeline
const CurrentBio = ({ data, visible }) => {
  return (
    <div className={`current-bio ${visible ? 'visible' : ''}`}>
      <div className="bio-container">
        <div className="bio-header">
          <img src={data.image || logo} alt="Profile" className="bio-image" />
          <div className="bio-title-section">
            <h1>{data.name}</h1>
            <h2>{data.title}</h2>
          </div>
        </div>
        <div className="bio-content">
          <p className="bio-description">{data.bio}</p>
          
          <div className="bio-section">
            <h3>Skills</h3>
            <div className="skills-grid">
              {data.skills.map((category, idx) => (
                <div key={idx} className="skill-category">
                  <h4>{category.category}</h4>
                  <ul>
                    {category.items.map((skill, skillIdx) => (
                      <li key={skillIdx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bio-section">
            <h3>Contact</h3>
            <div className="contact-info">
              <p><strong>Email:</strong> {data.contact.email}</p>
              <p><strong>GitHub:</strong> <a href={data.contact.github} target="_blank" rel="noopener noreferrer">{data.contact.github.replace('https://github.com/', '')}</a></p>
              <p><strong>LinkedIn:</strong> <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">{data.contact.linkedin.replace('https://www.linkedin.com/in/', '')}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  // Sample portfolio data
  const timelineData = [
    {
      id: 1,
      year: '2016',
      title: 'Computer Science Degree',
      description: 'Started my journey at University',
      fullDescription: 'Began my Bachelor of Science in Computer Science at XYZ University. Focused on core programming concepts, data structures, and algorithms. Participated in coding competitions and joined the Computer Science club.',
      position: 15,
      sectionId: 'section-1',
      image: logo,
      skills: ['Java', 'Python', 'Data Structures', 'Algorithms'],
      projects: [
        { name: 'Maze Solver', description: 'Implemented A* and BFS algorithms to solve mazes' },
        { name: 'Simple Compiler', description: 'Built a basic compiler for a subset of C' }
      ]
    },
    {
      id: 2,
      year: '2018',
      title: 'First Internship',
      description: 'Software developer intern at TechCorp',
      fullDescription: 'Completed a summer internship at TechCorp working on their web application platform. Contributed to the frontend team and learned modern JavaScript frameworks. Implemented new features and fixed bugs in the production codebase.',
      position: 40,
      sectionId: 'section-2',
      image: logo,
      skills: ['JavaScript', 'React', 'CSS', 'Git'],
      projects: [
        { name: 'User Dashboard', description: 'Implemented interactive data visualization components' },
        { name: 'Performance Optimization', description: 'Improved load times by 30% through code splitting' }
      ]
    },
    {
      id: 3,
      year: '2020',
      title: 'Graduation',
      description: 'Graduated with honors in CS',
      fullDescription: 'Graduated with a Bachelor of Science in Computer Science with honors. Senior thesis focused on applying machine learning techniques to natural language processing. Received the Outstanding CS Student award.',
      position: 60,
      sectionId: 'section-3',
      image: logo,
      skills: ['Machine Learning', 'NLP', 'Python', 'TensorFlow'],
      projects: [
        { name: 'Sentiment Analysis Tool', description: 'Built an NLP system for analyzing customer feedback' },
        { name: 'Research Paper', description: 'Published "Improving Text Classification with Semi-Supervised Learning"' }
      ]
    },
    {
      id: 4,
      year: '2021',
      title: 'First Developer Role',
      description: 'Full-stack developer at StartupX',
      fullDescription: 'Joined StartupX as a full-stack developer working on their SaaS platform. Responsible for implementing new features, improving the user experience, and ensuring code quality. Worked in an agile environment with two-week sprints.',
      position: 75,
      sectionId: 'section-4',
      image: logo,
      skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
      projects: [
        { name: 'Authentication System', description: 'Implemented OAuth and MFA for the platform' },
        { name: 'API Gateway', description: 'Built a unified API gateway for microservices architecture' }
      ]
    },
  ];

  const currentBioData = {
    name: 'Chandhru Karthick',
    title: 'Columbia University',
    image: logo,
    bio: 'Passionate software engineer with 1-2 years of experience building web applications and distributed systems. Focused on creating clean, maintainable code and solving complex technical challenges. Enthusiastic about open source and mentoring junior developers.',
    skills: [
      {
        category: 'Languages',
        items: ['JavaScript/TypeScript', 'Python', 'Go', 'SQL']
      },
      {
        category: 'Frontend',
        items: ['React', 'Redux', 'HTML/CSS', 'Webpack', 'Jest']
      },
      {
        category: 'Backend',
        items: ['Node.js', 'Express', 'Django', 'GraphQL', 'REST API Design']
      },
      {
        category: 'DevOps',
        items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform']
      }
    ],
    contact: {
      email: '[firstname].k@columbia.edu',
      github: 'https://github.com/wisebayes',
      linkedin: 'https://www.linkedin.com/in/chandhru-k'
    }
  };

  const [visibleNodes, setVisibleNodes] = useState([]);
  const [visibleConnections, setVisibleConnections] = useState([]);
  const [nodeRefs, setNodeRefs] = useState({});
  const [showCurrentBio, setShowCurrentBio] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const timelineRef = useRef(null);
  const sectionRefs = useRef({});

  // Initialize node and section refs
  useEffect(() => {
    const refs = {};
    const sections = {};
    
    timelineData.forEach(node => {
      refs[node.id] = React.createRef();
      sections[node.sectionId] = React.createRef();
    });
    
    // Add current bio section
    sections['section-bio'] = React.createRef();
    
    setNodeRefs(refs);
    sectionRefs.current = sections;
  }, []);

  // Handle scroll and reveal nodes
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Determine which section is in view
      let currentSection = null;
      let minDistance = Infinity;
      
      Object.entries(sectionRefs.current).forEach(([id, ref]) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      });
      
      // Find visible nodes based on section
      const newVisibleNodes = timelineData
        .filter(node => {
          // If we're in the bio section, show all nodes
          if (currentSection === 'section-bio') return true;
          
          // Otherwise only show nodes up to the current section
          const sectionIndex = parseInt(currentSection?.split('-')[1] || '0');
          const nodeIndex = parseInt(node.sectionId.split('-')[1]);
          return nodeIndex <= sectionIndex;
        })
        .map(node => node.id);
      
      setVisibleNodes(newVisibleNodes);
      
      // Calculate connections between visible nodes
      if (newVisibleNodes.length > 1) {
        const connections = [];
        for (let i = 1; i < newVisibleNodes.length; i++) {
          connections.push({
            id: `${newVisibleNodes[i-1]}-${newVisibleNodes[i]}`,
            start: newVisibleNodes[i-1],
            end: newVisibleNodes[i],
          });
        }
        setVisibleConnections(connections);
      }
      
      // Show current bio when we reach that section
      setShowCurrentBio(currentSection === 'section-bio');
      
      // Update active section
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isScrolling]);

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const section = sectionRefs.current[sectionId];
    if (section && section.current) {
      setIsScrolling(true);
      
      section.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Allow time for smooth scrolling
    }
  };
  
  // Calculate connection coordinates
  const getConnectionCoordinates = (startId, endId) => {
    if (!nodeRefs[startId]?.current || !nodeRefs[endId]?.current) {
      return { startX: 0, startY: 0, endX: 0, endY: 0 };
    }
    
    const startRect = nodeRefs[startId].current.getBoundingClientRect();
    const endRect = nodeRefs[endId].current.getBoundingClientRect();
    const timelineRect = timelineRef.current.getBoundingClientRect();
    
    return {
      startX: startRect.left + startRect.width/2 - timelineRect.left,
      startY: startRect.top + startRect.height/2 - timelineRect.top,
      endX: endRect.left + endRect.width/2 - timelineRect.left,
      endY: endRect.top + endRect.height/2 - timelineRect.top,
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My CS Journey</h1>
        <p>Scroll down to explore my career path and experience</p>
        <div className="scroll-indicator">
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
        </div>
      </header>
      
      <nav className="timeline-nav">
        <ul>
          {timelineData.map((node) => (
            <li key={node.id}>
              <button 
                className={activeSection === node.sectionId ? 'active' : ''}
                onClick={() => scrollToSection(node.sectionId)}
              >
                {node.year}
              </button>
            </li>
          ))}
          <li>
            <button 
              className={activeSection === 'section-bio' ? 'active' : ''}
              onClick={() => scrollToSection('section-bio')}
            >
              Now
            </button>
          </li>
        </ul>
      </nav>
      <div className="timeline-container" ref={timelineRef}>
        {timelineData.map(node => (
          <div 
            id={node.sectionId} 
            key={node.id} 
            ref={sectionRefs.current[node.sectionId]} 
            className="timeline-section"
          >
            <div className="section-anchor"></div>
            <div ref={nodeRefs[node.id]}>
              <TimelineNode
                {...node}
                visible={visibleNodes.includes(node.id)}
                onClick={() => setSelectedNode(node)}
              />
            </div>
          </div>
        ))}
        
        {visibleConnections.map(connection => {
          const coords = getConnectionCoordinates(connection.start, connection.end);
          return (
            <NodeConnection
              key={connection.id}
              {...coords}
              visible={true}
            />
          );
        })}
      </div>
      
      <div 
        id="section-bio" 
        ref={sectionRefs.current['section-bio']} 
        className="bio-section-container"
      >
        <div className="section-anchor"></div>
        <CurrentBio 
          data={currentBioData}
          visible={showCurrentBio}
        />
      </div>
      
      {selectedNode && (
        <DetailModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
      
      {/* Progress indicator */}
      <div className="progress-indicator">
        {timelineData.map((node, index) => (
          <div 
            key={node.id}
            className={`progress-dot ${activeSection === node.sectionId ? 'active' : ''} ${visibleNodes.includes(node.id) ? 'visible' : ''}`}
            onClick={() => scrollToSection(node.sectionId)}
          >
            <span className="progress-tooltip">{node.year}</span>
          </div>
        ))}
        <div 
          className={`progress-dot ${activeSection === 'section-bio' ? 'active' : ''} ${showCurrentBio ? 'visible' : ''}`}
          onClick={() => scrollToSection('section-bio')}
        >
          <span className="progress-tooltip">Now</span>
        </div>
        <div className="progress-line"></div>
      </div>
    </div>
  );
}

export default App;