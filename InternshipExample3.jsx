import React, { useState, useRef, useEffect } from 'react';
// import './App.css';
import './InternshipExample.scss'
import NeedleImage from './Intership_Images/needle.png';
import BatImage from './Intership_Images/bat.png';
import SocksImage from './Intership_Images/socks.png';
import ShirtImage from './Intership_Images/shirt.png';
import BowlImage from './Intership_Images/bowl.png';
import BallImage from './Intership_Images/ball.png';
import SpoonImage from './Intership_Images/spoon.png';
import ShortsImage from './Intership_Images/shorts.png';
import ShoesImage from './Intership_Images/shoes.png';
import ThreadImage from './Intership_Images/thread.png';

//JSON Data
const jsonModel = {
  "Matching Scheme": "Simple",
  "matchtype": "1:1",
  "columns": [
    {
      "column": "Column A",
      "type": "Image",
      "values": [
        "Needle",
        "Bat",
        "Socks",
        "Shirt",
        "Bowl"
      ]
    },
    {
      "column": "Column B",
      "type": "Image",
      "values": [
        "Ball",
        "spoon",
        "Shorts",
        "Shoes",
        "Thread"
      ]
    }
  ],
  "matches": [
    { "Column A": 1, "Column B": "e" },
    { "Column A": 2, "Column B": "a" },
    { "Column A": 3, "Column B": "d" },
    { "Column A": 4, "Column B": "c" },
    { "Column A": 5, "Column B": "b" }
  ]
};

const correctMatches = {};
jsonModel.matches.forEach(match => {
  correctMatches[match["Column A"]] = match["Column B"];
});

