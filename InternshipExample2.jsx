import React, { useState, useRef, useEffect } from 'react';
import './InternshipExample.scss';
import image001 from './Intership_Images/number1.jpg';
import image002 from './Intership_Images/number2.jpg';
import image003 from './Intership_Images/number3.jpg';
import image004 from './Intership_Images/number4.jpg';
import image005 from './Intership_Images/number5.jpg';

import circle1 from './Intership_Images/circle1.jpg';
import circle2 from './Intership_Images/circle2.jpg';
import circle3 from './Intership_Images/circle3.jpg';
import circle4 from './Intership_Images/circle4.jpg';
import circle5 from './Intership_Images/circle5.jpg';

const jsonModel = {
  "Matching Scheme": "Simple",
  "matchtype": "1:1",
  "columns": [
    {
      "column": "Column A",
      "type": "image",
      "values": [
        image001,
        image002,
        image003,
        image004,
        image005
      ]
    },
    {
      "column": "Column B",
      "type": "image",
      "values": [
        circle1,
        circle2,
        circle3,
        circle4,
        circle5
      ]
    }
  ],
  "matches": [
    { "Column A": 1, "Column B": "b" },
    { "Column A": 2, "Column B": "d" },
    { "Column A": 3, "Column B": "e" },
    { "Column A": 4, "Column B": "a" },
    { "Column A": 5, "Column B": "c" }
  ]
};

const correctMatches = {};
jsonModel.matches.forEach(match => {
  correctMatches[match["Column A"]] = match["Column B"];
});

function InternshipExample2() {
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

  const handleMouseUp = (e) => {
    if (!dragging) return;
    const targetId = e.target.id;
    const targetColumn = targetId.includes('columnB-') ? 'columnB' : null;
    if (!targetColumn) return;

    const existingConnection = connections.find(conn => conn[targetColumn] === targetId.split('-')[1]);
    if (existingConnection) return;

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
      <svg ref={svgRef} className="Internsvg-container">
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
                  <td width="70%" height="40px"><img src={item} /></td>
                  <td width="10%">
                    <div
                      id={`columnA-${index + 1}`}
                      className="circle"
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
                      className="Interncircle"
                      onMouseUp={handleMouseUp}
                    ></div>
                  </td>
                  <td width="20%" height="40px">{String.fromCharCode(97 + index)}.</td>
                  <td width="70%" height="40px"><img src={item} /></td>
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

export default InternshipExample2;