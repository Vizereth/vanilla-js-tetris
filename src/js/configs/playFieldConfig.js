import { canvasConfig } from "./canvasConfig.js";

const playFieldConfig = [];

for (let i = 0; i < canvasConfig.rows; i++) {
  const row = [];

  for (let j = 0; j < canvasConfig.columns; j++) {
    row.push(0);
  }

  playFieldConfig.push(row);
}

export { playFieldConfig };
