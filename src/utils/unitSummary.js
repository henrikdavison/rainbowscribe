// src/utils/unitSummary.js

export function getUnitSummary(unit) {
    if (!unit) return "";
  
    // Extract weapon names
    const rangedWeapons = unit.weapons?.ranged?.map(weapon => weapon.name).join(", ");
    const meleeWeapons = unit.weapons?.melee?.map(weapon => weapon.name).join(", ");
    
    // Extract selection names
    const selections = unit.selections?.map(selection => selection.name).join(", ");
  
    // Build summary parts
    const summaryParts = [];
    if (rangedWeapons) summaryParts.push(`Ranged: ${rangedWeapons}`);
    if (meleeWeapons) summaryParts.push(`Melee: ${meleeWeapons}`);
    if (selections) summaryParts.push(`Selections: ${selections}`);
  
    // Join summary parts with separators
    return summaryParts.join(" | ");
  }
  