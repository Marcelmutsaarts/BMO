import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TestResult {
  testId: string;
  score: number;
  datum: Date;
  evaluatie: string;
}

export interface BLOCResult {
  testId: string;
  scores: any;
  datum: Date;
}

export interface UserData {
  geslacht: 'man' | 'vrouw' | null;
  testResultaten: TestResult[];
  blocResultaten?: BLOCResult[];
}

interface TestContextType {
  userData: UserData;
  setGeslacht: (geslacht: 'man' | 'vrouw') => void;
  addTestResult: (result: TestResult) => void;
  updateTestResult: (testId: string, score: number) => void;
  getTestResult: (testId: string) => TestResult | undefined;
  addBLOCResult: (testId: string, scores: any) => void;
  getBLOCResult: (testId: string) => BLOCResult | undefined;
  clearAllData: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

const STORAGE_KEY = 'bmo_fysieke_testen';

export function TestProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        parsed.testResultaten = parsed.testResultaten.map((result: any) => ({
          ...result,
          datum: new Date(result.datum)
        }));
        if (parsed.blocResultaten) {
          parsed.blocResultaten = parsed.blocResultaten.map((result: any) => ({
            ...result,
            datum: new Date(result.datum)
          }));
        }
        return parsed;
      } catch {
        return { geslacht: null, testResultaten: [], blocResultaten: [] };
      }
    }
    return { geslacht: null, testResultaten: [], blocResultaten: [] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  const setGeslacht = (geslacht: 'man' | 'vrouw') => {
    setUserData(prev => ({ ...prev, geslacht }));
  };

  const addTestResult = (result: TestResult) => {
    setUserData(prev => ({
      ...prev,
      testResultaten: [...prev.testResultaten.filter(r => r.testId !== result.testId), result]
    }));
  };

  const updateTestResult = (testId: string, score: number) => {
    setUserData(prev => ({
      ...prev,
      testResultaten: prev.testResultaten.map(r => 
        r.testId === testId ? { ...r, score, datum: new Date() } : r
      )
    }));
  };

  const getTestResult = (testId: string) => {
    return userData.testResultaten.find(r => r.testId === testId);
  };

  const addBLOCResult = (testId: string, scores: any) => {
    const newResult: BLOCResult = {
      testId,
      scores,
      datum: new Date()
    };
    
    setUserData(prev => ({
      ...prev,
      blocResultaten: [
        ...(prev.blocResultaten || []).filter(r => r.testId !== testId),
        newResult
      ]
    }));
  };

  const getBLOCResult = (testId: string) => {
    return userData.blocResultaten?.find(r => r.testId === testId);
  };

  const clearAllData = () => {
    setUserData({ geslacht: null, testResultaten: [], blocResultaten: [] });
  };

  const exportData = () => {
    return JSON.stringify(userData, null, 2);
  };

  const importData = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      parsed.testResultaten = parsed.testResultaten.map((result: any) => ({
        ...result,
        datum: new Date(result.datum)
      }));
      if (parsed.blocResultaten) {
        parsed.blocResultaten = parsed.blocResultaten.map((result: any) => ({
          ...result,
          datum: new Date(result.datum)
        }));
      }
      setUserData(parsed);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <TestContext.Provider value={{
      userData,
      setGeslacht,
      addTestResult,
      updateTestResult,
      getTestResult,
      addBLOCResult,
      getBLOCResult,
      clearAllData,
      exportData,
      importData
    }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTestContext() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTestContext must be used within TestProvider');
  }
  return context;
}