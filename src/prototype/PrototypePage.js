import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import data from '../data/Warhammer_40000.json'; // Adjust the path as needed

const PrototypePage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    console.log("Raw JSON Data:", data); // Debugging raw JSON

    // Step 1: Navigate directly to the categoryEntry array
    const categoryEntryArray = data?.["{http://www.battlescribe.net/schema/gameSystemSchema}gameSystem"]
      ?.["{http://www.battlescribe.net/schema/gameSystemSchema}categoryEntries"]
      ?.["{http://www.battlescribe.net/schema/gameSystemSchema}categoryEntries"]
      ?.["{http://www.battlescribe.net/schema/gameSystemSchema}categoryEntry"] || [];
    console.log("Category Entry Array:", categoryEntryArray);

    // Step 2: Extract attributes from each entry
    const extractedEntries = categoryEntryArray.map((entry) => {
      const attributes = entry?.["{http://www.battlescribe.net/schema/gameSystemSchema}categoryEntry"]?.["@attributes"];
      console.log("Entry Attributes:", attributes);
      return attributes ? {
        name: attributes.name || "Unnamed Entry",
        id: attributes.id || "No ID",
        hidden: attributes.hidden || "false",
      } : null;
    }).filter(Boolean); // Remove null entries

    console.log("Extracted Entries:", extractedEntries); // Debugging extracted entries
    setEntries(extractedEntries || []);
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Warhammer 40,000 Entries
      </Typography>
      <Stack spacing={2}>
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6">{entry.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {entry.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Hidden: {entry.hidden}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No entries found.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default PrototypePage;