function InternshipExample3() {
  const [connections, setConnections] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dragging, setDragging] = useState(null);
  const [arrowPosition, setArrowPosition] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  const svgRef = useRef();

  const columnA = jsonModel.columns.find(col => col.column === "Column A").values;
  const columnB = jsonModel.columns.find(col => col.column === "Column B").values;

  const handleMouseDown = (e, id, column) => {
    e.preventDefault();
    const svgRect = svgRef.current.getBoundingClientRect();
    setDragging({
      id,
      column,
      startX: e.clientX - svgRect.left,
      startY: e.clientY - svgRect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    setArrowPosition({
      x1: dragging.startX,
      y1: dragging.startY,
      x2: x,
      y2: y,
    });
  };
//To connect one pair at a time (1 to 1) 
  const handleMouseUp = (e) => {
    if (!dragging) return;
    const targetId = e.target.id;
    const targetColumn = targetId.includes('columnB-') ? 'columnB' : null;
    if (!targetColumn) return;

    // Ensure no multiple connections to a single point
    const existingConnection = connections.find(conn => conn[targetColumn] === targetId.split('-')[1]);
    if (existingConnection) return;

    // Ensure the same point from Column A is not connected to multiple points
    const newConnection = {
      [dragging.column]: dragging.id,
      [targetColumn]: targetId.split('-')[1],
    };
    setConnections([...connections.filter(conn => conn[dragging.column] !== dragging.id), newConnection]);
    setDragging(null);
    setArrowPosition({ x1: 0, y1: 0, x2: 0, y2: 0 });
  };

  const checkAnswers = () => {
    if (connections.length === 0) {
      setIsCorrect(false);
      setIsChecked(true);
      return;
    }

    let correctCount = 0;
    connections.forEach((connection) => {
      const columnAId = connection.columnA;
      const columnBId = connection.columnB;
      if (correctMatches[columnAId] === columnBId) {
        correctCount++;
      }
    });
  //Correct Answer count
    if (correctCount === 5) {
      alert("Congratulations! You've achieved a perfect score of 5 out of 5!");
    } else if (correctCount === 0) {
      alert("No matches found. Please try again.");
    } else {
      alert(`You've got ${correctCount} correct matches out of 5.`);
    }
  };

  const clearConnections = () => {
    setConnections([]);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const renderConnections = () => {
    return connections.map((connection, index) => {
      const startElement = document.getElementById(`columnA-${connection.columnA}`);
      const endElement = document.getElementById(`columnB-${connection.columnB}`);
      if (!startElement || !endElement) return null;
      const startRect = startElement.getBoundingClientRect();
      const endRect = endElement.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();
      const startX = startRect.right - svgRect.left;
      const startY = startRect.top + startRect.height / 2 - svgRect.top;
      const endX = endRect.left - svgRect.left;
      const endY = endRect.top + endRect.height / 2 - svgRect.top;
      const angle = Math.atan2(endY - startY, endX - startX);
      const arrowLength = 10;
      const arrowPoint1X = endX - arrowLength * Math.cos(angle - Math.PI / 6);
      const arrowPoint1Y = endY - arrowLength * Math.sin(angle - Math.PI / 6);
      const arrowPoint2X = endX - arrowLength * Math.cos(angle + Math.PI / 6);
      const arrowPoint2Y = endY - arrowLength * Math.sin(angle + Math.PI / 6);
      return (
        <g key={index}>
          <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="blue" strokeWidth="1" />
          <polygon points={`${endX},${endY} ${arrowPoint1X},${arrowPoint1Y} ${arrowPoint2X},${arrowPoint2Y}`} fill="blue" />
        </g>
      );
    });
  };

  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      handleMouseMove(e);
    };
    const handleWindowMouseUp = (e) => {
      handleMouseUp(e);
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [dragging]);

//Switch case for Text and their image
  const getImageForItem = (item) => {
    switch (item) {
      case 'Needle':
        return NeedleImage;
      case 'Bat':
        return BatImage;
      case 'Socks':
        return SocksImage;
      case 'Shirt':
        return ShirtImage;
      case 'Bowl':
        return BowlImage;
      case 'Ball':
        return BallImage;
      case 'spoon': // Lowercase 'spoon' instead of 'Spoon'
        return SpoonImage;
      case 'Shorts':
        return ShortsImage;
      case 'Shoes':
        return ShoesImage;
      case 'Thread':
        return ThreadImage;
      default:
        return null;
    }
  };

// rerendering pairs for repositioning of connected pairs
useEffect(() => {
  const handleWindowResize = () => {
    // Recalculate and update the positions of connections
    setConnections((prevConnections) => {
      return prevConnections.map((connection) => {
        const { columnA, columnB } = connection;
        const startElement = document.getElementById(`columnA-${columnA}`);
        const endElement = document.getElementById(`columnB-${columnB}`);
        if (!startElement || !endElement) return connection;

        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();
        const startX = startRect.right - svgRect.left;
        const startY = startRect.top + startRect.height / 2 - svgRect.top;
        const endX = endRect.left - svgRect.left;
        const endY = endRect.top + endRect.height / 2 - svgRect.top;

        return {
          ...connection,
          startX,
          startY,
          endX,
          endY,
        };
      });
    });
  };

  window.addEventListener('resize', handleWindowResize);

  return () => {
    window.removeEventListener('resize', handleWindowResize);
  };
}, [connections]); // Re-run effect when connections change

//Fetching JSON values and display in table format.
  return (
    <div className="InternApp">
      <h1>Matching Fractions and It's Figures</h1>
      <svg ref={svgRef} className="svg-container">
        <line id="current-arrow" stroke="blue" strokeWidth="1" x1={arrowPosition.x1} y1={arrowPosition.y1} x2={arrowPosition.x2} y2={arrowPosition.y2} />
        {renderConnections()}
      </svg>
      <div className="Interncolumns">
        <div className="Interncolumn">
          <h2>Fractions</h2>
          <table>
            <tbody>
              {columnA.map((item, index) => (
                <tr key={index}>
                  <td width="20%" height="40px">{index + 1}.</td>
                  <td width="30%" height="40px"><img src={getImageForItem(item)} /></td>
                  <td>{item}</td>
                  <td width="10%">
                    <div
                      id={`columnA-${index + 1}`}
                      className="Interncircle"
                      onMouseDown={(e) => handleMouseDown(e, index + 1, 'columnA')}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="Interncolumn">
          <h2>Figures</h2>
          <table>
            <tbody>
              {columnB.map((item, index) => (
                <tr key={index}>
                  <td width="10%">
                    <div
                      id={`columnB-${String.fromCharCode(97 + index)}`}
                      className="circle"
                      onMouseUp={handleMouseUp}
                    ></div>
                  </td>
                  <td width="20%" height="40px">{String.fromCharCode(97 + index)}.</td>
                  <td width="30%" height="40px"><img src={getImageForItem(item)} /></td>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
      <button onClick={clearConnections}>Clear Connections</button>
      <button onClick={checkAnswers}>Check Answers</button>
      </div>
      {isChecked && (
        <div className="Internresult">
          {isCorrect ? "All answers are correct!" : "Please match the pairs and then check the answers "}
        </div>
      )}
    </div>
  );
}

export default InternshipExample3;