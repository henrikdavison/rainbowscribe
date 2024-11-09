// src/commonUtils.js

import _ from 'lodash';

export const randomId = () => {
  const hex = () => Math.floor(Math.random() * 16).toString(16);
  const hex4 = () => hex() + hex() + hex() + hex();
  return `${hex4()}-${hex4()}-${hex4()}-${hex4()}`;
};

export const gatherCatalogues = (catalogue, gameData, catalogues = [gameData.gameSystem]) => {
  if (catalogues.includes(catalogue)) {
    return catalogue;
  }

  catalogues.push(catalogue);

  catalogue.catalogueLinks?.forEach((link) => {
    gatherCatalogues(gameData.catalogues[link.targetId], gameData, catalogues);
  });

  return catalogues;
};

export const findId = (gameData, catalogue, id) => {
  if (gameData.gameSystem.ids[id]) {
    return gameData.gameSystem.ids[id];
  } else if (catalogue.ids[id]) {
    return catalogue.ids[id];
  } else {
    for (let cl of catalogue.catalogueLinks || []) {
      const found = findId(gameData, gameData.catalogues[cl.targetId], id);
      if (found) return found;
    }
  }
  return null;
};

export const getCatalogue = (roster, path, gameData) => {
  const force = _.get(roster, path.replace(/forces.force.(\\d+).*/, 'forces.force.$1'));
  return force ? gameData.catalogues[force.catalogueId] : gameData.gameSystem;
};
