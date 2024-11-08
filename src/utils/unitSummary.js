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
    if (rangedWeapons) summaryParts.push(`${rangedWeapons}`);
    if (meleeWeapons) summaryParts.push(`${meleeWeapons}`);
    if (selections) summaryParts.push(`${selections}`);
  
    // Join summary parts with separators
    return summaryParts.join(" | ");
  }
  