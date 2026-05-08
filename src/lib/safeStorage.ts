type StorageArea = 'localStorage' | 'sessionStorage';

const memoryStores: Record<StorageArea, Map<string, string>> = {
  localStorage: new Map<string, string>(),
  sessionStorage: new Map<string, string>(),
};

export const getSafeStorage = (area: StorageArea): Storage => {
  if (typeof window !== 'undefined') {
    try {
      const storage = window[area];
      const probeKey = `bb:${area}:probe`;
      storage.setItem(probeKey, '1');
      storage.removeItem(probeKey);
      return storage;
    } catch {
      // Fall through to an in-memory adapter when browser storage is blocked.
    }
  }

  const memory = memoryStores[area];

  return {
    get length() {
      return memory.size;
    },
    clear: () => memory.clear(),
    getItem: (key: string) => memory.get(key) ?? null,
    key: (index: number) => Array.from(memory.keys())[index] ?? null,
    removeItem: (key: string) => {
      memory.delete(key);
    },
    setItem: (key: string, value: string) => {
      memory.set(key, String(value));
    },
  } as Storage;
};