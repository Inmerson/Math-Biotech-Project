import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AIChatView } from '../AIChatView';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('AIChatView Performance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('accesses localStorage too many times during renders', () => {
    render(<AIChatView />);

    // Initial render calls getItem for 'inmersion_ai_key'
    // const [apiKey, setApiKey] = useState(localStorage.getItem(STORAGE_KEY) || '');
    // const [showSettings, setShowSettings] = useState(!localStorage.getItem(STORAGE_KEY));

    const initialCalls = localStorageMock.getItem.mock.calls.length;
    // We expect calls on initial render
    expect(initialCalls).toBeGreaterThan(0);

    // Trigger a re-render by typing in the input
    const input = screen.getByPlaceholderText('Matematik sorusu veya konu sor...');
    fireEvent.change(input, { target: { value: 'test' } });

    // With the optimization, useState(() => localStorage.getItem(...)) only evaluates on mount
    const callsAfterType = localStorageMock.getItem.mock.calls.length;

    console.log(`localStorage.getItem calls: Initial=${initialCalls}, AfterType=${callsAfterType}`);

    // This assertion confirms the optimization: calls did NOT increase after a re-render
    expect(callsAfterType).toBe(initialCalls);
  });
});
