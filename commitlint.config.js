import { readdirSync, statSync } from "fs";
import { join } from "path";

/**
 * Generate commit scopes dynamically from repo folders
 * - Supports 1 level subfolder scanning
 * - Optionally prefixes scope with parent folder
 */
const getDynamicScopes = () => {
  const config = {
    apps: false,
    packages: true,
  };

  const scopes = ["root"];

  const safeReadDir = (path) => {
    try {
      return readdirSync(path);
    } catch {
      return [];
    }
  };

  const isDir = (path) => {
    try {
      return statSync(path).isDirectory();
    } catch {
      return false;
    }
  };

  Object.entries(config).forEach(([dir, usePrefix]) => {
    const dirPath = join(process.cwd(), dir);
    const items = safeReadDir(dirPath);

    items.forEach((item) => {
      if (item.startsWith(".")) return;

      const itemPath = join(dirPath, item);
      if (!isDir(itemPath)) return;

      const baseScope = usePrefix ? `${dir}/${item}` : item;
      scopes.push(baseScope);

      // one-level deep subfolders
      const subItems = safeReadDir(itemPath);

      subItems.forEach((subItem) => {
        if (subItem.startsWith(".")) return;

        const subItemPath = join(itemPath, subItem);
        if (!isDir(subItemPath)) return;

        scopes.push(`${baseScope}/${subItem}`);
      });
    });
  });

  return scopes;
};

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [2, "never"],
    "scope-enum": [1, "always", getDynamicScopes()],
  },
};