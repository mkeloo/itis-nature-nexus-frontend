import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

const CustomContentTreemap = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query5');
        const rawData = response.data;

        // Create the hierarchical structure for the Treemap
        const dataHierarchy = rawData.reduce((accumulator, current) => {
          let stateNode = accumulator.find(
            (s) => s.name === current.STATEPROVINCE
          );
          if (!stateNode) {
            stateNode = { name: current.STATEPROVINCE, children: [] };
            accumulator.push(stateNode);
          }

          let genusNode = stateNode.children.find(
            (g) => g.name === current.GENUS
          );
          if (!genusNode) {
            genusNode = { name: current.GENUS, size: 0, children: [] };
            stateNode.children.push(genusNode);
          }

          genusNode.size += current.NUMBEROFSPECIES;
          genusNode.children.push({
            name: current.iucnRedListCategory,
            size: current.NUMBEROFSPECIES,
            stateProvince: current.STATEPROVINCE,
            family: current.FAMILY,
            genus: current.GENUS,
            threatened: current.THREATENEDSPECIES,
          });

          return accumulator;
        }, []);

        setTreeData(dataHierarchy);
      } catch (error) {
        console.error('Error fetching data for treemap:', error);
      }
    };

    fetchData();
  }, []);

  // Define the custom tooltip
  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { stateProvince, family, genus, threatened } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">{`State/Province: ${stateProvince}`}</p>
          <p className="label">{`Family: ${family}`}</p>
          <p className="label">{`Genus: ${genus}`}</p>
          <p className="label">{`Threatened Species: ${threatened}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <Treemap
        data={treeData}
        dataKey="size"
        aspectRatio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
      >
        <Tooltip content={renderTooltip} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default CustomContentTreemap;
