import React, { useState, useEffect } from 'react'; 
import { MdOutlineSettingsInputAntenna } from "react-icons/md";
import axios from 'axios';


const Node = ({ id, battery, isLeader }) => {
  return (
    <div className={`${battery === 0 ? 'text-red-500' : isLeader ? 'text-cyan-600 animate-shock' : 'text-gray-700'} flex flex-col p-6 mx-6 my-6 h-full w-40 items-center`}>
      <h3 className='px-3'>Node{id}</h3>
      <MdOutlineSettingsInputAntenna className='h-16 w-16' />
      <div className='flex items-center'>
        <div>Battery :</div>
        <div>{battery.toFixed(1)}</div>
      </div>
    </div>
  );
};

const App = () => {
  const [nodes, setNodes] = useState([
    { id:1,battery:0},
    { id:2,battery:0},
    { id:3,battery:9.0},
    { id:4,battery:8},
    { id:5,battery:4.0},
    { id:6,battery:2.0},
    { id:7,battery:2.0},
    { id:8,battery:4.0},
    { id:9,battery:3.0},
    { id:10,battery:6.0},
  ]);
 /* useEffect(() => {
    const fetchBatteryData = async () => {
      try {
       
        const response = await axios.get('http://localhost:3000/batteries');
        console.log(response.data);
       setNodes(response.data)
      } catch (err) {
        setError('Error fetching data'); 
      } 
    };

    fetchBatteryData(); 
  }, []); // */
  

 
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) => {
        // Check if all batteries are zero
        const allBatteriesZero = prevNodes.every(node => node.battery === 0);

        if (allBatteriesZero) {
          // Clear the interval if all batteries are zero
          clearInterval(interval);
          return prevNodes; // Return unchanged nodes
        }

        // Find the leader node based on battery values
        const leaderNode = prevNodes.reduce((prev, current) => {
          if (prev.battery > current.battery) {
            return prev;
          } else if (prev.battery < current.battery) {
            return current;
          } else {
            return prev.id < current.id ? prev : current; // Tie-breaking by ID
          }
        });

        // Update the battery values
        return prevNodes.map((node) => {
          const batteryDecrease = node.id === leaderNode.id ? 0.3 : 0.1;
          return {
            ...node,
            battery: Math.max(node.battery - batteryDecrease, 0), // Prevent going below 0
          };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const layoutClasses = (n) => {
    switch (n) {
      case 3:
        return 'grid grid-cols-2 gap-4 justify-center items-center';
      case 4:
        return 'grid grid-cols-2 gap-4';
      case 5:
        return 'grid grid-cols-3 gap-4 justify-center items-center';
      case 6:
        return 'grid grid-cols-3 gap-4';
      case 7:
        return 'grid grid-cols-4 gap-4 justify-center';
      case 8:
        return 'grid grid-cols-4 gap-4';
      case 9:
        return 'grid grid-cols-3 gap-4 justify-center items-center';
      case 10:
        return 'grid grid-cols-5 gap-4';
      default:
        return 'grid grid-cols-1';
    }
  };
  

  return (
    <div className={`mx-auto mt-10 ${layoutClasses(nodes.length)}`}>
      {nodes.map((node) => (
        <Node
          key={node.id}
          id={node.id}
          battery={node.battery}
          isLeader={node.id === nodes.reduce((prev, current) => {
            if (prev.battery > current.battery) {
              return prev;
            } else if (prev.battery < current.battery) {
              return current;
            } else {
              return prev.id < current.id ? prev : current; // Tie-breaking by ID
            }
          }).id}
        />
      ))}
    </div>
  );
};

export default App;
